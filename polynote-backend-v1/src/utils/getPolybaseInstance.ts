import { db } from 'src/utils/initPolybase';

export const getPolybaseInstance = () => {
  return db;
};
