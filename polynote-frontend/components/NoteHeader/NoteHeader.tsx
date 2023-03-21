import { ShareModal } from "components";
import { useModal } from "hooks/useModal";
import { useMemo } from "react";
import { BsChevronLeft, BsChevronRight, BsTrash } from "react-icons/bs";
import { useNotes, useSetSelectedNote } from "recoil/notes/NotesStoreHooks";
import { Note } from "recoil/notes/types";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { useDeleteNoteMutation } from "restapi/queries/useDeleteNoteMutation";
import { Button, Spinner, Typography } from "ui";

type Props = { selectedNote: Note; updating: boolean };

export const NoteHeader = ({ selectedNote, updating }: Props) => {
  const theme = useTheme();
  const notes = useNotes();
  const setSelectedNote = useSetSelectedNote();
  const shareModal = useModal();

  const currentIndex = useMemo(() => {
    let index = -1;
    for (let i = 0; i < notes.length; i++) {
      if (selectedNote.id === notes[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }, [notes, selectedNote]);

  const increaseIndex = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < notes.length) {
      setSelectedNote(notes[nextIndex]);
    } else {
      setSelectedNote(notes[0]);
    }
  };

  const decreaseIndex = () => {
    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setSelectedNote(notes[prevIndex]);
    } else {
      setSelectedNote(notes[notes.length - 1]);
    }
  };

  const deleteNoteMutation = useDeleteNoteMutation();

  return (
    <>
      {shareModal.isOpen && (
        <ShareModal modalController={shareModal} selectedNote={selectedNote} />
      )}
      <div className="h-[58px] flex justify-between items-center pl-[64px] pr-[12px] lg:px-[24px]">
        <div className="flex space-x-1">
          <Button
            onClick={decreaseIndex}
            className="h-8 w-8"
            color={theme === "dark" ? "primary" : "secondary"}
          >
            <BsChevronLeft />
          </Button>
          <Button
            onClick={increaseIndex}
            className="h-8 w-8"
            color={theme === "dark" ? "primary" : "secondary"}
          >
            <BsChevronRight />
          </Button>
        </div>
        <div className="flex items-center space-x-[8px]">
          {updating ? (
            <Spinner />
          ) : (
            <Typography
              variant="caption"
              weight="semibold"
              className="text-PURPLE hidden md:flex"
            >
              last updated at{" "}
              {new Date(selectedNote.updated * 1000).toLocaleString()}
            </Typography>
          )}

          <Button
            onClick={shareModal.open}
            className="h-8 px-[24px]"
            color={theme === "dark" ? "primary" : "secondary"}
          >
            Share
          </Button>

          <Button
            loading={deleteNoteMutation.isLoading}
            onClick={() => deleteNoteMutation.mutate(selectedNote.id)}
            leftIcon={<BsTrash />}
            className="h-8 px-[14px]"
            color={"danger"}
          />
        </div>
      </div>
    </>
  );
};
