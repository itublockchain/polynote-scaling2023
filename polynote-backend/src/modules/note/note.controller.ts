import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { NotesCreateDto, NotesParams } from 'src/modules/note/note.dto';
import { NoteService } from 'src/modules/note/note.service';
import { getTokenData } from 'src/utils/getTokenData';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/:address')
  @ApiOperation({ summary: 'Get notes of a user with address' })
  public async getNotesForUser(
    @Param() params: NotesParams,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (params.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.genNotesForUser(params.address);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  public async createNote(
    @Body() notesCreateDto: NotesCreateDto,
    @Req() req: Request,
  ) {
    const { address } = getTokenData(req);

    if (notesCreateDto.address !== address) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return await this.noteService.createNote(notesCreateDto);
  }
}
