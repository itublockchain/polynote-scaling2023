import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { NotesAtom } from "recoil/notes/NotesStore";
import { Note } from "recoil/notes/types";

export const useNotes = (): Note[] => {
  return useRecoilValue(NotesAtom);
};

export const useSetNotes = (): SetterOrUpdater<Note[]> => {
  return useSetRecoilState(NotesAtom);
};
