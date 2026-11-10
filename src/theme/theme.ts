export type Theme = "light" | "dark";

const KEY = "theme";

export const getTheme = (): Theme => {
  try {
    return localStorage.getItem(KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
};

export const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

export const saveTheme = (theme: Theme) => {
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    // preference just won't persist
  }
};
