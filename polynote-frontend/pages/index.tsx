import { Container, Header, Navbar } from "components";
import type { NextPage } from "next";
import { AiFillEdit, AiFillLock, AiOutlineWallet } from "react-icons/ai";
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
import FeaturesIllustrationLight from "assets/features-illustration-light.png";
import { BsFillShareFill, BsGithub, BsTwitter } from "react-icons/bs";
import Polybase from "assets/partners/polybase.png";
import Scroll from "assets/partners/scroll.png";
import Push from "assets/partners/push.png";
import Nest from "assets/partners/nest.png";
import React from "assets/partners/react.png";
import Tiptap from "assets/partners/tiptap.png";
import Filecoin from "assets/partners/filecoin.png";
import Flying from "assets/flying.png";

import Eylul from "assets/team/eylul.png";
import Farhad from "assets/team/farhad.png";
import Taylan from "assets/team/taylan.png";
import Bugra from "assets/team/bugra.png";
import Alim from "assets/team/alim.png";
import { useEffect, useRef } from "react";
import LogoSm from "assets/logo/logo-small.png";
import { SiDocsdotrs } from "react-icons/si";

const Home: NextPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const imageRef = useRef<HTMLImageElement | null>(null);
  const initialPos = useRef<number>(0);
  const offsetTop = useRef<number>(0);

  useEffect(() => {
    if (imageRef.current == null) return;

    initialPos.current =
      window.scrollY + imageRef.current.getBoundingClientRect().top;
    offsetTop.current = imageRef.current.offsetTop;
  }, []);

  useEffect(() => {
    if (imageRef == null) return;

    const onScroll = (e: Event) => {
      if (imageRef.current == null) return;

      const scrollPos = window.scrollY;

      const diff = scrollPos - (initialPos.current - offsetTop.current);

      if (diff > 0) {
        imageRef.current.style.transform = `translateX(-${diff / 1.15}px)`;
      } else {
        imageRef.current.style.transform = "translateX(100px)";
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <section className="w-full min-h-screen mb-[60px] md:mb-[96px]">
        <Container className="mt-[60px] md:mt-[96px] flex flex-col items-center">
          <h1 className="text-[32px] md:text-[64px] font-[700] text-center text-MAIN_DARK dark:text-white mb-0 rubik leading-[40px] md:leading-[72px] w-[100%] md:w-[85%]">
            Private <span className="text-blue-600">Note Taking</span>,{" "}
            <span className="text-orange-400">Document Sharing</span>, and{" "}
            <span className="text-green-600">Text Editing</span> Platform
          </h1>
          <h4 className="text-center text-[16px] md:text-[20px] mt-[20px] md:mt-[24px] max-w-[800px] rubik text-MAIN_DARK dark:text-white">
            Polynote uses power of Polybase and encryption to create truly
            decentralized note-taking application environment, combined with
            Push Protocol, Scroll L2, and Filecoin Virtual Machine
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
            className="max-w-[200px] md:max-w-[300px] ml-auto mr-auto flex hover:animate-pulse mt-[48px]"
            src={
              theme === "dark"
                ? FeaturesIllustrationLight
                : FeaturesIllustration
            }
          />
          <h2 className="text-center mt-[40px] text-[24px] md:text-[48px] font-[600] rubik text-MAIN_DARK dark:text-white rubik">
            Main Features
          </h2>
          <h4 className="text-center mt-[24px] text-[14px] md:text-[20px] font-[400] rubik text-neutral-500 dark:text-neutral-100 max-w-[512px] ml-auto mr-auto rubik">
            Our application make it easy to work with notes by offering
            continiously evolving features
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-[32px] space-y-4 md:space-y-0 md:space-x-8">
            <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
              <div className="bg-PINK rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                <AiFillEdit fontSize={48} />
              </div>
              <h4 className="mt-[12px] text-2xl font-semibold text-DARK_PURPLE dark:text-PINK">
                Rich text editor
              </h4>
              <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                We use the power of TiptapJS to support various text editing
                features, image upload and highlighting.
              </h4>
            </div>
            <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
              <div className="bg-PINK rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                <AiFillLock fontSize={48} />
              </div>
              <h4 className="mt-[12px] text-2xl font-semibold text-DARK_PURPLE dark:text-PINK">
                Encryption
              </h4>
              <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                Your notes are encrypted before being stored. You can make sure
                that your notes are safe and only visible to you!
              </h4>
            </div>
            <div className="col bg-neutral-100 dark:bg-DARK_PURPLE rounded-lg px-4 py-4 md:p-8 shadow-md">
              <div className="bg-PINK rounded-full w-[56px] h-[56px] flex justify-center items-center text-MAIN_DARK p-4">
                <BsFillShareFill fontSize={48} />
              </div>
              <h4 className="mt-[12px] text-2xl font-semibold text-DARK_PURPLE dark:text-PINK">
                Note sharing
              </h4>
              <h4 className="mt-[8px] text-base font-regular text-neutral-500 dark:text-neutral-300 rubik">
                Notes are shared with the security checks of Smart Contract
                deployed on Scroll. You will receive a push notification if
                someone shares a note with you!
              </h4>
            </div>
          </div>
        </Container>

        <div className="sticky top-0">
          <Container className="min-h-screen-overflow md:min-h-screen md:justify-center flex flex-col overflow-hidden">
            <h2 className="text-center mt-[120px] text-[24px] md:text-[48px] font-[600] rubik text-MAIN_DARK dark:text-white rubik">
              Tech Stack
            </h2>
            <h4 className="text-center mt-[24px] text-[14px] md:text-[20px] font-[400] rubik text-neutral-500 dark:text-neutral-100 max-w-[512px] ml-auto mr-auto rubik">
              We are using the latest technologies with high code quality
              standard. All the code is open source and we are open to future
              contributions!
            </h4>

            <div className={`flex flex-wrap mt-[12px] justify-center`}>
              {partners.map((item) => (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="col flex bg-white dark:bg-DARK_PURPLE p-4 lg:p-8 rounded-xl shadow-lg h-[64px] w-[64px] md:w-[112px] md:h-[112px] hover:-translate-y-2 duration-150 mt-4 md:mt-8 mx-2 md:mx-3"
                >
                  <Image
                    alt="image"
                    className="w-full h-full"
                    src={item.image}
                  />
                </a>
              ))}
            </div>

            <div className="lg:px-[80px]">
              <Image
                ref={imageRef}
                src={Flying}
                alt="Flying girl"
                className="w-[180px] mt-10 ml-auto"
              />
            </div>
          </Container>
        </div>

        <div className="h-screen"></div>
        <div className="h-screen-half hidden md:flex"></div>

        <div className="min-h-screen sticky bg-[#fafafa] dark:bg-[#130b1b]">
          <Container className="flex flex-col min-h-screen justify-center">
            <h2 className="text-center mt-[96px] text-[24px] md:text-[48px] font-[600] rubik text-MAIN_DARK dark:text-white rubik">
              Team
            </h2>
            <h4 className="text-center mt-[24px] text-[14px] md:text-[20px] font-[400] rubik text-neutral-500 dark:text-neutral-100 max-w-[512px] ml-auto mr-auto rubik">
              Our team is made up of talented and experienced software, business
              and UI/UX engineers. We are blockchain enthusiast and excited to
              take a role in scaling Ethereum.
            </h4>

            <div
              className={`flex flex-wrap mt-[12px] justify-center  md:max-w-[70%] mx-auto`}
            >
              {team.map((item) => (
                <a
                  key={item.name}
                  target="_blank"
                  className="col flex flex-wrap rounded-xl mt-[96px] mx-[32px] shadow-lg h-[280px] w-[225px] hover:-translate-y-2 duration-150"
                >
                  <Image
                    alt="image"
                    className="w-full h-full"
                    src={item.image}
                  />
                  <div className="flex flex-col w-full items-center justify-center mt-[12px]">
                    <span className="mx-auto text-xl text-black dark:text-white">
                      {item.name}
                    </span>
                    <span className="mx-auto text-sm text-neutral-500 dark:text-neutral-200">
                      {item.role}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </Container>
        </div>
      </section>
      <div className="border-t-1 border-neutral-200 dark:border-DARK_PURPLE py-6 mt-[108px]">
        <Container className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex justify-center items-center md:mr-auto">
            <Image
              src={LogoSm}
              alt="Logo"
              className="mr-3 w-[32px] h-[32px] shrink-0"
            />
            <span className="block text-sm text-neutral-500 dark:text-neutral-200">
              All rights reserved | 2023
            </span>
          </div>
          <div className="flex translate-x-1 mt-4 md:mt-0">
            <a
              className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
              href="https://github.com/itublockchain/polynote-scaling2023/tree/master/polynote-backend"
              referrerPolicy="no-referrer"
              target={"_blank"}
            >
              <BsGithub
                className="hover:scale-110 duration-100"
                fontSize={20}
              />
            </a>
            <a
              className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
              href="https://polynote-api.itublockchain.com/docs"
              referrerPolicy="no-referrer"
              target={"_blank"}
            >
              <SiDocsdotrs
                className="hover:scale-110 duration-100"
                fontSize={20}
              />
            </a>
            <a
              className="text-black dark:text-white hover:scale-110 mr-2 ml-2"
              href="https://twitter.com/ITUblockchain"
              referrerPolicy="no-referrer"
              target={"_blank"}
            >
              <BsTwitter
                className="hover:scale-110 duration-100"
                fontSize={20}
              />
            </a>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Home;

const partners = [
  {
    url: "https://polybase.xyz",
    image: Polybase,
  },
  {
    url: "https://scroll.io/",
    image: Scroll,
  },
  {
    url: "https://fvm.filecoin.io/",
    image: Filecoin,
  },
  { url: "https://push.org", image: Push },
  {
    url: "https://nestjs.com/",
    image: Nest,
  },
  {
    url: "https://react.dev",
    image: React,
  },
  {
    url: "https://tiptap.dev",
    image: Tiptap,
  },
];

const team = [
  {
    name: "Eylul Sahin",
    role: "UI/UX Designer",
    image: Eylul,
  },
  {
    name: "Farhad Asgarov",
    role: "Full Stack Engineer",
    image: Farhad,
  },
  {
    name: "Feyzi Taylan Unal",
    role: "Researcher",
    image: Taylan,
  },
  {
    name: "Bahri Bugra Meydan",
    role: "Frontend Developer",
    image: Bugra,
  },
  {
    name: "Alim Sahin",
    role: "Blockchain Engineer",
    image: Alim,
  },
];
