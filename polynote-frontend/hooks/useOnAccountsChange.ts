import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";

export const useOnAccountsChange = (callback: () => void) => {
  const { address } = useAccount();

  const firstAddressRef = useRef<null | string>(null);
  useEffect(() => {
    if (address == null || firstAddressRef.current != null) return;
    firstAddressRef.current = address;
  }, [address]);

  useEffect(() => {
    if (firstAddressRef.current == null || address == null) return;

    if (firstAddressRef.current != address) {
      callback?.();
      firstAddressRef.current = address;
    }
  }, [address, callback]);
};
