import { useNotify } from "hooks/useNotify";
import { useAccount, useChainId, useSwitchNetwork } from "wagmi";
import { useState } from "react";

export const useOptInMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const notify = useNotify();
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { switchNetworkAsync } = useSwitchNetwork();
  const chainId = useChainId();

  const optIn = async () => {};

  return { optIn, isLoading };
};
