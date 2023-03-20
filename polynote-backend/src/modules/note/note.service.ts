import { Injectable } from '@nestjs/common';
import { Collection, Polybase } from '@polybase/client';
import { NotesCreateDto } from 'src/modules/note/note.dto';
import { getPolybaseInstance } from 'src/utils/getPolybaseInstance';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class NoteService {
  db: Polybase;
  collection: Collection<any>;

  constructor() {
    this.db = getPolybaseInstance();
    this.collection = this.db.collection('Note');
  }

  public async genNotesForUser(address: string): Promise<NotesCreateDto[]> {
    const response = await this.collection
      .where('address', '==', address)
      .get();
    return response.data.map((item) => {
      return item.data;
    });
  }

  public async genNoteById(id: string): Promise<NotesCreateDto> {
    const response = await this.collection.record(id).get();
    return response.data;
  }

  public async createNote(notesCreateDto: NotesCreateDto) {
    const id = uuidv4();

    await this.collection.create([
      id,
      notesCreateDto.address,
      notesCreateDto.emoji,
      notesCreateDto.title,
      notesCreateDto.content,
    ]);

    return await this.genNoteById(id);
  }
}
