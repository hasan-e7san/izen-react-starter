import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LayoutContextType {
  /**
   * Whether the sidebar is open
   */
  sidebarOpen: boolean;
  /**
   * Toggle sidebar open/closed
   */
  toggleSidebar: () => void;
  /**
   * Current theme
   */
  theme: 'light' | 'dark';
  /**
   * Toggle theme between light and dark
   */
  toggleTheme: () => void;
  /**
   * Set sidebar state
   */
  setSidebarOpen: (open: boolean) => void;
  /**
   * Set theme
   */
  setTheme: (theme: 'light' | 'dark') => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export interface LayoutProviderProps {
  children: ReactNode;
  /**
   * Initial sidebar state
   */
  initialSidebarOpen?: boolean;
  /**
   * Initial theme
   */
  initialTheme?: 'light' | 'dark';
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  initialSidebarOpen = false,
  initialTheme = 'light',
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);
  const [theme, setTheme] = useState<'light' | 'dark'>(initialTheme);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const value: LayoutContextType = {
    sidebarOpen,
    toggleSidebar,
    theme,
    toggleTheme,
    setSidebarOpen,
    setTheme,
  };

  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayout = (): LayoutContextType => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
