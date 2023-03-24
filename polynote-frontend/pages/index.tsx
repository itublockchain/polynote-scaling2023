import { Container, Header, Navbar } from "components";
import type { NextPage } from "next";
import { AiOutlineWallet } from "react-icons/ai";
import { Button } from "ui";
import LandingIllustrations from "assets/landing-illustrations.png";
import Screens from "assets/screens.png";
import ScreensLight from "assets/screens-light.png";
import ScreensSmLight from "assets/screens-sm-light.png";
import ScreensSm from "assets/screens-sm.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import FeaturesIllustration from "assets/features-illustration.png";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();

  return (
    <>
      <Header />
      <Navbar />
      <section className="w-full min-h-screen m">
        <Container className="mt-[60px] md:mt-[96px] flex flex-col items-center">
          <h1 className="text-[32px] md:text-[64px] font-[700] text-center text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[72px] w-[100%] md:w-[85%]">
            Private <span className="text-blue-600">Note Taking</span>,{" "}
            <span className="text-orange-400">Document Sharing</span>, and{" "}
            <span className="text-green-600">Text Editing</span> Platform
          </h1>
          <h4 className="text-center text-[16px] md:text-[20px] mt-[20px] md:mt-[24px] max-w-[800px] rubik text-MAIN_DARK dark:text-white">
            Polynote uses power of Polybase and encryption to create truly
            decentralized note-taking application environment, combined with
            Push Protocol and Scroll L2
          </h4>
          <Button
            onClick={() => router.push(Paths.CONNECT_WALLET)}
            leftIcon={<AiOutlineWallet />}
            color="primary"
            className="mt-[24px] md:mt-[32px] h-12 pl-4 pr-4"
          >
            Get started
          </Button>
          <Image
            className="w-full"
            src={LandingIllustrations}
            alt="Illustrations"
          />
          <Image
            className="w-full -translate-y-2 hidden md:flex animate-custom-bounce"
            src={theme === "light" ? Screens : ScreensLight}
            alt="Screens"
          />
          <Image
            className="w-full -translate-y-2 flex md:hidden animate-custom-bounce"
            src={theme === "light" ? ScreensSm : ScreensSmLight}
            alt="Screens"
          />
        </Container>

        <Container>
          <Image
            alt="Features"
            className="w-full -translate-y-2 flex md:hidden animate-ping"
            src={FeaturesIllustration}
          />
        </Container>
      </section>
    </>
  );
};

export default Home;
