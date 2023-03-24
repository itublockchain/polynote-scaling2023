import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { NoteCollection } from 'src/collections/note.collection';
import { UserCollection } from 'src/collections/user.collection';
import { CONFIG } from 'src/config';

export const db = new Polybase({
  signer: (data: any) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.PRIVATE_KEY, data),
    };
  },
  defaultNamespace: CONFIG.DB_NAMESPACE,
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
