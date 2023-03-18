import { atom } from "recoil";
import { ThemeOption } from "recoil/theme/types";

export const ThemeAtom = atom<ThemeOption>({
  default: "light",
  key: "Theme.Atom",
});
