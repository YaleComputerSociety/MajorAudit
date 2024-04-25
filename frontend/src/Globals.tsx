import { ThemeProvider } from "./contexts/themeContext";

function Globals({ children }: { readonly children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div>{children}</div>
    </ThemeProvider>
  );
}

export default Globals;
