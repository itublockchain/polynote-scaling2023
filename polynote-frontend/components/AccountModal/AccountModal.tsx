import { usePolybaseUserQuery } from "restapi/queries";
import { Button, Modal, Typography } from "ui";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import LogoLarge from "assets/logo/logo-large.png";
import Image from "next/image";
import { useAccount, useSignMessage } from "wagmi";
import { useCreatePolybaseUserMutation } from "restapi/queries/useCreatePolybaseUserMutation";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { usePolybaseUser } from "recoil/user/UserStoreHooks";

export const AccountModal = () => {
  const { isLoading } = usePolybaseUserQuery();
  const theme = useTheme();
  const { address } = useAccount();
  const polybaseUser = usePolybaseUser();

  const createPolybaseUserMutation = useCreatePolybaseUserMutation();

  const { signMessage, isLoading: isSigning } = useSignMessage({
    onSuccess: (res) => {
      createPolybaseUserMutation.mutate({
        address: address as string,
        signature: res,
      });
    },
  });

  return (
    <Modal
      showCloseIcon={false}
      width="512px"
      closeOnClickOutside={false}
      modalController={{
        isOpen: polybaseUser == null && !isLoading,
        close: () => undefined,
        open: () => undefined,
      }}
    >
      <div className="pt-4 pb-4">
        <Image
          className="w-[40%] ml-auto mr-auto"
          src={theme === "dark" ? LogoLargeWhite : LogoLarge}
          alt="Logo"
        />
        <Typography
          className="text-MAIN_DARK dark:text-PINK mt-4 block text-center pl-4 pr-4"
          weight="regular"
          variant="body1"
        >
          Create your account on Polynote by signing the message below:
          <br />
          <code className="mt-2 text-sm block">
            I accept creating Polynote account
          </code>
        </Typography>
        <Button
          loading={createPolybaseUserMutation.isLoading || isSigning}
          onClick={() => {
            signMessage({
              message: "I accept creating Polynote account",
            });
          }}
          className="w-[90%] ml-auto mr-auto h-10 mt-5"
          color={theme === "dark" ? "secondary" : "primary"}
        >
          Create account
        </Button>
      </div>
    </Modal>
  );
};
