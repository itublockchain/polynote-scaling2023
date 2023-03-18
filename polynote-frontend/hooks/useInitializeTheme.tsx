import { useEffect } from "react";
import { useSetTheme, useTheme } from "recoil/theme/ThemeStore";

const identifier = "PolynoteTheme";

export const useInitializeTheme = () => {
  const setTheme = useSetTheme();
  const theme = useTheme();

  useEffect(() => {
    const existingTheme = localStorage.getItem(identifier);

    if (existingTheme == null) {
      localStorage.setItem(identifier, "light");
    } else {
      if (existingTheme === "dark") {
        setTheme("dark");
      } else if (existingTheme === "light") {
        setTheme("light");
      }
    }
  }, [setTheme]);

  useEffect(() => {
    if (theme == null) {
      return;
    }

    const htmlElement = document.documentElement;

    htmlElement.classList.add(theme);
  }, [theme]);
};
