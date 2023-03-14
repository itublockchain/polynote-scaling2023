import { Module } from '@nestjs/common';
import { UserController } from 'src/modules/user/user.controller';
import { UserService } from 'src/modules/user/user.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [],
})
export class UserModule {}
