import { useCallback } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import { ThemeAtom } from "recoil/theme/ThemeStore";
import { ThemeOption } from "recoil/theme/types";

export const useTheme = (): ThemeOption => {
  return useRecoilValue(ThemeAtom);
};

export const useSetTheme = (): SetterOrUpdater<ThemeOption> => {
  return useSetRecoilState(ThemeAtom);
};

export const useToggleTheme = () => {
  const theme = useTheme();
  const setTheme = useSetTheme();

  return useCallback(() => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [theme, setTheme]);
};
