import { Sidebar } from "components/Sidebar/Sidebar";
import { useNotes } from "recoil/notes/NotesStoreHooks";
import { useNotesQuery } from "restapi/queries/useNotesQuery";
import LogoLargeWhite from "assets/logo/logo-large-white.png";
import LogoLarge from "assets/logo/logo-large.png";
import { useTheme } from "recoil/theme/ThemeStoreHooks";
import Image from "next/image";

export const Main = () => {
  useNotesQuery();

  const theme = useTheme();
  const notes = useNotes();

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full justify-center items-center min-h-screen">
        {notes.length === 0 && (
          <div className="flex flex-col">
            <Image
              width={200}
              alt="Logo"
              src={theme === "dark" ? LogoLargeWhite : LogoLarge}
            />
          </div>
        )}
      </div>
    </div>
  );
};
