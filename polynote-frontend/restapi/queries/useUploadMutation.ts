import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { apiUploadFile } from "restapi";

export const useUploadMutation = (
  {
    onSuccess,
    onError,
  }: {
    onSuccess?: (res: AxiosResponse<any>) => void;
    onError?: (err: AxiosError) => void;
  } = { onSuccess: () => undefined, onError: () => undefined }
) => {
  const mutation = useMutation({
    mutationFn: (data: FormData) => apiUploadFile(data),
    onSuccess: (res) => {
      onSuccess?.(res);
    },
    onError: (err: AxiosError) => {
      onError?.(err);
    },
  });

  return mutation;
};
