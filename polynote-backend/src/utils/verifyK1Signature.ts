import { ethers } from 'ethers';

export const verifyK1Signature = async (
  message: string,
  signature: string,
  publicAddress: string,
): Promise<boolean> => {
  const signer = ethers.utils.verifyMessage(message, signature);

  return signer.toLowerCase() === publicAddress.toLowerCase();
};
