import { ModalController } from "hooks/useModal";
import { Button, Input, Modal, Typography } from "ui";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { useDropdown } from "hooks/useDropdown";
import { useEffect, useMemo, useState } from "react";
import { useCreateNoteMutation } from "restapi/queries/useCreateNoteMutation";
import { useAccount } from "wagmi";

type Props = {
  modalController: ModalController;
};

export const CreateNoteModal = ({ modalController }: Props) => {
  const { address } = useAccount();
  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [emoji, setEmoji] = useState("➕");

  const { reference, popperStyles, floating, isOpen, toggle, close, closeRef } =
    useDropdown({
      strategy: "fixed",
      topDistance: 12,
      placement: "bottom-start",
    });

  useEffect(() => {
    if (!modalController.isOpen) {
      setTitle("");
      setEmoji("➕");
    }
  }, [modalController.isOpen]);

  const createNoteMutation = useCreateNoteMutation({
    onSuccess: () => modalController.close(),
  });

  const isSubmitDisabled = useMemo(() => {
    if (title.trim() === "" || emoji === "➕") {
      return true;
    }
    return false;
  }, [title, emoji]);

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

        <div ref={closeRef} className="mt-4 2 w-max">
          <Typography variant="body2" className="text-MAIN_DARK dark:text-PINK">
            Emoji describing your note
          </Typography>
          <div ref={reference} className="mt-2">
            <Button
              className="w-[64px] h-[64px] shrink-0"
              color={theme === "dark" ? "primary" : "secondary"}
              onClick={toggle}
            >
              <span className="text-3xl">{emoji}</span>
            </Button>
          </div>
          {isOpen && (
            <div ref={floating} style={popperStyles}>
              <Picker
                theme={theme}
                data={data}
                onEmojiSelect={(res: any) => {
                  setEmoji(res.native);
                  close();
                }}
              />
            </div>
          )}
        </div>

        <Input
          placeholder="Title"
          containerClassName="mt-4"
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button
          disabled={isSubmitDisabled}
          loading={createNoteMutation.isLoading}
          onClick={() =>
            createNoteMutation.mutate({
              address: address as string,
              content: "<p></p>",
              emoji,
              title,
            })
          }
          color={theme === "dark" ? "primary" : "secondary"}
          className="h-10 w-full mt-4"
        >
          Create
        </Button>
      </div>
    </Modal>
  );
};
