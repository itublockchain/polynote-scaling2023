import { ConnectButton } from "@rainbow-me/rainbowkit";
import { AiFillWarning, AiOutlineUser, AiOutlineWallet } from "react-icons/ai";
import { Button } from "ui/Button/Button";

export const CustomConnectButton = ({
  containerClassName,
  className,
  changeAccountText,
  disableAccountIcon,
}: {
  containerClassName?: string;
  className?: string;
  changeAccountText?: string;
  disableAccountIcon?: boolean;
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            className={containerClassName}
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    className={className}
                    leftIcon={<AiOutlineWallet />}
                    color="primary"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect Wallet
                  </Button>
                );
              }

              if (chain.unsupported) {
                return (
                  <Button
                    className={className}
                    leftIcon={<AiFillWarning />}
                    color="secondary"
                    onClick={openChainModal}
                    type="button"
                  >
                    Wrong Network
                  </Button>
                );
              }

              return (
                <div>
                  <Button
                    leftIcon={disableAccountIcon ? null : <AiOutlineUser />}
                    className={className}
                    color="secondary"
                    onClick={openAccountModal}
                    type="button"
                  >
                    {changeAccountText ?? account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
