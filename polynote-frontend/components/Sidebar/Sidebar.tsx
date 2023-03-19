import LogoLarge from "assets/logo/logo-large.png";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import { useTheme } from "recoil/theme/ThemeStore";
import Image from "next/image";
import { Button, Typography } from "ui";
import { AiFillSetting } from "react-icons/ai";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAvatar } from "hooks/useAvatar";
import { formatAddress } from "utils/formatAddress";

export const Sidebar = () => {
  const theme = useTheme();
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const avatar = useAvatar(32);

  return (
    <div className="flex flex-col min-h-screen bg-sidebarLight dark:bg-sidebarDark w-[90vw] absolute md:w-[320px] lg:relative left-0 top-0">
      <div className="flex items-center justify-between py-[12px] px-[16px] border-0 border-b-1 border-r-1  border-PINK dark:border-DARK_PURPLE">
        <Image
          className="w-[120px] mt-[2px]"
          src={theme === "dark" ? LogoLargeWhite : LogoLarge}
          alt="Logo"
        />
        <Button
          className="w-[36px] h-[32px]"
          color={theme === "dark" ? "primary" : "secondary"}
        >
          <AiFillSetting />
        </Button>
      </div>
      <div className="h-full flex-1 py-[8px] px-[8px] border-r-1 border-PINK dark:border-DARK_PURPLE">
        <div
          onClick={openAccountModal}
          className="flex py-[8px] px-[4px] cursor-pointer hover:bg-DARK_PURPLE rounded-[12px]"
        >
          <div
            className="w-[48px] h-[48px]   flex shrink-0 bg-DARK_PURPLE rounded-[12px] items-center justify-center"
            dangerouslySetInnerHTML={{
              __html: avatar,
            }}
          ></div>
          <div className="flex flex-col ml-[8px] overflow-hidden">
            <Typography
              variant="title4"
              weight="medium"
              className="text-MAIN_DARK dark:text-PINK whitespace-nowrap text-ellipsis overflow-hidden"
            >
              Farhad Asgarov
            </Typography>
            {address != null && (
              <Typography
                variant="caption"
                weight="medium"
                className="text-MAIN_DARK dark:text-PINK"
              >
                {formatAddress(address)}
              </Typography>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
