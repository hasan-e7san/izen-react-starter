import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, ReactNode, useMemo } from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './ThemeProvider';
import { AuthProvider } from './AuthProvider';
import { OverlayProvider } from './OverlayProvider';
import { ModalProvider } from './ModalProvider';

export const defaultQueryClientOptions = {
  queries: {
    refetchOnWindowFocus: false,
    staleTime: 60000
  },
  mutations: {},
};

/**
 * Default query client used when no custom client/options are provided.
 * Prefer supplying `queryClient` or `queryClientOptions` via `AppProvider` props
 * to avoid sharing a singleton across unrelated apps.
 */
export const queryClient = new QueryClient({ defaultOptions: defaultQueryClientOptions });

export interface AppProviderProps {
  children: ReactNode;
  ErrorFallback?: React.ComponentType<FallbackProps>;
  showReactQueryDevtools?: boolean;
  defaultTheme?: 'dark' | 'light' | 'system';
  storageKey?: string;
  /** Provide a custom QueryClient instance. If set, `queryClientOptions` is ignored. */
  queryClient?: QueryClient;
  /** Merge extra QueryClient options with the library defaults. */
  queryClientOptions?: any;
}

const DefaultErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center text-red-500"
      role="alert"
    >
      <h2 className="text-2xl font-semibold">
        Oops, something went wrong :(
      </h2>
      <pre className="text-2xl font-bold">{error.message}</pre>
      <pre>{error.stack}</pre>
    </div>
  );
};

export function AppProvider({
  children,
  ErrorFallback = DefaultErrorFallback,
  showReactQueryDevtools = false,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme',
  queryClient: providedQueryClient,
  queryClientOptions,
}: AppProviderProps) {
  const client = useMemo(() => {
    if (providedQueryClient) return providedQueryClient;

    const mergedOptions = {
      queries: {
        ...defaultQueryClientOptions.queries,
        ...queryClientOptions?.queries,
      },
      mutations: {
        ...defaultQueryClientOptions.mutations,
        ...queryClientOptions?.mutations,
      },
    };

    return new QueryClient({ defaultOptions: mergedOptions });
  }, [providedQueryClient, queryClientOptions]);

  return (
    <AuthProvider>
      <Suspense>
        <HelmetProvider>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={client}>
              {showReactQueryDevtools && <ReactQueryDevtools />}
              <OverlayProvider>
                <ThemeProvider defaultTheme={defaultTheme} storageKey={storageKey}>
                  <ModalProvider>
                    {children}
                  </ModalProvider>
                </ThemeProvider>
              </OverlayProvider>
            </QueryClientProvider>
          </ErrorBoundary>
        </HelmetProvider>
      </Suspense>
    </AuthProvider>
  );
}
