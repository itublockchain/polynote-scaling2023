import { Editor } from "components/Editor/Editor";
import { useCallback } from "react";
import {
  useSelectedNote,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";
import { Note } from "recoil/notes/types";
import { Typography } from "ui";

type Props = { selectedNote: Note };

export const NoteEditor = ({ selectedNote }: Props) => {
  const setSelectedNote = useSetSelectedNote();

  const modifyTitle = useCallback(
    (title: string) => {
      setSelectedNote({ ...selectedNote, title });
    },
    [setSelectedNote, selectedNote]
  );

  return (
    <div className="flex flex-col mt-[48px] w-full items-start justify-start pl-[20%] pr-[20%] overflow-auto">
      <div className="text-4xl">{selectedNote.emoji}</div>
      <input
        style={{ fontSize: "48px" }}
        className="bg-transparent mt-2 text-black dark:text-white outline-none caret-MAIN_DARK dark:caret-PINK"
        value={selectedNote.title}
        onChange={(e) => modifyTitle(e.target.value)}
      />

      <Editor />
    </div>
  );
};
