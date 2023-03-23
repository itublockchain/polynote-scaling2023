import Logo from "assets/logo/logo-large.png";
import LogoWhite from "assets/logo/logo-large-white.png";
import { Container } from "components";
import { Paths } from "consts/paths";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineWallet } from "react-icons/ai";
import { useTheme, useToggleTheme } from "recoil/theme/ThemeStoreHooks";
import { Button } from "ui";
import { BsFillMoonFill, BsSunFill } from "react-icons/bs";

export const Navbar = () => {
  const router = useRouter();
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  return (
    <div className="sticky top-0 h-[72px] flex items-center border-b-1 border-[#e7e7e7] dark:border-none bg-[#ffffffC0] dark:bg-[#bd97e910] z-50">
      <Container>
        <div className="flex justify-between">
          <div className="w-[150px] flex items-center">
            <Image
              alt="Logo"
              src={theme === "dark" ? LogoWhite : Logo}
              className="w-full shrink-0"
            />
          </div>
          <div className="flex space-x-3">
            <Button
              onClick={() => router.push(Paths.CONNECT_WALLET)}
              leftIcon={<AiOutlineWallet />}
              color="primary"
              className="h-12 w-[48px] md:w-max pl-2 md:pl-4 md:pr-4"
            >
              <span className="hidden md:flex">Get started</span>
            </Button>
            <Button
              className="w-[48px]"
              leftIcon={theme === "dark" ? <BsFillMoonFill /> : <BsSunFill />}
              onClick={toggleTheme}
              color="primary"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
