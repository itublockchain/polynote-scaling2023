import { POLYNOTE_ABI } from "consts/abi";
import { POLYNOTE_CONTRACT_SCROLL } from "consts/contracts";
import { ModalController } from "hooks/useModal";
import { useState } from "react";
import { Note } from "recoil/notes/types";
import { Modal, Typography } from "ui";
import { useContractRead } from "wagmi";

type Props = {
  modalController: ModalController;
  selectedNote: Note;
};

export const ShareModal = ({ modalController, selectedNote }: Props) => {
  const [whitelist, setWhitelist] = useState([]);

  const { data, isLoading } = useContractRead({
    abi: POLYNOTE_ABI,
    address: POLYNOTE_CONTRACT_SCROLL,
    functionName: "getSharedAddresses",
    args: [selectedNote.address, selectedNote.id],
  });

  console.log(data);

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
      </div>
    </Modal>
  );
};
