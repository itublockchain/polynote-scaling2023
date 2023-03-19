import { AccountModal, Header, Main } from "components";
import { Paths } from "consts/paths";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useToken } from "recoil/user/UserStoreHooks";
import { Spinner, Typography } from "ui";
import { useAccount } from "wagmi";

enum Page {}

const Dashboard: NextPage = () => {
  const { isConnected, isReconnecting, isConnecting } = useAccount();
  const router = useRouter();
  const token = useToken();

  useEffect(() => {
    if (isReconnecting || isConnecting) return;
    if (!isConnected) {
      router.replace(Paths.CONNECT_WALLET);
    }
  }, [isConnected, router, isReconnecting, isConnecting]);

  return (
    <>
      <Header title="Dashboard" />
      {isConnected && <AccountModal />}
      {token != null && isConnected ? (
        <Main />
      ) : (
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
          <Spinner size={36} />
          <Typography
            variant="body1"
            className="text-MAIN_DARK dark:text-PINK mt-4"
          >
            Signing in...
          </Typography>
        </div>
      )}
    </>
  );
};

export default Dashboard;
