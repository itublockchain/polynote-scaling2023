import { useMutation } from "react-query";
import { Note } from "recoil/notes/types";
import { UpdateNoteDto } from "restapi/types";
import { apiUpdateNote } from "restapi";
import { AxiosResponse } from "axios";
import {
  useNotes,
  useSetNotes,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";

export const useUpdateNoteMutation = (
  selectedNote: Note,
  setUpdating: (to: boolean) => void
) => {
  const setNotes = useSetNotes();
  const notes = useNotes();
  const setSelectedNote = useSetSelectedNote();

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
  });

  return mutation;
};
