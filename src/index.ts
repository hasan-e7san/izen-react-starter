// Import global styles
import './index.css';

// Export Tailwind config
export { tailwindConfig, default as defaultTailwindConfig } from './config/tailwind.config';

// Export all UI components (excludes table/pagination - using custom versions)
export * from './components/ui';

// Export other components
export { CButton } from './components/Button';
export { Card } from './components/Card';

// Component categories
export * from './components/charts';
export * from './components/table';
export * from './components/tabs';
export * from './components/overlay';
export * from './components/layout';
export * from './components/modals';
export * from './components/date-picker';
export * from './components/search';
export * from './components/common';

// Navigation components (explicit exports to avoid Sidebar conflict)
export {
  UserNav,
  DashboardNav,
  Sidebar,
  MobileSidebar
} from './components/navigation';
export type {
  UserNavProps,
  DashboardNavProps,
  SidebarProps,
  TMobileSidebarProps
} from './components/navigation';

// Form components
export {
  FormLayout,
  FileUploadButton,
  AdvanceSelectField,
  AdvanceSelectSimple,
  InputField,
  SelectInput,
  SelectField,
  DatePickerField,
  DatePickerInput,
  InlineCheckBoxField,
  InlineCheckBoxInput,
  InlineRadioButtonField,
  InlineRadioButtonInput,
  SaveCloseButton,
  TimeField,
  FileUploadField,
} from './components/form';
export type {
  FormLayoutProps,
  FileUploadButtonProps,
  Attachment,
  FileUploadProps,
  CustomInputProps,
  CustomRadioButtonProps,
  CustomCheckBoxProps,
  CustomSelectProps,
  SelectOption,
} from './components/form';

// Export contexts
export { LayoutProvider, useLayout } from './contexts/LayoutContext';
export type { LayoutContextType } from './contexts/LayoutContext';

// Export hooks
export { useIsMobile } from './hooks';

// Export lib utilities (split by folder)
export {
  cn,
  capitalize,
  convertToHourMinuteString,
  formatErrorToList,
  formatDate,
  dateFromat,
  createChangeEvent,
  appendFormData,
  buildMultipartFormData,
  buildRolePermissionsFormData,
  buildEmployeeShiftFormData,
  formatPayloadForEndpoint,
  formatAxiosData,
  removeHtmlTags,
  toUTCDateString,
  toUTCDateTimeString,
  parseTimeToMilliseconds,
  diffHoursFromTimestamps,
  subtractTimeStrings,
  sumTimeStrings,
  formatSecondsToHms,
  getWeekRange,
  debounce,
  throttle,
} from './lib/utils';

export { handleEditCache, handleSingleEditCache } from './lib/cache-util';

// API: axios + hooks
export { createAxiosInstance, createAuthAxiosInstance } from './lib/api/axios/axios';
export { onDelete } from './lib/api/axios/delete-item';
export { default as useRefreshToken } from './lib/api/axios/useRefreshToken';
export { default as useAxiosAuth } from './lib/api/axios/hooks/useAxiosAuth';
export { default as useAxiosHeadersUrl } from './lib/api/axios/hooks/useAxiosHeadersUrl';
export { default as useFetchSingleAxios } from './lib/api/axios/hooks/useFetchSingleAxios';

// API: queries and mutations
export { useGet, useGetSingle } from './lib/api/queries/generic';
export { useUploadFile, useSendEmail } from './lib/api/mutation';

// Export lib types (split by folder)
export type { CacheEditOptions } from './lib/cache-util';
export type { AxiosConfig } from './lib/api/axios/axios';
export type { DeleteOptions } from './lib/api/axios/delete-item';
export type { RefreshTokenResponse, UseRefreshTokenOptions } from './lib/api/axios/useRefreshToken';
export type { UseAxiosAuthOptions } from './lib/api/axios/hooks/useAxiosAuth';
export type { AxiosHeadersConfig } from './lib/api/axios/hooks/useAxiosHeadersUrl';
export type { UseFetchSingleAxiosOptions, UseFetchSingleAxiosReturn } from './lib/api/axios/hooks/useFetchSingleAxios';
export type { FileUploadResponse, FileUploadParams, UseUploadFileOptions } from './lib/api/mutation/file-uploading';
export type { SendEmailResponse, SendEmailParams, UseSendEmailOptions } from './lib/api/mutation/send-email';

// Export RBAC
export {
  CommonActions,
  userCan,
  useAccessControl,
  AccessControlWrapper,
  withAccessControl,
  UpdateAccessControlWrapper,
  RBACProvider,
  useRBAC
} from './rbac';
export type {
  Action,
  Resource,
  Role,
  RoleLabel,
  Rule,
  RoleRules,
  Rules,
  RBACConfig,
  UseAccessControlReturn,
  AccessControlWrapperProps,
  WithAccessControlProps,
  UpdateAccessControlWrapperProps,
  RBACProviderProps,
  RBACContextType
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
  queryClient,
  FormProvider,
  useFormContext,
  FormContext
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
  AppProviderProps,
  FormProviderProps,
  FormContextType
} from './providers';

// Export routes
export { RequiredAuth, useAppRouter, usePathname, useRouter } from './routes';
export type { RequiredAuthProps, AppRouterConfig, Router } from './routes';

// Export services
export { apiService, useApiService } from './services/apiService';
export type { ApiService } from './services/apiService';

// Export constants
export { pageTitles } from './constants/urls';

// Export types
export type { ButtonProps } from './components/Button';
export type { CardProps } from './components/Card';
