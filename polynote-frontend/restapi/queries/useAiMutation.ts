import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiAI } from "restapi";
import { AiTextDto } from "restapi/types";
import { useAiModalContext } from "utils/AiModalContext";

export const useAiMutation = () => {
  const router = useRouter();
  const setToken = useSetToken();
  const aiModalContext = useAiModalContext();

  const mutation = useMutation({
    mutationFn: (data: AiTextDto) => apiAI(data),
    onSuccess: (res: AxiosResponse<{ text: string }>) => {
      const suggestion = res.data.text;
      let split = suggestion.split("\n");
      split = split.filter((item) => item.trim() != "");
      aiModalContext.setSuggestion(split.join(" "));
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
