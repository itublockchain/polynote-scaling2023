import { POLYNOTE_ABI } from "consts/abi";
import { ethers } from "ethers";
import { useContractFunction } from "hooks/useContractFunction";
import { ModalController } from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Note } from "recoil/notes/types";
import { Button, Input, Modal, Typography } from "ui";
import { formatAddress } from "utils/formatAddress";
import { useChainId, useContractRead, useSwitchNetwork } from "wagmi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCopyText } from "hooks/useCopyText";
import { formatRpcErrorMessage } from "utils/formatRPCErrorMessage";
import { getSharedMessage } from "utils/getSharedMessage";
import { useNotify } from "hooks/useNotify";
import { useListenNetworkChange } from "hooks/useListenNetworkChange";
import { POLYNOTE_CONTRACT } from "consts/contracts";
import { CONFIG } from "config";

type Props = {
  modalController: ModalController;
  selectedNote: Note;
};

export const ShareModal = ({ modalController, selectedNote }: Props) => {
  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [addingAddress, setAddingAddress] = useState("");
  const { switchNetwork } = useSwitchNetwork({
    chainId: CONFIG.CHAINS[0].id,
  });
  const chainId = useChainId();
  const [isChainIdCorrect, setIsChainIdCorrect] = useState(true);
  const notify = useNotify();

  useListenNetworkChange(1000, !modalController.isOpen);

  const [copied, onCopy] = useCopyText();

  const { data, refetch } = useContractRead<any, "getSharedAddress", string[]>({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT,
    functionName: "getSharedAddresses",
    args: [selectedNote.address, selectedNote.id],
  });

  const { write, isLoading: isLoadingSet } = useContractFunction({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT,
    method: "setPartners",
    onSuccess: () => {
      notify.success("Note shared successfully");
      setTimeout(() => {
        refetch();
      }, 1000);
      setTimeout(() => {
        refetch();
      }, 4000);
    },
    onFail: (err) => {
      formatRpcErrorMessage(err);
    },
  });

  useEffect(() => {
    if (Array.isArray(data)) {
      setWhitelist(data ?? []);
    }
  }, [data]);

  const addingError = useMemo(() => {
    if (whitelist.includes(addingAddress)) {
      return "Address already in list";
    }

    if (!ethers.utils.isAddress(addingAddress)) {
      return "Invalid ETH address";
    }

    return null;
  }, [whitelist, addingAddress]);

  useEffect(() => {
    const fn = async () => {
      setIsChainIdCorrect(chainId === CONFIG.CHAINS[0].id);
    };
    fn();
  }, [chainId]);

  return (
    <Modal width="540px" modalController={modalController}>
      <div className="flex flex-col">
        <Typography
          weight="medium"
          className="text-MAIN_DARK dark:text-PINK"
          variant="title4"
        >
          Share
        </Typography>
        <Typography
          className="text-MAIN_DARK dark:text-PINK mt-2"
          variant="body2"
        >
          You can control who can see the documents and share them.
        </Typography>

        <div className="flex space-x-1">
          <Input
            error={
              addingError != null && addingAddress.trim() != ""
                ? addingError
                : null
            }
            containerClassName="mt-1 w-full"
            label="ETH Address"
            value={addingAddress}
            onChange={(e) => setAddingAddress(e.target.value)}
          />
        </div>
        <Button
          onClick={() => {
            setWhitelist([...whitelist, addingAddress]);
            setAddingAddress("");
          }}
          disabled={addingError != null}
          color="secondary"
          className="h-12 mt-2 w-full"
        >
          Add
        </Button>

        <div className="flex flex-wrap mt-4">
          {whitelist.map((item) => {
            return (
              <div
                key={item}
                className="p-2 pr-1 flex items-center text-white bg-DARK_PURPLE rounded-md mt-1 mr-1"
              >
                <span>{formatAddress(item)}</span>
                <div
                  onClick={() => {
                    setWhitelist(whitelist.filter((i) => i != item));
                  }}
                  className="ml-[4px] hover:bg-MAIN_DARK p-1 cursor-pointer"
                >
                  <AiOutlineClose />
                </div>
              </div>
            );
          })}
          {whitelist.length === 0 && (
            <Typography
              variant="body2"
              className="text-MAIN_DARK dark:text-PINK"
            >
              There is no user in whitelist
            </Typography>
          )}
        </div>

        <Button
          loading={isLoadingSet}
          onClick={() => {
            if (isChainIdCorrect) {
              write(selectedNote.id, whitelist);
            } else {
              switchNetwork?.();
            }
          }}
          color="primary"
          className="h-10 mt-4"
        >
          {isChainIdCorrect ? "Update whitelist" : "Wrong network"}
        </Button>

        <div className="flex w-full justify-center space-x-1 items-center mt-4">
          <CopyToClipboard
            onCopy={onCopy}
            text={getSharedMessage(selectedNote.id)}
          >
            <Typography
              className="cursor-pointer text-blue-400 text-center"
              variant="caption"
              weight="regular"
            >
              Copy share link
            </Typography>
          </CopyToClipboard>
          {copied ? <AiOutlineCheck className="text-green-500" /> : null}
        </div>
      </div>
    </Modal>
  );
};
