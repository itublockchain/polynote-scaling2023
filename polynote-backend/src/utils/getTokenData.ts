import { Request } from 'express';

type TokenData = { address: string };

export const getTokenData = (req: Request): TokenData => {
  return { address: req.headers.address as string };
};
