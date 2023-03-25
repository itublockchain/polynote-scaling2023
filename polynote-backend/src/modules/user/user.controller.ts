import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import {
  UserAddressDto,
  UserAuthDto,
  UserCreateDto,
  UserDeleteDto,
  UserPushNotificationDto,
  UserResponse,
  UserResponseDto,
  UserTokenResponse,
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
  @ApiResponse({
    type: UserResponseDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Get all users' })
  public async genUsers(): Promise<UserResponseDto[]> {
    const result = await this.userService.genUsers();
    return result;
  }

  @Get('/:address')
  @ApiOperation({ summary: 'Get user with an address' })
  @ApiResponse({
    type: UserResponse,
  })
  public async genUserByAddress(@Param() userAddressDto: UserAddressDto) {
    const result = await this.userService.genUserByAddress(
      userAddressDto.address,
    );
    return result;
  }

  @Post('/notifications/opt-in')
  @ApiOperation({ summary: 'Opt in to push notifications' })
  @UsePipes(new ValidationPipe())
  public async optIn(
    @Body() userPushNotificationDto: UserPushNotificationDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (userPushNotificationDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.userService.optIn(userPushNotificationDto.address);
  }

  @Post('/notifications/opt-out')
  @ApiOperation({ summary: 'Opt out to push notifications' })
  @UsePipes(new ValidationPipe())
  public async optOut(
    @Body() userPushNotificationDto: UserPushNotificationDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (userPushNotificationDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.userService.optOut(userPushNotificationDto.address);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    type: UserResponseDto,
  })
  @UsePipes(new ValidationPipe())
  public async createUser(@Body() userCreateDto: UserCreateDto) {
    return await this.userService.createUser(userCreateDto);
  }

  @Post('/auth')
  @ApiOperation({ summary: 'Authorize user with signature' })
  @ApiResponse({
    type: UserTokenResponse,
  })
  @UsePipes(new ValidationPipe())
  public async authUser(@Body() userAuthDto: UserAuthDto) {
    return await this.userService.authUser(userAuthDto);
  }

  @Put('/:address')
  @ApiOperation({ summary: 'Update user name' })
  @ApiResponse({
    type: UserResponseDto,
  })
  @UsePipes(new ValidationPipe())
  public async updateUserName(
    @Param() userAddressDto: UserAddressDto,
    @Body() userUpdateDto: UserUpdateDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (userAddressDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.userService.updateUserName(
      userAddressDto.address,
      userUpdateDto.name,
    );
  }

  @Delete('/:address')
  @ApiOperation({ summary: 'Delete user with address (only admin)' })
  @UsePipes(new ValidationPipe())
  public async deleteUser(
    @Param() userAddressDto: UserDeleteDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (!checkAdmin(address)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    if (userAddressDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.userService.deleteUser(userAddressDto.address);
  }
}
