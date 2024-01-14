import { CONFIG } from "config";
import { scroll_testnet } from "consts/chains";
import { useEffect } from "react";
import { useSwitchNetwork } from "wagmi";

export const useListenNetworkChange = (
  interval = 2000,
  pauseExecution = false
) => {
  const { switchNetwork } = useSwitchNetwork({
    chainId: CONFIG.CHAINS[0].id,
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      if (pauseExecution) {
        return;
      }

      switchNetwork?.();
    }, interval);

    return () => {
      clearInterval(timeout);
    };
  }, [switchNetwork, interval, pauseExecution]);
};
