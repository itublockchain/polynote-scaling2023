import { useCopyText } from "hooks/useCopyText";
import { ModalController } from "hooks/useModal";
import { useNotify } from "hooks/useNotify";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { BsCheck } from "react-icons/bs";
import { useAiMutation } from "restapi/queries/useAiMutation";
import { Button, Modal, Spinner, Typography } from "ui";
import { useAiModalContext } from "utils/AiModalContext";

type Props = {
  modalController: ModalController;
};

export const AiModal = ({ modalController }: Props) => {
  const {
    mode,
    selection,
    suggestion,
    selectionRange,
    setSuggestion,
    setMode,
    editor,
  } = useAiModalContext();

  const notify = useNotify();
  const mutation = useAiMutation();
  const [copied, onCopy] = useCopyText();

  const [seeOriginal, setSeeOriginal] = useState(false);

  useEffect(() => {
    if (mode == null || selection == null) return;

    mutation.mutate({
      text: selection,
      mode: mode,
    });
  }, [mode, selection]);

  useEffect(() => {
    if (!modalController.isOpen) {
      setSuggestion(null);
      setMode(null);
      setSeeOriginal(false);
    }
  }, [modalController.isOpen, setSuggestion, setMode]);

  return (
    <Modal width="712px" modalController={modalController}>
      <Typography
        className="text-MAIN_PURPLE dark:text-PINK mt-2"
        variant="title4"
        weight="medium"
      >
        Polynote AI - {mode}
      </Typography>

      <div className="flex bg-pink-50 dark:bg-pink-200 rounded-md p-2 mt-2">
        Welcome to PolynoteAI! We are offering various AI features for your text
        editor, currently only in English.
      </div>

      <Typography
        className="text-MAIN_PURPLE dark:text-PINK mt-4 block"
        variant="title5"
        weight="regular"
      >
        Suggestion
      </Typography>
      {mutation.isLoading ? (
        <div className="flex w-full min-h-[200px] items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="min-h-[200px] mt-4 flex flex-col">
          <div className="flex flex-col overflow-y-auto max-h-[220px] mb-4 pb-2">
            <Typography
              className="text-MAIN_PURPLE dark:text-PINK"
              variant="body1"
              weight="regular"
            >
              {suggestion}
            </Typography>

            <Typography
              variant="caption"
              className="mt-2 text-blue-500 cursor-pointer"
              onClick={() => setSeeOriginal(!seeOriginal)}
            >
              {seeOriginal ? "Hide" : "See"} original
            </Typography>
            {seeOriginal && (
              <Typography
                variant="caption"
                className="mt-2 text-MAIN_PURPLE dark:text-PINK"
              >
                {selection}
              </Typography>
            )}
          </div>

          <Button
            onClick={() => {
              if (
                editor == null ||
                selectionRange.from == null ||
                selectionRange.to == null ||
                suggestion == null
              ) {
                notify.error("Invalid selection");
                return;
              }

              editor.commands.insertContentAt(
                {
                  from: selectionRange.from,
                  to: selectionRange.to,
                },
                `${suggestion}`
              );
              modalController.close();
            }}
            color="primary"
            className="h-10 w-full mt-auto"
          >
            Apply
          </Button>

          {suggestion != null && (
            <Button
              rightIcon={copied ? <BsCheck /> : null}
              color="secondary"
              className="h-10 w-full mt-2"
            >
              <CopyToClipboard onCopy={onCopy} text={suggestion}>
                <span>Copy</span>
              </CopyToClipboard>
            </Button>
          )}
        </div>
      )}
    </Modal>
  );
};
