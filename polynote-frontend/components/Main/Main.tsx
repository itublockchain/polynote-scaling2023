import { Sidebar } from "components/Sidebar/Sidebar";
import {
  useNotes,
  useSelectedNote,
  useSetSelectedNote,
} from "recoil/notes/NotesStoreHooks";
import { useNotesQuery } from "restapi/queries";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import LogoLarge from "assets/logo/logo-large.png";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import Image from "next/image";
import { Button, Typography } from "ui";
import { BsPlus } from "react-icons/bs";
import { CreateNoteModal } from "components/CreateNoteModal/CreateNoteModal";
import { ModalController, useModal } from "hooks/useModal";
import { NoteEditor } from "components/NoteEditor/NoteEditor";
import { NoteHeader } from "components/NoteHeader/NoteHeader";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Paths } from "consts/paths";

export const Main = () => {
  useNotesQuery();
  const selectedNote = useSelectedNote();
  const setSelectedNote = useSetSelectedNote();
  const createNoteModal = useModal();
  const [updating, setUpdating] = useState(false);
  const router = useRouter();
  const notes = useNotes();
  const openedRef = useRef(false);

  useEffect(() => {
    if (selectedNote?.id != null) {
      window.location.hash = `#id=${selectedNote.id}`;
    }
  }, [selectedNote?.id, router]);

  useEffect(() => {
    if (openedRef.current === true) {
      return;
    }

    const hash = window.location.hash;

    if (hash != null) {
      const split = hash.split("id=");
      const id = split[1];
      const find = notes.find((note) => note.id === id);
      if (find != null) {
        setSelectedNote(find);
      }
    }
  }, [notes, setSelectedNote]);

  return (
    <>
      <CreateNoteModal modalController={createNoteModal} />
      <div className="flex">
        <Sidebar createNoteModal={createNoteModal} />
        <div className="flex flex-col w-full items-center overflow-auto min-h-screen max-h-screen pb-[32px]">
          {selectedNote != null && (
            <div className="flex-col w-full">
              <NoteHeader updating={updating} selectedNote={selectedNote} />
              <NoteEditor
                setUpdating={setUpdating}
                selectedNote={selectedNote}
              />
            </div>
          )}

          {notes.length === 0 && (
            <EmptyState select={false} createNoteModal={createNoteModal} />
          )}
          {notes.length > 0 && selectedNote == null && (
            <EmptyState select={true} createNoteModal={createNoteModal} />
          )}
        </div>
      </div>
    </>
  );
};

const EmptyState = ({
  createNoteModal,
  select,
}: {
  createNoteModal: ModalController;
  select: boolean;
}) => {
  const theme = useTheme();

  return (
    <div className="flex flex-col justify-center items-center mt-auto mb-auto">
      <Image
        width={200}
        alt="Logo"
        src={theme === "dark" ? LogoLargeWhite : LogoLarge}
      />
      {select ? (
        <Typography
          variant="body1"
          weight="regular"
          className="text-center text-MAIN_DARK dark:text-PINK mt-4"
        >
          You can select note from sidebar to start editing
        </Typography>
      ) : (
        <Button
          onClick={createNoteModal.open}
          leftIcon={<BsPlus />}
          color={theme === "dark" ? "primary" : "secondary"}
          className="h-10 w-full mt-4"
        >
          Create note
        </Button>
      )}
    </div>
  );
};
