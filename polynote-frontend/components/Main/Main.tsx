import { Sidebar } from "components/Sidebar/Sidebar";
import { useNotes } from "recoil/notes/NotesStoreHooks";
import { useNotesQuery } from "restapi/queries/useNotesQuery";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import LogoLarge from "assets/logo/logo-large.png";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import Image from "next/image";
import { Button } from "ui";
import { BsPlus } from "react-icons/bs";
import { CreateNoteModal } from "components/CreateNoteModal/CreateNoteModal";
import { useModal } from "hooks/useModal";

export const Main = () => {
  useNotesQuery();

  const theme = useTheme();
  const notes = useNotes();

  const createNoteModal = useModal();

  return (
    <>
      <CreateNoteModal modalController={createNoteModal} />
      <div className="flex">
        <Sidebar createNoteModal={createNoteModal} />
        <div className="flex flex-col w-full justify-center items-center min-h-screen">
          {notes.length === 0 && (
            <div className="flex flex-col">
              <Image
                width={200}
                alt="Logo"
                src={theme === "dark" ? LogoLargeWhite : LogoLarge}
              />
              <Button
                onClick={createNoteModal.open}
                leftIcon={<BsPlus />}
                color={theme === "dark" ? "primary" : "secondary"}
                className="h-10 mt-4"
              >
                Create note
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
