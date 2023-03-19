import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NotesParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;
}
