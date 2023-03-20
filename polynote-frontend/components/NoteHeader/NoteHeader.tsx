import { BsChevronLeft, BsChevronRight, BsTrash } from "react-icons/bs";
import { Note } from "recoil/notes/types";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { Button, Spinner, Typography } from "ui";

type Props = { selectedNote: Note; updating: boolean };

export const NoteHeader = ({ selectedNote, updating }: Props) => {
  const theme = useTheme();

  return (
    <div className="h-[58px] flex justify-between items-center px-[24px]">
      <div className="flex space-x-1">
        <Button
          className="h-8 w-8"
          color={theme === "dark" ? "primary" : "secondary"}
        >
          <BsChevronLeft />
        </Button>
        <Button
          className="h-8 w-8"
          color={theme === "dark" ? "primary" : "secondary"}
        >
          <BsChevronRight />
        </Button>
      </div>
      <div className="flex items-center space-x-[12px]">
        {updating ? (
          <Spinner />
        ) : (
          <Typography
            variant="caption"
            weight="semibold"
            className="text-PURPLE"
          >
            last updated at{" "}
            {new Date(selectedNote.updated * 1000).toLocaleString()}
          </Typography>
        )}

        <Button
          className="h-10 px-[24px]"
          color={theme === "dark" ? "primary" : "secondary"}
        >
          Share
        </Button>

        <Button
          leftIcon={<BsTrash />}
          className="h-10 px-[14px]"
          color={"danger"}
        />
      </div>
    </div>
  );
};
