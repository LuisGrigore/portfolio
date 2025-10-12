import { Sun, Moon } from "lucide-react";
import { useThemeToggle } from "./UseThemeToggle";

export const ThemeToggle = () => {
  const [isDarkMode, toggleTheme] = useThemeToggle();

  return (
    <button onClick={toggleTheme} className="rounded-full transition-colors duration-300 focus:outline-hidden">
      {!isDarkMode ? (
        <Sun className="h-6 w-6 text-yellow-300 " />
      ) : (
        <Moon className="h-6 w-6 text-blue-900 " />
      )}
    </button>
  );
};
