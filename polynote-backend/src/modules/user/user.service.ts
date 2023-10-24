import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Collection, Polybase } from '@polybase/client';
import { ethers } from 'ethers';
import {
  UserAuthDto,
  UserCreateDto,
  UserResponseDto,
} from 'src/modules/user/user.dto';
import { getPolybaseInstance } from 'src/utils/getPolybaseInstance';
import { v4 as uuidv4 } from 'uuid';
import * as PushAPI from '@pushprotocol/restapi';
import { CONFIG } from 'src/config';
import { ENV } from '@pushprotocol/restapi/src/lib/constants';
import { verifyR1Signature } from 'src/utils/verifyR1Signature';

@Injectable()
export class UserService {
  db: Polybase;
  collection: Collection<any>;

  constructor(private readonly jwtService: JwtService) {
    this.db = getPolybaseInstance();
    this.collection = this.db.collection('User');
  }

  public async genUsers(): Promise<UserResponseDto[]> {
    const response = await this.collection.get();

    return response.data.map((item) => {
      return item.data;
    });
  }

  public async genUserByAddress(
    address: string,
  ): Promise<{ user: UserResponseDto | null }> {
    const response = await this.collection
      .where('address', '==', address)
      .get();

    if (response == null) {
      return { user: null };
    }

    if (Array.isArray(response.data)) {
      return { user: (response.data[0]?.data as any) ?? null };
    }

    return { user: null };
  }

  public async updateUserName(address: string, name: string) {
    const { user } = await this.genUserByAddress(address);

    if (user == null) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await this.collection
      .record(user.id)
      .call('updateName', [name.slice(0, 64)]);

    return await this.genUserByAddress(address);
  }

  public async createUser(userCreateDto: UserCreateDto) {
    const verification = await verifyR1Signature(
      'Polynote - Create account',
      userCreateDto.signature,
      userCreateDto.address,
    );

    if (!verification) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const response = await this.collection.create([
      uuidv4(),
      userCreateDto.signature,
      userCreateDto.address,
    ]);

    return response.data;
  }

  public async authUser(userAuthDto: UserAuthDto) {
    const verification = await verifyR1Signature(
      'Polynote - Sign in',
      userAuthDto.signature,
      userAuthDto.address,
    );

    if (verification) {
      const token = this.jwtService.sign({ address: userAuthDto.address });

      return { token };
    }

    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  public async deleteUser(address: string) {
    const { user } = await this.genUserByAddress(address);

    if (user == null) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    await this.collection.record(user.id).call('deleteUser');
  }

  public async optIn(address: string) {
    const PK = process.env.PRIVATE_KEY; // channel private key
    const _signer = new ethers.Wallet(PK);
    await PushAPI.channels.subscribe({
      signer: _signer,
      channelAddress: CONFIG.PUSH_CHANNEL_CAIP,
      userAddress: `eip155:5:${address}`,
      env: ENV.STAGING,
    });

    return { status: 'ok' };
  }

  public async optOut(address: string) {
    const PK = process.env.PRIVATE_KEY; // channel private key
    const _signer = new ethers.Wallet(PK);
    await PushAPI.channels.unsubscribe({
      signer: _signer,
      channelAddress: CONFIG.PUSH_CHANNEL_CAIP,
      userAddress: `eip155:5:${address}`,
      env: ENV.STAGING,
    });
    return { status: 'ok' };
  }
}
