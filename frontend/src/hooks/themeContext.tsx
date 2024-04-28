import {
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";

export type Theme = "light" | "dark";

type Store = {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<Store | undefined>(undefined);
ThemeContext.displayName = "ThemeContext";

export function ThemeProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [currentTheme, setTheme] = useState<Theme>("light");

  const setCurrentTheme = useCallback((theme: Theme) => {
    localStorage.setItem("theme", theme);
    if (theme === 'light') {
        document.body.style.backgroundColor = "#FFFFFF";
        document.body.style.color = "#000000"
    } else if (theme === 'dark') {
        document.body.style.backgroundColor = "#242424";
        document.body.style.color = "#EEEEEE"
    }
    setTheme(theme);
  }, []);

  const store: Store = useMemo(
    () => ({
      currentTheme,
      setCurrentTheme,
    }),
    [currentTheme, setCurrentTheme]
  );

  return (
    <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext)!;
