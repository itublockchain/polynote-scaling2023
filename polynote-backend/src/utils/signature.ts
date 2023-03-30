import { CONFIG } from 'src/config';

export const DOMAIN = {
  name: 'Polynote',
  version: '1',
  verifyingContract: CONFIG.POLYNOTE_CONTRACT_SCROLL,
} as const;

// The named list of all type definitions
export const TYPES = {
  User: [
    { name: 'address', type: 'address' },
    { name: 'message', type: 'string' },
  ],
};

export const getSignatureValue = (address: `0x${string}`, message: string) => {
  return {
    address,
    message,
  };
};
