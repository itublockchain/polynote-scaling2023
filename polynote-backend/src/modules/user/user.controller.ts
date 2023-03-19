import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  UserAddressDto,
  UserAuthDto,
  UserCreateDto,
  UserDeleteDto,
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

  @Post('/auth')
  @UsePipes(new ValidationPipe())
  public async authUser(@Body() userAuthDto: UserAuthDto) {
    return await this.userService.authUser(userAuthDto);
  }

  @Put('/:address')
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

  @Delete('/:address')
  @UsePipes(new ValidationPipe())
  public async deleteUser(@Param() userAddressDto: UserDeleteDto) {
    return await this.userService.deleteUser(userAddressDto.address);
  }
}
