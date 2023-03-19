import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotesParams } from 'src/modules/note/note.dto';
import { NoteService } from 'src/modules/note/note.service';

@ApiTags('Notes')
@Controller('notes')
export class NoteController {
  constructor(private noteService: NoteService) {}

  @Get('/:address')
  public async getNotesForUser(@Param() params: NotesParams) {
    return await this.noteService.genNotesForUser(params.address);
  }
}
