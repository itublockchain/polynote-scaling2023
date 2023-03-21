import { AxiosError, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { queryClient } from "pages/_app";
import { useMutation } from "react-query";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiCreatePolybaseUser, POLYBASE_USER_QUERY } from "restapi";
import { CreatePolybaseUserDto } from "restapi/types";

export const useCreatePolybaseUserMutation = () => {
  const router = useRouter();
  const setToken = useSetToken();

  const mutation = useMutation({
    mutationFn: (data: CreatePolybaseUserDto) => apiCreatePolybaseUser(data),
    onSuccess: () => {
      queryClient.refetchQueries(POLYBASE_USER_QUERY);
    },
    onError: (err: AxiosError) => {
      if (err.response?.status === HttpStatusCode.Unauthorized) {
        router.replace(Paths.CONNECT_WALLET);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setToken(null);
      }
    },
  });

  return mutation;
};
