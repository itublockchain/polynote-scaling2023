import { atom } from "recoil";
import { Note } from "recoil/notes/types";

export const NotesAtom = atom<Note[]>({
  default: [],
  key: "Notes.Atom",
});

export const SelectedNoteAtom = atom<Note | null>({
  default: null,
  key: "Note.Atom",
});
