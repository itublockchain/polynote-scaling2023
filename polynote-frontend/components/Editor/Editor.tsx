import {
  EditorContent,
  Editor as EditorProp,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Note } from "recoil/notes/types";

type Props = {
  editor: EditorProp;
  selectedNoteCopy: Note;
  setSelectedNoteCopy: Dispatch<SetStateAction<Note>>;
  isUpdating: boolean;
};

export const Editor = ({
  selectedNoteCopy,
  setSelectedNoteCopy,
  editor,
  isUpdating,
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

  useEffect(() => {
    if (!isUpdating) {
      editor.setEditable(true);
      editor.commands.focus();
    } else {
      editor.setEditable(false);
    }
  }, [isUpdating, editor]);

  return (
    <>
      {editor && (
        <BubbleMenu
          className="bubble-menu bg-DARK_PURPLE"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className="floating-menu bg-DARK_PURPLE"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            H3
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            Ordered List
          </button>
        </FloatingMenu>
      )}

      <EditorContent
        id="ContentWrapper"
        className="text-black dark:text-white w-full h-full"
        editor={editor}
      />
    </>
  );
};
