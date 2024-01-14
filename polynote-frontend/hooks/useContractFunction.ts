import { Contract, ContractInterface, ethers, Signer } from "ethers";
import { useCallback, useMemo, useState } from "react";
import { HexString } from "types";
import { Abi } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";

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
  const provider = usePublicClient();
  const signer = useWalletClient();

  const execute = useCallback(
    async <R extends Array<unknown>>(
      type: "write" | "read" = "read",
      ...args: R
    ) => {
      const isRead = type === "read";
      try {
        setIsLoading(true);
        setIsFailed(false);
        let res;
        if (isRead) {
          res = await provider.readContract({
            abi: abi as Abi,
            address: address as HexString,
            functionName: method,
            args: args,
          });
        } else {
          const walletClient = signer.data;
          res = await walletClient?.writeContract({
            abi: abi as Abi,
            address: address as HexString,
            functionName: method,
            args: args,
          });
        }

        setIsLoading(false);
        onSuccess?.(res as T);
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
        const res = await provider.readContract({
          abi: abi as Abi,
          address: address as HexString,
          functionName: method,
          args: args,
        });
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
