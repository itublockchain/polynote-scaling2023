import { queryClient } from "pages/_app";
import { useMutation, useQuery } from "react-query";
import { apiCreatePolybaseUser, POLYBASE_USER_QUERY } from "restapi";
import { CreatePolybaseUserDto } from "restapi/types";

export const useCreatePolybaseUserMutation = () => {
  const mutation = useMutation({
    mutationFn: (data: CreatePolybaseUserDto) => apiCreatePolybaseUser(data),
    onSuccess: () => {
      queryClient.refetchQueries(POLYBASE_USER_QUERY);
    },
  });

  return mutation;
};
