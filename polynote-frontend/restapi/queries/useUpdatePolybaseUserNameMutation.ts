import { queryClient } from "pages/_app";
import { useMutation } from "react-query";
import { apiUpdatePolybaseUserName, POLYBASE_USER_QUERY } from "restapi";
import { UpdatePolybaseUserNameDto } from "restapi/types";
import { useAccount } from "wagmi";

export const useUpdatePolybaseUserNameMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const { address } = useAccount();

  const mutation = useMutation({
    mutationFn: (data: UpdatePolybaseUserNameDto) =>
      apiUpdatePolybaseUserName(address as string, data),
    onSuccess: () => {
      queryClient.refetchQueries(POLYBASE_USER_QUERY);
      onSuccess?.();
    },
  });

  return mutation;
};
