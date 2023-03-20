import { Injectable } from '@nestjs/common';
import { Collection, Polybase } from '@polybase/client';
import {
  NotesCreateDto,
  NotesResponseData,
  NotesUpdateDto,
} from 'src/modules/note/note.dto';
import { getPolybaseInstance } from 'src/utils/getPolybaseInstance';
import { getTimestamp } from 'src/utils/getTimestamp';
import { v4 as uuidv4 } from 'uuid';
import {
  aescbc,
  decodeFromString,
  encodeToString,
  EncryptedDataAesCbc256,
} from '@polybase/util';

const getEncryptionKey = () => {
  const key = process.env.ENCRYPTION_KEY;
  return new Uint8Array(JSON.parse(key));
};

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

    const decryptedContentValues: string[] = [];

    for (const item of response.data) {
      try {
        const decrypted = await this.decryptString(item.data.content);
        decryptedContentValues.push(decrypted);
      } catch (error) {
        decryptedContentValues.push(item.data.content);
      }
    }

    return response.data.map((item, index) => {
      return {
        ...item.data,
        content: decryptedContentValues[index],
      };
    });
  }

  public async genNoteById(id: string): Promise<NotesResponseData> {
    const response = await this.collection.record(id).get();
    return response.data;
  }

  public async updateNote(
    id: string,
    noteUpdateDto: NotesUpdateDto,
  ): Promise<NotesResponseData> {
    const note = await this.genNoteById(id);
    const encryptedData = await this.encyptString(noteUpdateDto.content);

    if (
      encryptedData === note.content &&
      noteUpdateDto.title === note.title &&
      noteUpdateDto.emoji === note.emoji
    ) {
      return note;
    }

    const response = await this.collection
      .record(id)
      .call('updateNote', [
        noteUpdateDto.title,
        noteUpdateDto.emoji,
        encryptedData,
        getTimestamp(),
      ]);

    const decrpted = await this.decryptString(response.data.content);
    delete response.data['content'];

    return { ...response.data, content: decrpted };
  }

  public async createNote(notesCreateDto: NotesCreateDto) {
    const id = uuidv4();

    await this.collection.create([
      id,
      notesCreateDto.address,
      notesCreateDto.emoji,
      notesCreateDto.title,
      notesCreateDto.content,
      getTimestamp(),
      getTimestamp(),
    ]);

    return await this.genNoteById(id);
  }

  public async deleteNoteById(id: string) {
    return await this.collection.record(id).call('deleteNote');
  }

  public async encyptString(data: string): Promise<string> {
    const strDataToBeEncrypted = decodeFromString(data, 'utf8');

    const encryptedData = await aescbc.symmetricEncrypt(
      getEncryptionKey(),
      strDataToBeEncrypted,
    );

    return JSON.stringify(encryptedData);
  }

  public async decryptString(data: string): Promise<string> {
    const parsed = JSON.parse(data);

    const actual: EncryptedDataAesCbc256 = {
      version: parsed.version,
      nonce: new Uint8Array(
        Object.keys(parsed.nonce).map((item) => parsed.nonce[item]),
      ),
      ciphertext: new Uint8Array(
        Object.keys(parsed.ciphertext).map((item) => parsed.ciphertext[item]),
      ),
    };

    const decrypted = await aescbc.symmetricDecrypt(getEncryptionKey(), actual);
    return encodeToString(decrypted, 'utf8');
  }
}
