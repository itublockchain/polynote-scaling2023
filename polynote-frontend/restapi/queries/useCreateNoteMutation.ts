import { queryClient } from "pages/_app";
import { useMutation, useQuery } from "react-query";
import { apiCreateNote, NOTES_QUERY } from "restapi";
import { CreateNoteDto } from "restapi/types";

export const useCreateNoteMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const mutation = useMutation({
    mutationFn: (data: CreateNoteDto) => apiCreateNote(data),
    onSuccess: () => {
      queryClient.refetchQueries(NOTES_QUERY);

      onSuccess?.();
    },
  });

  return mutation;
};
