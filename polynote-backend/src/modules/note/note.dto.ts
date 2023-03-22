import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NotesParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class NotesIdParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class NotesSharedParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  signature: string;
}

export class NotesUpdateParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class NotesCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emoji: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class NotesUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emoji: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}

export class NotesResponseData {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  emoji: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
}
