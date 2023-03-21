import { AxiosError, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiAuthUser } from "restapi";
import { AuthUserDto } from "restapi/types";

export const useAuthUserMutation = () => {
  const setToken = useSetToken();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (data: AuthUserDto) => apiAuthUser(data),
    onSuccess: (res) => {
      setToken(res.data.token);
      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token);
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
