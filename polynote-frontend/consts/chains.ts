import { Chain } from "viem";

export const scroll_testnet = {
  id: 534353,
  network: "scroll",
  name: "Scroll",
  nativeCurrency: {
    name: "Scroll Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
    public: {
      http: ["https://alpha-rpc.scroll.io/l2"],
    },
  },
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://blockscout.scroll.io",
    },
  },
  testnet: true,
};

export const zksync_testnet: Chain = {
  id: 300,
  network: "zksync",
  name: "zkSync Sepolia Testnet",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://sepolia.era.zksync.dev"],
    },
    public: {
      http: ["https://sepolia.era.zksync.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "zkSync Era Block Explorer",
      url: "https://sepolia.explorer.zksync.io/",
    },
  },
  testnet: true,
};
