import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AITextDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  text: string;
}
