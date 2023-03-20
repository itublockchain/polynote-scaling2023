import EmojiPicker from "@emoji-mart/react";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor } from "components/Editor/Editor";
import { useDebounce } from "hooks/useDebounce";
import { useDropdown } from "hooks/useDropdown";
import { useCallback, useEffect, useRef, useState } from "react";
import { Note } from "recoil/notes/types";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { useUpdateNoteMutation } from "restapi/queries/useUpdateNoteMutation";
import data from "@emoji-mart/data";

type Props = {
  selectedNote: Note;
  setUpdating: (to: boolean) => void;
};

export const NoteEditor = ({ selectedNote, setUpdating }: Props) => {
  const [selectedNoteCopy, setSelectedNoteCopy] = useState<Note>(selectedNote);
  const updateNoteMutation = useUpdateNoteMutation(selectedNote, setUpdating);
  const theme = useTheme();
  const readyRef = useRef(false);

  useEffect(() => {
    setSelectedNoteCopy(selectedNote);
  }, [selectedNote]);

  const modifyTitle = useCallback(
    (title: string) => {
      setSelectedNoteCopy({ ...selectedNoteCopy, title });
    },
    [setSelectedNoteCopy, selectedNoteCopy]
  );

  const modifyEmoji = useCallback(
    (emoji: string) => {
      setSelectedNoteCopy({ ...selectedNoteCopy, emoji });
    },
    [setSelectedNoteCopy, selectedNoteCopy]
  );

  const debouncedNoteContent = useDebounce<string>(
    selectedNoteCopy.content,
    2000
  );
  const debouncedNoteTitle = useDebounce<string>(selectedNoteCopy.title, 2000);
  const debouncedNoteEmoji = useDebounce<string>(selectedNoteCopy.emoji, 2000);

  useEffect(() => {
    if (!readyRef.current) {
      return;
    }

    updateNoteMutation.mutate({
      content: debouncedNoteContent,
      title: debouncedNoteTitle,
      emoji: debouncedNoteEmoji,
    });

    // eslint-disable-next-line
  }, [debouncedNoteContent, debouncedNoteTitle, debouncedNoteEmoji]);

  useEffect(() => {
    readyRef.current = false;
    const timeout = setTimeout(() => {
      readyRef.current = true;
    }, 2050);
    return () => {
      clearTimeout(timeout);
    };
  }, [selectedNote.id]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Enter your note here...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: selectedNoteCopy.content,
  });

  const { floating, reference, popperStyles, isOpen, toggle, closeRef, close } =
    useDropdown();

  useEffect(() => {
    if (editor == null) return;
    editor.commands.setContent(selectedNote.content);
  }, [selectedNote, editor]);

  return (
    <div className="flex flex-col mt-[48px] w-full items-start justify-start pl-[20%] pr-[20%] overflow-auto">
      <div ref={closeRef}>
        <div
          onClick={toggle}
          ref={reference}
          className="text-4xl cursor-pointer"
        >
          {selectedNoteCopy.emoji}
        </div>
        {isOpen && (
          <div ref={floating} style={popperStyles}>
            <EmojiPicker
              theme={theme}
              data={data}
              onEmojiSelect={(res: any) => {
                modifyEmoji(res.native);
                close();
              }}
            />
          </div>
        )}
      </div>

      <input
        style={{ fontSize: "48px", fontWeight: "700", marginBottom: "24px" }}
        className="bg-transparent mt-2 text-black dark:text-white outline-none caret-MAIN_DARK dark:caret-PINK"
        value={selectedNoteCopy.title}
        onChange={(e) => modifyTitle(e.target.value)}
      />
      {editor != null && (
        <Editor
          editor={editor}
          selectedNoteCopy={selectedNoteCopy}
          setSelectedNoteCopy={setSelectedNoteCopy}
        />
      )}
    </div>
  );
};
