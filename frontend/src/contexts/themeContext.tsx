import {
  useContext,
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";

export type Theme = "light" | "dark";

type Store = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<Store | undefined>(undefined);
ThemeContext.displayName = "ThemeContext";

export function ThemeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    const localThemeString = localStorage.getItem("theme");
    const localTheme = localThemeString === "light" ? "light" : "dark";
    if (localTheme) setTheme(localTheme);
  }, []);

  const store: Store = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext)!;
