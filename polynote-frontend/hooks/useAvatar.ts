import { useEffect, useState } from "react";
import { getUserAvatar } from "utils/getAvatar";
import { useAccount } from "wagmi";

export const useAvatar = (size = 128) => {
  const [avatar, setAvatar] = useState<string>("");
  const { address } = useAccount();

  useEffect(() => {
    if (address == null) return;

    setAvatar(getUserAvatar(address, size));
  }, [address, size]);

  return avatar;
};
