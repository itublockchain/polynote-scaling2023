import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
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
import { ThemeOption } from "recoil/theme/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useSetPolybaseUser, useSetToken } from "recoil/user/UserStoreHooks";
import { useSetNotes, useSetSelectedNote } from "recoil/notes/NotesStoreHooks";
import { useOnAccountsChange } from "hooks/useOnAccountsChange";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "components";
import { publicProvider } from "wagmi/providers/public";
import { CONFIG } from "config";
import {
  injectedWallet,
  rainbowWallet,
  walletConnectWallet,
  clvWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { claveWallet } from "utils/customWallets";

export const queryClient = new QueryClient();

const { chains, publicClient } = configureChains(CONFIG.CHAINS, [
  publicProvider(),
]);

function PolynoteApp({ Component, pageProps, ...rest }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ClientOnly Component={Component} pageProps={pageProps} {...rest} />
    </QueryClientProvider>
  );
}

function ClientOnly({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [_theme, _setTheme] = useState<ThemeOption>("dark");

  useEffect(() => {
    setMounted(true);
  }, []);

  const [config, setConfig] = useState<any>();

  useEffect(() => {
    if (!mounted) {
      return;
    }

    const connectors = connectorsForWallets([
      {
        groupName: "Recommended",
        wallets: [
          injectedWallet({ chains }),
          claveWallet({ projectId: CONFIG.WC_PROJECT_ID, chains }),
          walletConnectWallet({ projectId: CONFIG.WC_PROJECT_ID, chains }),
          rainbowWallet({ projectId: CONFIG.WC_PROJECT_ID, chains }),
          clvWallet({ projectId: CONFIG.WC_PROJECT_ID, chains }),
        ],
      },
    ]);

    const config = createConfig({
      autoConnect: true,
      publicClient,
      connectors,
    });

    setConfig(config);
  }, [mounted]);

  if (!mounted || !config) {
    return (
      <>
        <Header />
      </>
    );
  }

  return (
    <RecoilRoot>
      <WagmiConfig config={config}>
        <RainbowKitProvider
          chains={CONFIG.CHAINS}
          theme={_theme === "dark" ? darkTheme() : lightTheme()}
        >
          <InitHooks setTheme={_setTheme} />
          <Component {...pageProps} />
          <ToastContainer draggable theme={_theme} />
        </RainbowKitProvider>
      </WagmiConfig>
    </RecoilRoot>
  );
}

function InitHooks({
  setTheme,
}: {
  setTheme: Dispatch<SetStateAction<ThemeOption>>;
}) {
  const theme = useTheme();
  useInitializeTheme();
  const setToken = useSetToken();
  const setSelectedNote = useSetSelectedNote();
  const setPolybaseUser = useSetPolybaseUser();
  const setNotes = useSetNotes();
  const router = useRouter();

  useAccount({
    onDisconnect: () => {
      setToken(null);
      setSelectedNote(null);
      setPolybaseUser(null);
      setNotes([]);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    },
  });

  useOnAccountsChange(() => {
    router.replace(Paths.CONNECT_WALLET);
    setToken(null);
    setPolybaseUser(null);
    setSelectedNote(null);
    setNotes([]);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  });

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return null;
}

export default PolynoteApp;
