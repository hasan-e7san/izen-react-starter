import { createContext, useContext, useState, ReactNode } from "react";

export interface ModalContextType {
  isOpen: string;
  setIsOpen: (open: string) => void;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: "",
  setIsOpen: () => { }
})

export interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<string>("");

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  )
};

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
