import { ModalController } from "hooks/useModal";
import { usePolybaseUserQuery } from "restapi/queries";
import { Modal } from "ui";

type Props = {
  modalController: ModalController;
};

export const AccountModal = ({ modalController }: Props) => {
  const { user } = usePolybaseUserQuery();

  console.log(user);

  return (
    <Modal
      closeOnClickOutside={false}
      modalController={{
        isOpen: true,
        close: () => undefined,
        open: () => undefined,
      }}
    >
      <div></div>
    </Modal>
  );
};
