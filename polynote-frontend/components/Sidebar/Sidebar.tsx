import LogoLarge from "assets/logo/logo-large.png";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import Image from "next/image";
import { Button, Input, Typography } from "ui";
import { AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { useAccount } from "wagmi";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { useAvatar } from "hooks/useAvatar";
import { formatAddress } from "utils/formatAddress";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { getPolybaseUserName } from "utils/getPolybaseUserName";
import { usePolybaseUser } from "recoil/user/UserStoreHooks";
import { SettingsModal } from "components";
import { useModal } from "hooks/useModal";
import { FaRegStickyNote } from "react-icons/fa";
import { useNotes } from "recoil/notes/NotesStoreHooks";
import { useState } from "react";
import { BsChevronLeft, BsChevronRight, BsPlus } from "react-icons/bs";
import { clsnm } from "utils/clsnm";

export const Sidebar = () => {
  const theme = useTheme();
  const { address } = useAccount();
  const { openAccountModal } = useAccountModal();
  const avatar = useAvatar(32);
  const polybaseUser = usePolybaseUser();
  const modal = useModal();
  const notes = useNotes();
  const [collapsed, setCollapsed] = useState(true);

  return (
    <>
      <SettingsModal modalController={modal} />
      <div
        className={clsnm(
          "flex flex-col h-screen max-h-screen bg-sidebarLight dark:bg-sidebarDark w-[90vw] absolute md:w-[320px] lg:relative left-0 top-0 shrink-0",
          collapsed && "hidden md:flex"
        )}
      >
        <div className="flex items-center justify-between py-[12px] px-[16px] border-0 border-b-1 border-r-1  border-PINK dark:border-DARK_PURPLE">
          <Image
            className="w-[120px] mt-[2px]"
            src={theme === "dark" ? LogoLargeWhite : LogoLarge}
            alt="Logo"
          />
          <div className="flex space-x-1">
            <Button
              onClick={modal.open}
              className="w-[36px] h-[32px]"
              color={theme === "dark" ? "primary" : "secondary"}
            >
              <AiOutlineSetting />
            </Button>
            <Button
              onClick={() => setCollapsed(true)}
              className="w-[36px] h-[32px] md:hidden"
              color={theme === "dark" ? "primary" : "secondary"}
            >
              <BsChevronLeft />
            </Button>
          </div>
        </div>
        <div
          className="flex flex-col py-[8px] pb-[24px] px-[16px] border-r-1 border-PINK dark:border-DARK_PURPLE"
          style={{ height: "calc(100vh - 57px" }}
        >
          <div
            onClick={openAccountModal}
            className="flex py-[4px] px-[4px] cursor-pointer hover:bg-PINK dark:hover:bg-DARK_PURPLE rounded-[12px]"
          >
            <div
              className="w-[48px] h-[48px] flex shrink-0 bg-PINK  dark:bg-DARK_PURPLE rounded-[12px] items-center justify-center"
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
                {getPolybaseUserName(polybaseUser)}
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
          <div className="mt-[8px]">
            <Input placeholder="Search..." icon={<AiOutlineSearch />} />
          </div>
          <div className="flex w-full overflow-auto mt-auto">
            {notes.length === 0 && (
              <div className="flex flex-col justify-center items-center border-1 border-LIGHT_PURPLE dark:border-DARK_PURPLE rounded-[12px] py-[32px] w-full bg-emptyNoteBg dark:bg-MAIN_DARK p-[24px] pb-[16px]">
                <div className="w-[64px] h-[64px] shrink-0 text-PINK bg-DARK_PURPLE rounded-full flex items-center justify-center">
                  <FaRegStickyNote fontSize={24} />
                </div>
                <Typography
                  variant="body2"
                  weight="regular"
                  className="text-MAIN_DARK dark:text-PINK block mt-[12px]"
                >
                  You don’t have any existing note.
                </Typography>

                <Button
                  leftIcon={<BsPlus />}
                  className="w-full h-10 mt-[12px]"
                  color={theme === "dark" ? "primary" : "secondary"}
                >
                  Create note
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={clsnm(
          "flex-col fixed left-[12px] top-[12px]",
          collapsed ? "flex md:hidden" : "hidden"
        )}
      >
        <Button
          onClick={() => setCollapsed(false)}
          className="w-[36px] h-[32px]"
          color={theme === "dark" ? "primary" : "secondary"}
        >
          <BsChevronRight />
        </Button>
      </div>
    </>
  );
};
