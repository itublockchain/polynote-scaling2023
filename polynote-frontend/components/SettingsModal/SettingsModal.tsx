import { ModalController } from "hooks/useModal";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useTheme, useToggleTheme } from "recoil/theme/ThemeStoreHooks";
import { usePolybaseUser } from "recoil/user/UserStoreHooks";
import { useUpdatePolybaseUserNameMutation } from "restapi/queries";
import { Button, Input, Modal, Typography } from "ui";

type Props = {
  modalController: ModalController;
};

export const SettingsModal = ({ modalController }: Props) => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const polybaseUser = usePolybaseUser();
  const [editedName, setEditedName] = useState("");

  const updatePolybaseUserNameMutation = useUpdatePolybaseUserNameMutation({
    onSuccess: () => modalController.close(),
  });

  useEffect(() => {
    setEditedName(polybaseUser?.name ?? "");
  }, [polybaseUser?.name]);

  return (
    <Modal width="400px" modalController={modalController}>
      <div className="pt-[12px] pb-32px">
        <Typography
          className="text-MAIN_DARK dark:text-PINK"
          variant="title4"
          weight="semibold"
        >
          Settings
        </Typography>

        <Input
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          placeholder="Account name"
          label="Polynote account name"
          containerClassName="mt-4"
          icon={<AiOutlineUser />}
        />

        <Button
          loading={updatePolybaseUserNameMutation.isLoading}
          disabled={editedName.trim() === ""}
          className="h-[40px] w-full mt-[8px]"
          onClick={() => {
            updatePolybaseUserNameMutation.mutate({
              name: editedName,
            });
          }}
          color={theme === "dark" ? "secondary" : "primary"}
        >
          Save
        </Button>

        <Typography
          className="text-MAIN_DARK dark:text-PINK mt-4 block"
          variant="body2"
          weight="regular"
        >
          Theme
        </Typography>

        <Button
          className="h-[40px] w-full mt-[8px]"
          onClick={toggleTheme}
          color={theme === "dark" ? "primary" : "secondary"}
        >
          {theme == "dark" ? "Dark" : "Light"}
        </Button>
      </div>
    </Modal>
  );
};
