import { Injectable } from '@nestjs/common';
import { Collection, Polybase } from '@polybase/client';
import { getPolybaseInstance } from 'src/utils/getPolybaseInstance';

@Injectable()
export class NoteService {
  db: Polybase;
  collection: Collection<any>;

  constructor() {
    this.db = getPolybaseInstance();
    this.collection = this.db.collection('Note');
  }

  public async genNotesForUser(address: string) {
    const response = await this.collection.where('author', '==', address).get();
    return response.data.map((item) => {
      return item.data;
    });
  }
}
