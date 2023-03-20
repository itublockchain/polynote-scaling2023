import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import { useSetNotes } from "recoil/notes/NotesStoreHooks";
import { Note } from "recoil/notes/types";
import { apiGetNotes, NOTES_QUERY } from "restapi";
import { useAccount } from "wagmi";

export const useNotesQuery = () => {
  const { address } = useAccount();
  const setNotes = useSetNotes();

  const { data, ...rest } = useQuery({
    queryKey: NOTES_QUERY,
    queryFn: () =>
      apiGetNotes(address as string).then((res: AxiosResponse<Note[]>) => {
        const notes = res.data;

        const _notes: Note[] = [];

        for (const note of notes) {
          if (
            note.id != null &&
            note.address != null &&
            note.title != null &&
            note.emoji != null &&
            note.content != null
          ) {
            _notes.push({
              id: note.id,
              address: note.address,
              content: note.content,
              emoji: note.emoji,
              title: note.title,
            });
          }
        }

        setNotes(_notes);
        return _notes;
      }),
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  return { notes: data, ...rest };
};
