import { Module } from '@nestjs/common';
import { NoteController } from 'src/modules/note/note.controller';
import { NoteService } from 'src/modules/note/note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
  imports: [],
})
export class NoteModule {}
