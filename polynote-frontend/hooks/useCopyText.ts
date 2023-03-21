import { useCallback, useState } from "react";

export const useCopyText = () => {
  const [copied, setCopied] = useState(false);

  const onAddressCopied = useCallback((text?: string, result?: boolean) => {
    console.log("[COPY]", text, result);
    setCopied(true);
    const timeout = setTimeout(() => {
      setCopied(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return [copied, onAddressCopied as any];
};
