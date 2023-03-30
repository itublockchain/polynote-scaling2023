import { useNotify } from "hooks/useNotify";
import { useState } from "react";
import {
  goerli,
  useAccount,
  useChainId,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import * as PushAPI from "@pushprotocol/restapi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { CONFIG } from "config";

export const useOptOutMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const notify = useNotify();
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { switchNetworkAsync } = useSwitchNetwork();
  const chainId = useChainId();

  const optOut = async () => {
    if (chainId !== goerli.id) {
      await switchNetworkAsync?.(goerli.id);
    }
    setIsLoading(true);

    await PushAPI.channels.unsubscribe({
      signer: signer as any,
      channelAddress: CONFIG.PUSH_CHANNEL_CAIP,
      userAddress: `eip155:5:${address}`,
      onSuccess: async () => {
        onSuccess?.();
        notify.success("Successfully opted out");
      },
      onError: () => {
        notify.error("Failed to opt out");
      },
      env: ENV.STAGING,
    });

    setIsLoading(false);
  };

  return { optOut, isLoading };
};
