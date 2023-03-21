import { POLYNOTE_ABI } from "consts/abi";
import { POLYNOTE_CONTRACT_SCROLL } from "consts/contracts";
import { ethers } from "ethers";
import { useContractFunction } from "hooks/useContractFunction";
import { ModalController } from "hooks/useModal";
import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Note } from "recoil/notes/types";
import { Button, Input, Modal, Typography } from "ui";
import { formatAddress } from "utils/formatAddress";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

type Props = {
  modalController: ModalController;
  selectedNote: Note;
};

export const ShareModal = ({ modalController, selectedNote }: Props) => {
  const [whitelist, setWhitelist] = useState<string[]>([]);

  const [addingAddress, setAddingAddress] = useState("");

  const { data, refetch } = useContractRead<any, "getSharedAddress", string[]>({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT_SCROLL,
    functionName: "getSharedAddresses",
    args: [selectedNote.address, selectedNote.id],
  });

  const { write, isLoading: isLoadingSet } = useContractFunction({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT_SCROLL,
    method: "addPartners",
    onSuccess: () => {
      setTimeout(() => {
        refetch();
      }, 1000);
      setTimeout(() => {
        refetch();
      }, 4000);
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
        </div>

        {whitelist.length > 0 && (
          <Button
            loading={isLoadingSet}
            onClick={() => write(selectedNote.id, whitelist)}
            color="primary"
            className="h-10 mt-4"
          >
            Update whitelist
          </Button>
        )}

        <Typography
          className="cursor-pointer mt-4 text-blue-400 text-center"
          variant="caption"
          weight="regular"
        >
          Copy share link
        </Typography>
      </div>
    </Modal>
  );
};
