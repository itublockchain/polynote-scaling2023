import { ApiProperty } from '@nestjs/swagger';
import { PublicKey } from '@polybase/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class UserAuthDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class UserUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UserPushNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UserDeleteDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UserAddressDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class UserResponseDto {
  @ApiProperty()
  address: string;

  @ApiProperty()
  publicKey: PublicKey;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
