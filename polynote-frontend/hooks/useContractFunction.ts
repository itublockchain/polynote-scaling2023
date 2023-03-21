import { Contract, ContractInterface, ethers, Signer } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { useProvider, useSigner } from "wagmi";

export const useContractFunction = <T>({
  address,
  abi,
  method,
  onFail,
  onSuccess,
}: {
  address: string;
  abi: ContractInterface;
  method: string;
  onFail?: (err: unknown) => void;
  onSuccess?: (res: T) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const provider = useProvider();
  const signer = useSigner();

  const execute = useCallback(
    async <R extends Array<unknown>>(
      type: "write" | "read" = "read",
      ...args: R
    ) => {
      const isRead = type === "read";
      try {
        const contract = new Contract(
          address,
          abi,
          isRead
            ? (provider as ethers.providers.Web3Provider)
            : (signer.data as ethers.providers.JsonRpcSigner)
        );
        setIsLoading(true);
        setIsFailed(false);
        const res = await contract[method](...args);
        let txn;
        if (!isRead) {
          txn = await res.wait();
        }
        setIsLoading(false);
        onSuccess?.(!isRead ? txn : res);

        if (isRead) {
          return res;
        }
      } catch (err) {
        setIsFailed(true);
        setIsLoading(false);
        onFail?.(err);
        console.error(err);
      }
    },
    [abi, address, method, onFail, onSuccess, provider, signer]
  );

  const write = useCallback(
    <T extends Array<unknown>>(...args: T) => {
      execute("write", ...args);
    },
    [execute]
  );

  const read = useCallback(
    <T extends Array<unknown>>(...args: T) => {
      return execute("read", ...args);
    },
    [execute]
  );

  const readPromise = useCallback(
    async <T extends Array<unknown> = [], R = unknown>(...args: T) => {
      try {
        const contract = new Contract(
          address,
          abi,
          provider as ethers.providers.Web3Provider
        );
        const res = await contract[method](...args);

        return res as R;
      } catch (err) {
        console.error(err);
      }
    },
    [abi, provider, address, method]
  );

  return useMemo(
    () => ({ isFailed, isLoading, read, readPromise, write }),
    [read, write, isLoading, isFailed, readPromise]
  );
};
