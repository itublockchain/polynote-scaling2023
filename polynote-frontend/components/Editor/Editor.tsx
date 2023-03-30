import { EditorContent, Editor as EditorProp } from "@tiptap/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Note } from "recoil/notes/types";

import { FloatingMenuEditor } from "./FloatingMenuEditor";
import { BubbleMenuEditor } from "components/Editor/BubbleMenuEditor";
import { ModalController } from "hooks/useModal";
import { EditorSelectionRange } from "types";

type Props = {
  editor: EditorProp;
  selectedNoteCopy: Note;
  setSelectedNoteCopy: Dispatch<SetStateAction<Note>>;
  modalController: ModalController;
};

export const Editor = ({
  selectedNoteCopy,
  setSelectedNoteCopy,
  editor,
  modalController,
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
      {editor && <BubbleMenuEditor aiModal={modalController} editor={editor} />}

      {editor && <FloatingMenuEditor editor={editor} />}

      <EditorContent
        id="ContentWrapper"
        className="text-black dark:text-white w-full h-full"
        editor={editor}
      />
    </>
  );
};
