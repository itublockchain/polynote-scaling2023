import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  UserAddressDto,
  UserAuthDto,
  UserCreateDto,
  UserDeleteDto,
  UserUpdateDto,
} from 'src/modules/user/user.dto';
import { UserService } from 'src/modules/user/user.service';
import { checkAdmin } from 'src/utils/checkAdmin';
import { getTokenData } from 'src/utils/getTokenData';

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
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (userAddressDto.address !== address) {
      throw new UnauthorizedException();
    }

    return await this.userService.updateUserName(
      userAddressDto.address,
      userUpdateDto.name,
    );
  }

  @Delete('/:address')
  @UsePipes(new ValidationPipe())
  public async deleteUser(
    @Param() userAddressDto: UserDeleteDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (!checkAdmin(address)) {
      throw new UnauthorizedException();
    }

    if (userAddressDto.address !== address) {
      throw new UnauthorizedException();
    }

    return await this.userService.deleteUser(userAddressDto.address);
  }
}
