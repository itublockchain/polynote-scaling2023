import Placeholder from "@tiptap/extension-placeholder";
import { useEditor, EditorContent, Editor as EditorProp } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Note } from "recoil/notes/types";

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
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        bold
      </button>
      <EditorContent
        className="text-black dark:text-white w-full h-full"
        editor={editor}
      />
    </>
  );
};
