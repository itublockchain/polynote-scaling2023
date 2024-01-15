import {
  Chain,
  Wallet,
  getWalletConnectConnector,
} from "@rainbow-me/rainbowkit";

export interface MyWalletOptions {
  projectId: string;
  chains: Chain[];
}

export const claveWallet = ({
  chains,
  projectId,
}: MyWalletOptions): Wallet => ({
  id: "clave-wallet",
  name: "Clave",
  iconUrl: "https://i.imgur.com/231t7i8.png",
  iconBackground: "#000",
  downloadUrls: {},
  createConnector: () => {
    const connector = getWalletConnectConnector({ projectId, chains });

    return {
      connector,
      mobile: {
        getUri: async () => {
          const provider = await connector.getProvider();
          const uri = await new Promise<string>((resolve) => {
            provider.once("display_uri", resolve);
          });
          return `clave://wc/${uri}`;
        },
      },
      qrCode: {
        getUri: async () => {
          const provider = await connector.getProvider();
          const uri = await new Promise<string>((resolve) =>
            provider.once("display_uri", resolve)
          );
          return `clave://${uri}`;
        },
      },
    };
  },
});
