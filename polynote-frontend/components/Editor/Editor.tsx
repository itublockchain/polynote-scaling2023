import {
  EditorContent,
  Editor as EditorProp,
  BubbleMenu,
  FloatingMenu,
} from "@tiptap/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Note } from "recoil/notes/types";
import { clsnm } from "utils/clsnm";

type Props = {
  editor: EditorProp;
  selectedNoteCopy: Note;
  setSelectedNoteCopy: Dispatch<SetStateAction<Note>>;
  isUpdating: boolean;
  setLastFocused: Dispatch<SetStateAction<"title" | "note">>;
  lastFocused: "title" | "note";
};

export const Editor = ({
  selectedNoteCopy,
  setSelectedNoteCopy,
  editor,
  isUpdating,
  lastFocused,
  setLastFocused,
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
      if (lastFocused === "note") {
        editor.commands.focus();
      }
    } else {
      editor.setEditable(false);
    }
  }, [isUpdating, editor, lastFocused]);

  return (
    <>
      {editor && (
        <BubbleMenu
          className={clsnm(
            "bubble-menu bg-DARK_PURPLE",
            isUpdating && "updating"
          )}
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <div className="flex space-x-1">
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
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
            >
              Code
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
            >
              Blockquote
            </button>
          </div>
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          className={clsnm(
            "floating-menu bg-DARK_PURPLE",
            isUpdating && "updating"
          )}
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <div className="flex flex-col">
            <div className="flex border-b-1 p-1">
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
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
                className={
                  editor.isActive("heading", { level: 4 }) ? "is-active" : ""
                }
              >
                H4
              </button>
            </div>
            <div className="flex p-1">
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
              <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                Line
              </button>
            </div>
          </div>
        </FloatingMenu>
      )}

      <EditorContent
        onFocus={() => {
          setLastFocused("note");
        }}
        id="ContentWrapper"
        className="text-black dark:text-white w-full h-full"
        editor={editor}
      />
    </>
  );
};
