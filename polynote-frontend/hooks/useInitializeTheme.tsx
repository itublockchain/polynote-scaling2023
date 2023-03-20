import { useEffect } from "react";
import { useSetTheme, useTheme } from "recoil/theme/ThemeStoreHooks";

const identifier = "PolynoteTheme";
const initialTheme = "dark";

export const useInitializeTheme = () => {
  const setTheme = useSetTheme();
  const theme = useTheme();

  useEffect(() => {
    const existingTheme = localStorage.getItem(identifier);

    if (existingTheme == null) {
      localStorage.setItem(identifier, initialTheme);
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
    const bodyElement = document.body;

    htmlElement.classList.add(theme);
    htmlElement.classList.remove(theme === "dark" ? "light" : "dark");

    bodyElement.classList.add(theme);
    bodyElement.classList.remove(theme === "dark" ? "light" : "dark");

    localStorage.setItem(identifier, theme);
  }, [theme]);
};
