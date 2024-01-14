import { ethers } from 'ethers';
import { CONFIG } from 'src/config';
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

export const CLAVE_REGISTRY_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [],
    name: 'NOT_FROM_FACTORY',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'isClave',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'factory_',
        type: 'address',
      },
    ],
    name: 'setFactory',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
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
    [formatHex(signature), CONFIG.CLAVE_VALIDATOR_ADDRESS],
  );
  const signedHash = ethers.utils.sha256(Buffer.from(message));

  const contract = new Contract(publicAddress, CLAVE_ACCOUNT_ABI, provider);

  const isValidSignature = await contract.isValidSignature(
    signedHash,
    formatHex(signatureAndValidator),
  );

  return isValidSignature;
};
