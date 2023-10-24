import { ethers } from 'ethers';
import { Contract, Provider } from 'zksync-web3';

const CLAVE_ACCOUNT_ABI = [
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'signedHash',
        type: 'bytes32',
      },
      {
        internalType: 'bytes',
        name: 'signatureAndValidator',
        type: 'bytes',
      },
    ],
    name: 'isValidSignature',
    outputs: [
      {
        internalType: 'bytes4',
        name: 'magicValue',
        type: 'bytes4',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const formatHex = (hex: string) => (hex.includes('0x') ? hex : `0x${hex}`);

export const verifyR1Signature = async (
  message: string,
  signature: string,
  publicAddress: string,
): Promise<boolean> => {
  const provider = new Provider(process.env.NETWORK_RPC_URL);

  const signatureAndValidator = ethers.utils.defaultAbiCoder.encode(
    ['bytes', 'address'],
    [formatHex(signature), '0x379f41Ab03B8e62A91aF1695fd70796ef51D4cfa'],
  );
  const signedHash = ethers.utils.sha256(Buffer.from(message));

  const contract = new Contract(publicAddress, CLAVE_ACCOUNT_ABI, provider);

  const isValidSignature = await contract.isValidSignature(
    signedHash,
    formatHex(signatureAndValidator),
  );

  return isValidSignature;
};
