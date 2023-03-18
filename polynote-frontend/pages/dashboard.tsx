import { Header, Sidebar } from "components";
import { Paths } from "consts/paths";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";

enum Page {}

const Dashboard: NextPage = () => {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    console.log(isConnected);
    if (!isConnected) {
      router.replace(Paths.CONNECT_WALLET);
    }
  }, [isConnected, router]);

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
