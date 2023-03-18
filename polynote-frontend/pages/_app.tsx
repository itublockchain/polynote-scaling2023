import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "styles/globals.scss";
import { RecoilRoot } from "recoil";
import { useInitializeTheme } from "hooks/useInitializeTheme";

const { chains, provider, webSocketProvider } = configureChains(
  [goerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Polynote",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function PolynoteApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <InitHooks />
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </RecoilRoot>
  );
}

function InitHooks() {
  useInitializeTheme();

  return null;
}

export default PolynoteApp;
