import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import {
  configureChains,
  createClient,
  goerli,
  useAccount,
  WagmiConfig,
} from "wagmi";
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
import { ThemeOption } from "recoil/theme/types";
import { QueryClient, QueryClientProvider } from "react-query";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { scroll } from "consts/chains";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useSetPolybaseUser, useSetToken } from "recoil/user/UserStoreHooks";
import { useSetNotes, useSetSelectedNote } from "recoil/notes/NotesStoreHooks";
import { useOnAccountsChange } from "hooks/useOnAccountsChange";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Header } from "components";

export const queryClient = new QueryClient();

const { chains, provider, webSocketProvider } = configureChains(
  [scroll, goerli],
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
    <QueryClientProvider client={queryClient}>
      <ClientOnly>
        <RecoilRoot>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider
              chains={chains}
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
