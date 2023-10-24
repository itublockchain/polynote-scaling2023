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
import { zksync_testnet } from "consts/chains";
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

import { walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";

export const queryClient = new QueryClient();

const { chains, publicClient } = configureChains(
  [zksync_testnet],
  [publicProvider()]
);

const WC_PROJECT_ID = "5f9eb65b68d4fd8c5641c8d09e1ec88e";

const connectors = connectorsForWallets([
  {
    groupName: "Other",
    wallets: [
      walletConnectWallet({
        chains,
        projectId: WC_PROJECT_ID,
        options: {
          projectId: WC_PROJECT_ID,
          metadata: {
            url: "https://polynote.itublockchain.com",
            name: "Polynote",
            description: "Private note taking application",
            icons: ["https://i.imgur.com/bUPMfpq.png"],
          },
        },
      }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors,
});

function PolynoteApp({ Component, pageProps }: AppProps) {
  const [_theme, _setTheme] = useState<ThemeOption>("dark");

  return (
    <QueryClientProvider client={queryClient}>
      <ClientOnly>
        <RecoilRoot>
          <WagmiConfig config={config}>
            <RainbowKitProvider
              chains={[zksync_testnet]}
              theme={_theme === "dark" ? darkTheme() : lightTheme()}
            >
              <InitHooks setTheme={_setTheme} />
              <Component {...pageProps} />
              <ToastContainer draggable theme={_theme} />
            </RainbowKitProvider>
          </WagmiConfig>
        </RecoilRoot>
      </ClientOnly>
    </QueryClientProvider>
  );
}

function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <>
        <Header />
      </>
    );
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
