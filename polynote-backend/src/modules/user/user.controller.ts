import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserCreateDto } from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  public async genUsers() {
    const result = await this.userService.genUsers();
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }
}
