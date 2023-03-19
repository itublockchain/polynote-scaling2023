import { ModalController } from "hooks/useModal";
import { Input, Modal, Typography } from "ui";

type Props = {
  modalController: ModalController;
};

export const CreateNoteModal = ({ modalController }: Props) => {
  return (
    <Modal
      width="540px"
      closeOnClickOutside={false}
      modalController={modalController}
    >
      <div className="py-[12px] px-[12px]">
        <Typography variant="title4" className="text-MAIN_DARK dark:text-PINK">
          Create note
        </Typography>

        <Input containerClassName="mt-4" label="Emoji" />
        <Input containerClassName="mt-4" label="Title" />
      </div>
    </Modal>
  );
};
