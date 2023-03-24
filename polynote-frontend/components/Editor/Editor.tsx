import {
  EditorContent,
  Editor as EditorProp,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { Note } from "recoil/notes/types";
import { clsnm } from "utils/clsnm";
import { Web3Storage } from "web3.storage";
import { FloatingMenuEditor } from "./FloatingMenuEditor";
import { BubbleMenuEditor } from "components/Editor/BubbleMenuEditor";

type Props = {
  editor: EditorProp;
  selectedNoteCopy: Note;
  setSelectedNoteCopy: Dispatch<SetStateAction<Note>>;
};

export const Editor = ({
  selectedNoteCopy,
  setSelectedNoteCopy,
  editor,
}: Props) => {
  useEffect(() => {
    if (editor == null) {
      return;
    }

    const changeFn = (e: any) => {
      setSelectedNoteCopy({ ...selectedNoteCopy, content: e.editor.getHTML() });
    };

    editor.on("update", changeFn);

    return () => {
      editor.off("update", changeFn);
    };
  }, [editor, selectedNoteCopy, setSelectedNoteCopy]);

  return (
    <>
      {editor && <BubbleMenuEditor editor={editor} />}

      {editor && <FloatingMenuEditor editor={editor} />}

      <EditorContent
        id="ContentWrapper"
        className="text-black dark:text-white w-full h-full"
        editor={editor}
      />
    </>
  );
};
