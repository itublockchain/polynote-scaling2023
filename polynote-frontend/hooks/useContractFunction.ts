import { zksync_testnet } from "consts/chains";
import { ContractInterface, ethers } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { Provider, Contract } from "zksync-web3";

const provider = new Provider(zksync_testnet.rpcUrls.default.http[0]);

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

  const execute = useCallback(
    async <R extends Array<unknown>>(
      type: "write" | "read" = "read",
      ...args: R
    ) => {
      const isRead = type === "read";
      try {
        const contract = new Contract(address, abi, provider);
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
    [abi, address, method, onFail, onSuccess]
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
        const contract = new Contract(address, abi, provider);
        const res = await contract[method](...args);

        return res as R;
      } catch (err) {
        console.error(err);
      }
    },
    [abi, address, method]
  );

  return useMemo(
    () => ({ isFailed, isLoading, read, readPromise, write }),
    [read, write, isLoading, isFailed, readPromise]
  );
};
