import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UserAddressDto,
  UserCreateDto,
  UserUpdateDto,
} from 'src/modules/user/user.dto';
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

  @Get('/:address')
  public async genUserByAddress(@Param() userAddressDto: UserAddressDto) {
    const result = await this.userService.genUserByAddress(
      userAddressDto.address,
    );
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Post('/:address')
  @UsePipes(new ValidationPipe())
  public async updateUserName(
    @Param() userAddressDto: UserAddressDto,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.updateUserName(
      userAddressDto.address,
      userUpdateDto.name,
    );
  }
}
