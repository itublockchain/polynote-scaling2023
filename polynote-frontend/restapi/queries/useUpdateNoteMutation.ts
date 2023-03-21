import { useMutation } from "react-query";
import { Note } from "recoil/notes/types";
import { UpdateNoteDto } from "restapi/types";
import { apiUpdateNote } from "restapi";
import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import {
  useNotes,
  useSetNotes,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { Paths } from "consts/paths";
import { useRouter } from "next/router";
import { useSetToken } from "recoil/user/UserStoreHooks";

export const useUpdateNoteMutation = (
  selectedNote: Note,
  setUpdating: (to: boolean) => void
) => {
  const setNotes = useSetNotes();
  const notes = useNotes();
  const setSelectedNote = useSetSelectedNote();
  const router = useRouter();
  const setToken = useSetToken();

  const mutation = useMutation({
    mutationFn: (data: UpdateNoteDto) => apiUpdateNote(selectedNote.id, data),
    onSuccess: (res: AxiosResponse<Note>) => {
      const newNote = res.data;

      setSelectedNote(newNote);

      const newNotes = notes.map((item) => {
        if (item.id === newNote.id) {
          return newNote;
        } else {
          return item;
        }
      });

      setNotes(newNotes);
    },
    onSettled: () => {
      setUpdating(false);
    },
    onMutate: () => {
      setUpdating(true);
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
