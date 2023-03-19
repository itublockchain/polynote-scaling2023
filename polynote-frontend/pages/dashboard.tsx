import { Header, Sidebar } from "components";
import { Paths } from "consts/paths";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

enum Page {}

const Dashboard: NextPage = () => {
  const { isConnected, isReconnecting, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isReconnecting || isConnecting) return;
    if (!isConnected) {
      router.replace(Paths.CONNECT_WALLET);
    }
  }, [isConnected, router, isReconnecting, isConnecting]);

  return (
    <>
      <Header title="Dashboard" />
      <div className="flex">
        <Sidebar />
      </div>
    </>
  );
};

export default Dashboard;
