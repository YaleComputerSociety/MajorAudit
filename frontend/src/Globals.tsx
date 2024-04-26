import { ModalProvider } from "./hooks/modalContext";

function Globals({ children }: { readonly children: React.ReactNode }) {
  return (
    <ModalProvider>
      <div>{children}</div>
    </ModalProvider>
  );
}

export default Globals;