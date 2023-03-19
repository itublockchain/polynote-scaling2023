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
            note.author != null &&
            note.content != null &&
            note.emoji != null &&
            note.headline != null
          ) {
            _notes.push({
              author: note.author,
              content: note.content,
              emoji: note.emoji,
              headline: note.headline,
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
