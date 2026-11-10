import { useState } from "react";
import { applyTheme, getTheme, saveTheme, Theme } from "./theme";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(getTheme);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    saveTheme(next);
  };

  return { theme, toggleTheme };
};
