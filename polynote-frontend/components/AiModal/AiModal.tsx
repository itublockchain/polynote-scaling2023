import { ModalController } from "hooks/useModal";
import { useEffect } from "react";
import { Modal } from "ui";
import { useAiModalContext } from "utils/AiModalContext";

type Props = {
  modalController: ModalController;
};

export const AiModal = ({ modalController }: Props) => {
  const aiModalContext = useAiModalContext();

  useEffect(() => {
    if (aiModalContext.mode == null) return;
  }, [aiModalContext.mode]);

  return (
    <Modal width="512px" modalController={modalController}>
      {aiModalContext.selection}
    </Modal>
  );
};
