import { AxiosError, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import {
  useNotes,
  useSetNotes,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiDeleteNote } from "restapi";

export const useDeleteNoteMutation = () => {
  const setSelectedNote = useSetSelectedNote();
  const setNotes = useSetNotes();
  const notes = useNotes();
  const router = useRouter();
  const setToken = useSetToken();

  const mutation = useMutation({
    mutationFn: (id: string) => apiDeleteNote(id),
    onSuccess: (_, id) => {
      const newNotes = notes.filter((item) => item.id !== id);
      setNotes(newNotes);
      if (newNotes.length > 0) {
        setSelectedNote(newNotes[newNotes.length - 1]);
      } else {
        setSelectedNote(null);
      }
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
