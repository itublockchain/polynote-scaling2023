import { AxiosError, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { queryClient } from "pages/_app";
import { useMutation, useQuery } from "react-query";
import { useSetSelectedNote } from "recoil/notes/NotesStoreHooks";
import { useSetToken } from "recoil/user/UserStoreHooks";
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
  const router = useRouter();
  const setToken = useSetToken();

  const mutation = useMutation({
    mutationFn: (data: CreateNoteDto) => apiCreateNote(data),
    onSuccess: (res) => {
      queryClient.refetchQueries(NOTES_QUERY);

      setSelectedNote(res.data);

      onSuccess?.();
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
