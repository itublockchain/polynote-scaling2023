import { ethers } from 'ethers';

export class JsonRpcProvider extends ethers.providers.JsonRpcProvider {}

export type ProviderEventFilter = {
  address: string;
  topics: Array<string>;
};

export const getRpcProvider = (): JsonRpcProvider => {
  const provider = new JsonRpcProvider(process.env.NETWORK_RPC_URL);
  return provider;
};
