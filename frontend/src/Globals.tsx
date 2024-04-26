import { ModalProvider } from "./hooks/modalContext";
import { ThemeProvider } from "./hooks/themeContext";

function Globals({ children }: { readonly children: React.ReactNode }) {
  return (
    <ModalProvider>
      <ThemeProvider>
        <div>{children}</div>
      </ThemeProvider>
    </ModalProvider>
  );
}

export default Globals;
