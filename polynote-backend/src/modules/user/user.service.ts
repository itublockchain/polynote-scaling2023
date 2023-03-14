import { Injectable } from '@nestjs/common';
import { Collection, Polybase } from '@polybase/client';
import { UserCreateDto } from 'src/modules/user/user.dto';
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

  public async createUser(userCreateDto: UserCreateDto) {
    const response = await this.collection.create([
      uuidv4(),
      userCreateDto.signature,
      userCreateDto.address,
    ]);

    return response.data;
  }
}
