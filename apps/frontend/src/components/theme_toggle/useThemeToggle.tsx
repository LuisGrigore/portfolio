import { useState, useEffect } from "react";

export const useThemeToggle = (): readonly [boolean, () => void] => {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    const theme = localStorage.getItem("theme");
    return theme === null ? true : theme === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = (): void => setDarkMode((prev) => !prev);

  return [isDarkMode, toggleTheme] as const;
};
