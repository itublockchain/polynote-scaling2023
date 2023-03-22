import { scroll } from "consts/chains";
import { useEffect } from "react";
import { useSwitchNetwork } from "wagmi";

export const useListenNetworkChange = (interval = 2000) => {
  const { switchNetwork } = useSwitchNetwork({
    chainId: scroll.id,
  });

  useEffect(() => {
    const timeout = setInterval(() => {
      switchNetwork?.();
    }, interval);

    return () => {
      clearInterval(timeout);
    };
  }, [switchNetwork, interval]);
};
