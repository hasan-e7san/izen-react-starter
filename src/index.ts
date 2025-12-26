// Import global styles
import './index.css';

// Export all UI components
export * from './components/ui';

// Export other components
export { Button } from './components/Button';
export { Card } from './components/Card';

// Export contexts
export { LayoutProvider, useLayout } from './contexts/LayoutContext';
export type { LayoutContextType } from './contexts/LayoutContext';

// Export hooks
export { useIsMobile } from './hooks';

// Export lib utilities
export {
  cn,
  capitalize,
  convertToHourMinuteString,
  formatErrorToList,
  formatDate,
  appendFormData,
  debounce,
  throttle,
  handleEditCache,
  handleSingleEditCache
} from './lib';
export type { CacheEditOptions } from './lib';

// Export RBAC
export {
  Action,
  Resource,
  Role,
  RolesNames,
  rules,
  userCan,
  useAccessControl,
  AccessControlWrapper,
  withAccessControl,
  UpdateAccessControlWrapper
} from './rbac';
export type {
  UseAccessControlReturn,
  AccessControlWrapperProps,
  WithAccessControlProps,
  UpdateAccessControlWrapperProps
} from './rbac';

// Export providers
export {
  AuthProvider,
  useAuth,
  ModalProvider,
  useModal,
  OverlayProvider,
  useOverlay,
  ThemeProvider,
  useTheme,
  AppProvider,
  queryClient
} from './providers';

export type {
  AuthProviderProps,
  AuthContextType,
  User,
  BackendTokens,
  ModalProviderProps,
  ModalContextType,
  OverlayProviderProps,
  OverlayContextProps,
  ThemeProviderProps,
  ThemeProviderState,
  Theme,
  AppProviderProps
} from './providers';

// Export routes
export { RequiredAuth, usePathname, useRouter } from './routes';
export type { RequiredAuthProps, Router } from './routes';

// Export services
export { apiService } from './services/apiService';
export type { ApiService } from './services/apiService';

// Export types
export type { ButtonProps } from './components/Button';
export type { CardProps } from './components/Card';
