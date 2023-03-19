import { Paths } from "consts/paths";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSetPolybaseUser } from "recoil/user/UserStoreHooks";
import { apiGetPolybaseUser, POLYBASE_USER_QUERY } from "restapi";
import { PolybaseUser } from "restapi/types";
import { useAccount } from "wagmi";

export const usePolybaseUserQuery = () => {
  const { address } = useAccount();
  const setPolybaseUser = useSetPolybaseUser();
  const router = useRouter();

  const { data, ...rest } = useQuery({
    queryKey: POLYBASE_USER_QUERY,
    queryFn: () =>
      apiGetPolybaseUser(address as string).then((res) => {
        const user = res.data.user;

        if (user == null) {
          return null;
        }

        return user;
      }),
    onError: () => {
      router.replace(Paths.CONNECT_WALLET);
    },
    enabled: address != null,
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setPolybaseUser(data);
  }, [data, setPolybaseUser]);

  return { user: data as PolybaseUser | null, ...rest };
};
