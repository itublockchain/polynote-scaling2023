import { NextPage } from "next";
import Wallpaper from "assets/wallpaper.png";
import ConnectPageIllustration from "assets/connect-page-illustration.png";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import Image from "next/image";
import { CSSProperties } from "react";

const borderStyles: CSSProperties = {
  borderTopLeftRadius: "180px",
  borderTopRightRadius: "180px",
};

const ConnectPage: NextPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-black flex w-full items-center justify-center"
      style={{ backgroundImage: `url(${Wallpaper.src})` }}
    >
      <div className="flex flex-col items-center w-[90%] md:w-[400px] ">
        <Image src={LogoLargeWhite} alt="logo white" className="w-[90%]" />
        <div className="flex flex-col items-center mt-[32px] bg-MAIN_DARK w-full border-8 border-LIGHT_PURPLE rounded-[32px] py-[40px] px-[64px]">
          <div
            className="w-[200px] px-6 pt-6 border-4 border-LIGHT_PURPLE bg-CONNECT_WINDOW"
            style={borderStyles}
          >
            <Image
              src={ConnectPageIllustration}
              alt="Connect Page Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectPage;
