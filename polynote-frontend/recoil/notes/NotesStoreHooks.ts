import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { NotesAtom, SelectedNoteAtom } from "recoil/notes/NotesStore";
import { Note } from "recoil/notes/types";

export const useNotes = (): Note[] => {
  return useRecoilValue(NotesAtom);
};

export const useSetNotes = (): SetterOrUpdater<Note[]> => {
  return useSetRecoilState(NotesAtom);
};

export const useSelectedNote = (): Note | null => {
  return useRecoilValue(SelectedNoteAtom);
};

export const useSetSelectedNote = (): SetterOrUpdater<Note | null> => {
  return useSetRecoilState(SelectedNoteAtom);
};
