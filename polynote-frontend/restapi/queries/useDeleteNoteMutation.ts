import { useMutation } from "react-query";
import {
  useNotes,
  useSetNotes,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";
import { apiDeleteNote } from "restapi";

export const useDeleteNoteMutation = () => {
  const setSelectedNote = useSetSelectedNote();
  const setNotes = useSetNotes();
  const notes = useNotes();

  const mutation = useMutation({
    mutationFn: (id: string) => apiDeleteNote(id),
    onSuccess: (_, id) => {
      const newNotes = notes.filter((item) => item.id !== id);
      setNotes(newNotes);
      if (newNotes.length > 0) {
        setSelectedNote(newNotes[newNotes.length - 1]);
      }
    },
  });

  return mutation;
};
