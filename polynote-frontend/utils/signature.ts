import { POLYNOTE_CONTRACT } from "consts/contracts";

export const DOMAIN = {
  name: "Polynote",
  version: "1",
  verifyingContract: POLYNOTE_CONTRACT,
} as const;

// The named list of all type definitions
export const TYPES = {
  User: [
    { name: "address", type: "address" },
    { name: "message", type: "string" },
  ],
} as const;

export const getSignatureValue = (address: `0x${string}`, message: string) => {
  return {
    address,
    message,
  };
};
