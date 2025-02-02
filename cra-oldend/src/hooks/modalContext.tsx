import {
    useState,
    useContext,
    createContext,
    useCallback,
    useMemo,
  } from "react";
  import { Course } from "../types/TypeCourse";
  import { EMPTYCOURSE } from "../commons/mock/MockUser";
  
  type Store = {
    isOpen: Course;
    setModalOpen: (course: Course) => void;
  };
  
  export const ModalContext = createContext<Store | undefined>(undefined);
  ModalContext.displayName = "ModalContext";
  
  export function ModalProvider({
    children,
  }: {
    readonly children: React.ReactNode;
  }) {
    const [isOpen, setIsOpen] = useState<Course>(EMPTYCOURSE);
  
    const setModalOpen = useCallback((course: Course) => {
      setIsOpen(course);
    }, []);
  
    const store: Store = useMemo(
      () => ({
        isOpen,
        setModalOpen,
      }),
      [isOpen, setModalOpen]
    );
  
    return (
      <ModalContext.Provider value={store}>{children}</ModalContext.Provider>
    );
  }
  
  export const useModal = () => useContext(ModalContext)!;
