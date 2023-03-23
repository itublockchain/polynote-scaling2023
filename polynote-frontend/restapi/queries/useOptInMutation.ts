import { AxiosError } from "axios";
import { useNotify } from "hooks/useNotify";
import { useMutation } from "react-query";
import { apiOptInNotifications } from "restapi";
import { PushNotificationDto } from "restapi/types";

export const useOptInMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const notify = useNotify();

  const mutation = useMutation({
    mutationFn: (data: PushNotificationDto) => apiOptInNotifications(data),
    onSuccess: () => {
      onSuccess?.();
      notify.success("Successfully opted in");
    },
    onError: (err: AxiosError) => {
      notify.error("Failed to opt in");
    },
  });

  return mutation;
};
