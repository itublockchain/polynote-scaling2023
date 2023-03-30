import { useNotify } from "hooks/useNotify";
import * as PushAPI from "@pushprotocol/restapi";
import {
  goerli,
  useAccount,
  useChainId,
  useSigner,
  useSwitchNetwork,
} from "wagmi";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";
import { CONFIG } from "config";
import { useState } from "react";

export const useOptInMutation = (
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

  const optIn = async () => {
    if (chainId !== goerli.id) {
      await switchNetworkAsync?.(goerli.id);
    }
    setIsLoading(true);

    await PushAPI.channels.subscribe({
      signer: signer as any,
      channelAddress: CONFIG.PUSH_CHANNEL_CAIP,
      userAddress: `eip155:5:${address}`,
      onSuccess: async () => {
        onSuccess?.();
        notify.success("Successfully opted in");
      },
      onError: () => {
        notify.error("Failed to opt in");
      },
      env: ENV.STAGING,
    });

    setIsLoading(false);
  };

  return { optIn, isLoading };
};
