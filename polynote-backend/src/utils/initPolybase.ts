import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { NoteCollection } from 'src/collections/note.collection';
import { UserCollection } from 'src/collections/user.collection';

export const db = new Polybase({
  signer: (data: any) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.PRIVATE_KEY, data),
    };
  },
  defaultNamespace: 'polynote',
});

export const initPolybase = async () => {
  try {
    await db.applySchema(UserCollection);
  } catch {}

  try {
    await db.applySchema(NoteCollection);
  } catch (err) {
    console.log(err);
  }
};
