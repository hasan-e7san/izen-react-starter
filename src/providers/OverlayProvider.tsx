import { createContext, useContext, useState, ReactNode } from 'react';

export interface OverlayContextProps {
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
}

const OverlayContext = createContext<OverlayContextProps | undefined>(undefined);

export const useOverlay = (): OverlayContextProps => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};

export interface OverlayProviderProps {
  children: ReactNode;
}

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <OverlayContext.Provider value={{ showOverlay, setShowOverlay }}>
      {children}
    </OverlayContext.Provider>
  );
};
