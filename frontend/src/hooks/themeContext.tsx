import {
  useState,
  useContext,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { getThemeColor } from "../commons/utilities/themeSchemas";

export type Theme = "light" | "dark" | "pink";

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
    document.body.style.backgroundColor = getThemeColor(theme, 'backgroundColor');
    document.body.style.color = getThemeColor(theme, 'color');
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
