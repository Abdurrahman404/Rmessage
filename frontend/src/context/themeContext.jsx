import { useEffect, useLayoutEffect, useState } from "react";
import { DEFAULT_THEME_PRESET_ID } from "../data/herouiThemePresets";
import { applyThemePresetToDocument, isValidThemePreset, ThemeContext } from "./theme";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme() {
  const theme = localStorage.getItem("theme");
  return theme === "light" || theme === "dark" ? theme : null;
}

function applyDomTheme(theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
}

function readStoredThemePreset() {
  const themePreset = localStorage.getItem("theme-preset");
  return themePreset && isValidThemePreset(themePreset) ? themePreset : DEFAULT_THEME_PRESET_ID;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => readStoredTheme() ?? getSystemTheme());
  const [themePreset, setThemePresetState] = useState(readStoredThemePreset);

  useLayoutEffect(() => {
    applyDomTheme(theme);
  }, [theme]);

  useLayoutEffect(() => {
    applyThemePresetToDocument(themePreset);
  }, [themePreset]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("theme-preset", themePreset);
  }, [theme, themePreset]);

  const setTheme = (next) => setThemeState(next);
  const toggleTheme = () => setThemeState((current) => (current === "dark" ? "light" : "dark"));
  const setThemePreset = (next) => {
    setThemePresetState((previous) => {
      const resolved = typeof next === "function" ? next(previous) : next;
      return isValidThemePreset(resolved) ? resolved : DEFAULT_THEME_PRESET_ID;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themePreset, setThemePreset }}>
      {children}
    </ThemeContext.Provider>
  );
}
