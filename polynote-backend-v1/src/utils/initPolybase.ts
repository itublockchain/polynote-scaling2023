import { Polybase } from '@polybase/client';
import { ethPersonalSign } from '@polybase/eth';
import { UserCollection } from 'src/collections/user.collection';

export const db = new Polybase({
  signer: (data: any) => {
    return {
      h: 'eth-personal-sign',
      sig: ethPersonalSign(process.env.PRIVATE_KEY, data),
    };
  },
  defaultNamespace: 'test',
});

export const initPolybase = async () => {
  try {
    await db.applySchema(UserCollection);
  } catch {}
};
