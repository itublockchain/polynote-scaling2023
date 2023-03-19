import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "styles/globals.scss";
import { RecoilRoot } from "recoil";
import { useInitializeTheme } from "hooks/useInitializeTheme";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTheme } from "recoil/theme/ThemeStore";
import { ThemeOption } from "recoil/theme/types";

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
  const [_theme, _setTheme] = useState<ThemeOption>("dark");

  return (
    <ClientOnly>
      <RecoilRoot>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider
            chains={chains}
            theme={_theme === "dark" ? darkTheme() : lightTheme()}
          >
            <InitHooks setTheme={_setTheme} />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </RecoilRoot>
    </ClientOnly>
  );
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
}

function InitHooks({
  setTheme,
}: {
  setTheme: Dispatch<SetStateAction<ThemeOption>>;
}) {
  const theme = useTheme();
  useInitializeTheme();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return null;
}

export default PolynoteApp;
