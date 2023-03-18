import { NextPage } from "next";
import Wallpaper from "assets/wallpaper.png";
import ConnectPageIllustration from "assets/connect-page-illustration.png";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
import { Button, CustomConnectButton } from "ui";
import { AiOutlineWallet } from "react-icons/ai";
import { useAccount } from "wagmi";
import { Typography } from "ui/Typography/Typography";
import { formatAddress } from "utils/formatAddress";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";

const borderStyles: CSSProperties = {
  borderTopLeftRadius: "180px",
  borderTopRightRadius: "180px",
};

const ConnectPage: NextPage = () => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  const [connected, setConnected] = useState(false);

  //** SSR ISSUE */
  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);

  return (
    <div
      className="min-h-screen bg-cover bg-black flex w-full items-center justify-center"
      style={{ backgroundImage: `url(${Wallpaper.src})` }}
    >
      <div className="flex flex-col items-center w-[90%] md:w-[400px] ">
        <Image src={LogoLargeWhite} alt="logo white" className="w-[90%]" />
        <div className="flex flex-col items-center mt-[32px] bg-MAIN_DARK w-full border-8 border-LIGHT_PURPLE rounded-[32px] py-[40px] px-[64px]">
          <div
            className="w-[200px] md:w-[90%] px-6 pt-6 border-4 border-LIGHT_PURPLE bg-CONNECT_WINDOW"
            style={borderStyles}
          >
            <Image
              src={ConnectPageIllustration}
              alt="Connect Page Illustration"
            />
          </div>

          {connected && address != null ? (
            <div className="w-[220px] md:w-[90%] mt-[32px] flex flex-col">
              <Typography
                variant="body1"
                weight="regular"
                className="text-PINK mt-4 text-center"
              >
                You are connected as{" "}
                <Typography variant="title4">
                  {formatAddress(address)}
                </Typography>
              </Typography>

              <Button
                onClick={() => router.push(Paths.DASHBOARD)}
                className="w-full h-10 rounded-lg mt-4"
                color="secondary"
              >
                Proceed
              </Button>

              <CustomConnectButton
                disableAccountIcon
                className="w-full h-10 rounded-lg mt-2"
                changeAccountText="Switch account"
              />
            </div>
          ) : (
            <CustomConnectButton
              containerClassName="w-[220px] md:w-[90%] mt-[32px]"
              className="w-full h-10 rounded-lg"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
