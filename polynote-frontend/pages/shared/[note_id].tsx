import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAccount, useSignMessage } from "wagmi";
import { useMutation } from "react-query";
import { apiGetSharedNote } from "restapi";
import { useEffect, useState } from "react";
import { Note } from "recoil/notes/types";
import { AxiosError, AxiosResponse } from "axios";
import { CustomConnectButton, Spinner, Typography } from "ui";
import Image from "next/image";
import EmptyStateIllustration from "assets/empty-state-illustration.png";
import { Header, Navbar } from "components";
import { formatAddress } from "utils/formatAddress";
import { useAccountModal } from "@rainbow-me/rainbowkit";
import { Paths } from "consts/paths";
import { Messages } from "consts";

const NoteId: NextPage = () => {
  const router = useRouter();
  const { note_id } = router.query;
  const [note, setNote] = useState<Note | null>(null);
  const [errorCode, setErrorCode] = useState<number>(-1);
  const { isConnected, address } = useAccount();
  const { openAccountModal } = useAccountModal();

  const mutation = useMutation({
    mutationFn: (args: string[]) =>
      apiGetSharedNote(args[0], {
        address: args[1],
        signature: args[2],
      }).then((res: AxiosResponse<Note>) => {
        return res.data;
      }),
    onSuccess: (res) => {
      setNote(res);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status != null) {
        setErrorCode(err.response.status);
      }
    },
  });

  const { signMessage, isLoading } = useSignMessage({
    onSuccess: (res) => {
      mutation.mutate([note_id as string, address as string, res]);
    },
    onError: () => {
      router.replace(Paths.CONNECT_WALLET);
    },
    message: Messages.SEE_SHARED_NOTE,
  });

  useEffect(() => {
    if (note_id == null || address == null || isConnected == false) {
      return;
    }

    const timeout = setTimeout(() => {
      signMessage();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line
  }, [note_id, address, isConnected]);

  if (!isConnected) {
    return (
      <>
        <Header title="Shared note" />
        <div className="flex flex-col h-[100vh] justify-center items-center pl-[24px] pr-[24px] w-[90%] md:w-[400px] ml-auto mr-auto">
          <div className="w-[200px] px-6 pt-6">
            <Image
              src={EmptyStateIllustration}
              alt="Connect Page Illustration"
            />
          </div>
          <CustomConnectButton
            containerClassName="w-[220px] md:w-[90%] mt-[32px]"
            className="w-full h-10 rounded-lg"
          />
        </div>
      </>
    );
  }

  if (mutation.isError) {
    return (
      <>
        <Header title="Shared note" />
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center pl-[24px] pr-[24px]">
          <Image
            width={160}
            className="mb-[20px]"
            src={EmptyStateIllustration}
            alt="Empty state"
          />

          {errorCode === 401 ? (
            <>
              <Typography
                weight="medium"
                variant="title4"
                className="text-MAIN_DARK dark:text-PINK mt-4 text-center"
              >
                You are not authorized to see this content
              </Typography>
              <Typography
                variant="body2"
                className="text-MAIN_DARK dark:text-PINK mt-2 text-center"
              >
                Connected as{" "}
                <span
                  className="cursor-pointer text-blue-400"
                  onClick={openAccountModal}
                >
                  {formatAddress(address as string)}
                </span>
              </Typography>
            </>
          ) : errorCode === 404 ? (
            <Typography
              weight="medium"
              variant="title4"
              className="text-MAIN_DARK dark:text-PINK mt-4 text-center"
            >
              Note does not exist with id of {note_id}.
            </Typography>
          ) : (
            <Typography
              weight="medium"
              variant="title4"
              className="text-MAIN_DARK dark:text-PINK mt-4 text-center"
            >
              Something went wrong. Please try again later
            </Typography>
          )}
        </div>
      </>
    );
  }

  if (mutation.isLoading || isLoading || note == null) {
    return (
      <>
        <Header title="Shared note" />
        <div className="flex flex-col w-[100vw] h-[100vh] justify-center items-center">
          <Spinner size={36} />
          <Typography
            variant="body1"
            className="text-MAIN_DARK dark:text-PINK mt-4"
          >
            Getting note...
          </Typography>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Shared note" />
      <Navbar />
      <div className="flex w-full min-h-screen max-h-screen overflow-y-auto pl-[24px] pr-[24px] md:pl-[20%] md:pr-[20%] pt-[32px] md:pt-[64px] pb-[32px] md:pb-[64px] md:mb-[32px]">
        <div className="flex flex-col">
          <div className="text-4xl cursor-pointer">{note.emoji}</div>

          <Typography
            className=" text-black dark:text-white"
            variant="title1"
            style={{
              fontSize: "48px",
              fontWeight: "700",
              marginBottom: "12px",
              marginTop: "12px",
            }}
          >
            {note.title}
          </Typography>

          <div
            className="ProseMirror mt-4 text-black dark:text-white"
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default NoteId;
