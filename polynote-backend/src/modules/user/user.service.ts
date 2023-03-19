import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Collection, Polybase } from '@polybase/client';
import { UserCreateDto, UserResponseDto } from 'src/modules/user/user.dto';
import { getPolybaseInstance } from 'src/utils/getPolybaseInstance';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  db: Polybase;
  collection: Collection<any>;

  constructor() {
    this.db = getPolybaseInstance();
    this.collection = this.db.collection('User');
  }

  public async genUsers() {
    const response = await this.collection.get();

    return response.data;
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

    await this.collection.record(user.id).call('updateName', [name]);

    return await this.genUserByAddress(address);
  }

  public async createUser(userCreateDto: UserCreateDto) {
    console.log([uuidv4(), userCreateDto.signature, userCreateDto.address]);

    const response = await this.collection.create([
      uuidv4(),
      userCreateDto.signature,
      userCreateDto.address,
    ]);

    return response.data;
  }
}
