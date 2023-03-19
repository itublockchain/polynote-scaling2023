import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useMutation } from "react-query";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiAuthUser } from "restapi";
import { AuthUserDto } from "restapi/types";

export const useAuthUserMutation = () => {
  const setToken = useSetToken();

  const mutation = useMutation({
    mutationFn: (data: AuthUserDto) => apiAuthUser(data),
    onSuccess: (res) => {
      setToken(res.data.token);
      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token);
    },
  });

  return mutation;
};
