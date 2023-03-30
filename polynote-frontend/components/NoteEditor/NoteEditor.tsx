import EmojiPicker from "@emoji-mart/react";
import Placeholder from "@tiptap/extension-placeholder";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Editor, AiModal } from "components";
import Image from "@tiptap/extension-image";
import { useDebounce } from "hooks/useDebounce";
import { useDropdown } from "hooks/useDropdown";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Note } from "recoil/notes/types";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { useUpdateNoteMutation } from "restapi/queries/useUpdateNoteMutation";
import data from "@emoji-mart/data";
import { UpdateNoteDto } from "restapi/types";
import Link from "@tiptap/extension-link";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import Dropcursor from "@tiptap/extension-dropcursor";
import { useModal } from "hooks/useModal";
import { AiModalContextProvider } from "utils/AiModalContext";

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

  const memoizedNotePayload = useMemo((): UpdateNoteDto => {
    return {
      content: selectedNoteCopy.content,
      title: selectedNoteCopy.title,
      emoji: selectedNoteCopy.emoji,
    };
  }, [
    selectedNoteCopy.emoji,
    selectedNoteCopy.title,
    selectedNoteCopy.content,
  ]);

  const debouncedNotePayload = useDebounce<UpdateNoteDto>(
    memoizedNotePayload,
    2000
  );

  useEffect(() => {
    if (!readyRef.current) {
      return;
    }

    updateNoteMutation.mutate(debouncedNotePayload);

    // eslint-disable-next-line
  }, [debouncedNotePayload]);

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
      Link.configure({
        protocols: [],
      }),
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] } as any),
      Image,
      Dropcursor.configure({
        width: 2,
        class: "polynote-image",
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

  const aiModal = useModal();

  return (
    <AiModalContextProvider>
      <AiModal modalController={aiModal} />
      <div className="flex flex-col mt-[48px] w-full items-start justify-start pl-[24px] pr-[24px] lg:pl-[20%] lg:pr-[20%] overflow-y-auto">
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
          style={{ fontSize: "48px", fontWeight: "700", marginBottom: "12px" }}
          className="bg-transparent mt-2 text-black dark:text-white outline-none caret-MAIN_DARK dark:caret-PINK max-w-[90vw] max-h-max"
          value={selectedNoteCopy.title}
          onChange={(e) => modifyTitle(e.target.value)}
        />
        {editor != null && (
          <Editor
            editor={editor}
            selectedNoteCopy={selectedNoteCopy}
            setSelectedNoteCopy={setSelectedNoteCopy}
            modalController={aiModal}
          />
        )}
      </div>
    </AiModalContextProvider>
  );
};
