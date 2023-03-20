import { queryClient } from "pages/_app";
import { useMutation, useQuery } from "react-query";
import { useSetSelectedNote } from "recoil/notes/NotesStoreHooks";
import { apiCreateNote, NOTES_QUERY } from "restapi";
import { CreateNoteDto } from "restapi/types";

export const useCreateNoteMutation = (
  {
    onSuccess,
  }: {
    onSuccess?: () => void;
  } = { onSuccess: () => undefined }
) => {
  const setSelectedNote = useSetSelectedNote();

  const mutation = useMutation({
    mutationFn: (data: CreateNoteDto) => apiCreateNote(data),
    onSuccess: (res) => {
      queryClient.refetchQueries(NOTES_QUERY);

      setSelectedNote(res.data);

      onSuccess?.();
    },
  });

  return mutation;
};
