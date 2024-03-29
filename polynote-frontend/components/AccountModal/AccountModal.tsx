import { usePolybaseUserQuery } from "restapi/queries";
import { Button, Modal, Typography } from "ui";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import LogoLarge from "assets/logo/logo-large.png";
import Image from "next/image";
import { useAccount, useSignMessage } from "wagmi";
import { useCreatePolybaseUserMutation } from "restapi/queries/useCreatePolybaseUserMutation";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { usePolybaseUser, useSetToken } from "recoil/user/UserStoreHooks";
import { useEffect, useRef } from "react";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useAuthUserMutation } from "restapi/queries/useAuthUserMutation";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";
import { Messages } from "consts";

export const AccountModal = () => {
  const { isLoading } = usePolybaseUserQuery();
  const theme = useTheme();
  const { address } = useAccount();
  const polybaseUser = usePolybaseUser();
  const router = useRouter();
  const checkedRef = useRef(false);
  const setToken = useSetToken();

  const createPolybaseUserMutation = useCreatePolybaseUserMutation();
  const authUserMutation = useAuthUserMutation();

  const {
    isLoading: isSigningRegistration,
    signMessage: signMessageForRegister,
  } = useSignMessage({
    message: Messages.CREATE_ACCOUNT,
    onSuccess: (res) => {
      createPolybaseUserMutation.mutate({
        address: address as string,
        signature: res,
      });
    },
    onError: () => {
      router.replace(Paths.CONNECT_WALLET);
    },
  });

  const { signMessage: signMessageForAuth } = useSignMessage({
    onSuccess: (res) => {
      authUserMutation.mutate({
        address: address as string,
        signature: res,
      });
    },
    onError: () => {
      router.replace(Paths.CONNECT_WALLET);
    },
    message: Messages.SIGN_IN,
  });

  useEffect(() => {
    if (checkedRef.current) {
      return;
    }
    if (polybaseUser?.address != null) {
      const access_token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (access_token == null) {
        signMessageForAuth();
        checkedRef.current = true;
      } else {
        setToken(access_token);
      }
    }
    // eslint-disable-next-line
  }, [polybaseUser?.address, setToken]);

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
          <code className="mt-2 text-sm block">Register</code>
        </Typography>
        <Button
          loading={
            createPolybaseUserMutation.isLoading || isSigningRegistration
          }
          onClick={() => {
            signMessageForRegister();
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
