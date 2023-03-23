import { AxiosError } from "axios";
import { useNotify } from "hooks/useNotify";
import { useMutation } from "react-query";
import { apiOptOutNotificationsO } from "restapi";
import { PushNotificationDto } from "restapi/types";

export const useOptOutMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const notify = useNotify();

  const mutation = useMutation({
    mutationFn: (data: PushNotificationDto) => apiOptOutNotificationsO(data),
    onSuccess: () => {
      onSuccess?.();
      notify.success("Successfully opted out");
    },
    onError: (err: AxiosError) => {
      notify.error("Failed to opt out");
    },
  });

  return mutation;
};
