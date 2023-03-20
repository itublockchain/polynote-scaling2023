import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import { Button } from "ui";

export const NoteHeader = () => {
  const theme = useTheme();

  return (
    <div className="h-[58px] flex justify-between items-center px-[12px]">
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
    </div>
  );
};
