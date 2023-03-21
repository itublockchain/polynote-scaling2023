import { AxiosError, AxiosResponse, HttpStatusCode } from "axios";
import { Paths } from "consts/paths";
import { ACCESS_TOKEN_KEY } from "consts/storage";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useSetNotes } from "recoil/notes/NotesStoreHooks";
import { Note } from "recoil/notes/types";
import { useSetToken } from "recoil/user/UserStoreHooks";
import { apiGetNotes, NOTES_QUERY } from "restapi";
import { useAccount } from "wagmi";

export const useNotesQuery = () => {
  const { address } = useAccount();
  const setNotes = useSetNotes();
  const router = useRouter();
  const setToken = useSetToken();

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
            note.content != null &&
            note.created != null &&
            note.updated != null
          ) {
            _notes.push({
              id: note.id,
              address: note.address,
              content: note.content,
              emoji: note.emoji,
              title: note.title,
              created: note.created,
              updated: note.updated,
            });
          }
        }

        const sortedNotes = _notes.sort((a, b) => {
          return a.created - b.created;
        });

        setNotes(sortedNotes);
        return sortedNotes;
      }),
    cacheTime: 0,
    refetchOnWindowFocus: false,
    onError: (err: AxiosError) => {
      if (err.response?.status === HttpStatusCode.Unauthorized) {
        router.replace(Paths.CONNECT_WALLET);
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setToken(null);
      }
    },
  });

  return { notes: data, ...rest };
};
