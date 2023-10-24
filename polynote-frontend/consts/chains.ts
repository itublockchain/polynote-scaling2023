export const zksync_testnet = {
  id: 280,
  network: "zksync",
  name: "Zksync",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://testnet.era.zksync.dev"],
    },
    public: {
      http: ["https://testnet.era.zksync.dev"],
    },
  },
  blockExplorers: {
    default: {
      name: "zkSync Era Block Explorer",
      url: "https://goerli.explorer.zksync.io/",
    },
  },
  testnet: true,
};
