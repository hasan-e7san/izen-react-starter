# API Utilities Integration Summary

Successfully copied and refactored the API utilities from `componentsToUseInTheLib/lib/api` to `src/lib/api` and made them library-ready.

## What Was Done

### 1. **Axios Configuration** (`src/lib/api/axios/`)
- **axios.ts**: Created generic axios instance factories
  - `createAxiosInstance()` - Basic axios setup with customizable config
  - `createAuthAxiosInstance()` - Auth instance with cancel token support

- **delete-item.ts**: Generic delete handler with toast notifications
  - `onDelete()` - Configurable delete operation with callbacks
  - Removed hardcoded toast calls, made them optional
  - Added proper error handling

- **useRefreshToken.ts**: Token refresh hook
  - `useRefreshToken()` - Refreshes authentication tokens
  - Configurable refresh URL and callbacks
  - Handles token storage via AuthProvider

### 2. **Authentication Hooks** (`src/lib/api/axios/hooks/`)
- **useAxiosAuth.ts**: Comprehensive auth interceptor setup
  - Automatically adds Authorization headers
  - Handles 401 errors with automatic token refresh
  - Retries failed requests with new tokens
  - Custom headers support
  - Automatic cleanup on unmount

- **useAxiosHeadersUrl.ts**: Headers and URL configuration
  - Generates proper headers based on endpoint
  - Multipart form-data detection
  - Custom header injection support

- **useFetchSingleAxios.ts**: Direct fetch with cancel tokens
  - Cancel token support for cleanup
  - Generic type support
  - Configurable methods (get, post, patch, delete)
  - Error state management

### 3. **Query Hooks** (`src/lib/api/queries/`)
- **generic.ts**: React Query hooks for data fetching
  - `useGet()` - Fetch multiple items with caching
  - `useGetSingle()` - Fetch single item with default value support
  - Full React Query integration
  - Configurable stale time and refetch options
  - Undefined/null URL handling

### 4. **Mutation Hooks** (`src/lib/api/mutation/`)
- **file-uploading.ts**: File upload with cache updates
  - `useUploadFile()` - Upload files with FormData
  - Automatic query cache invalidation
  - Additional form data support
  - Multipart content-type handling

- **send-email.ts**: Email sending mutation
  - `useSendEmail()` - Send emails through API
  - Configurable endpoint
  - Additional field support

### 5. **Exports & Type Definitions**
- Created index files for each module with proper exports
- All functions have full TypeScript support with interfaces
- Main library exports all API utilities through `/lib/index.ts`
- All types exported alongside functions

## Key Changes from Original

| Aspect | Original | New Library Version |
|--------|----------|-------------------|
| Imports | App-specific paths (@/lib/constants) | Generic, configurable |
| Toast | Hardcoded integration | Optional callback |
| BaseURL | Constants file | Passed as config parameter |
| Type Safety | Partial | Full TypeScript interfaces |
| Error Handling | Basic | Comprehensive with callbacks |
| Configuration | Fixed | Fully configurable |
| Documentation | None | Comprehensive API.md |
| Exports | Implicit | Explicit and typed |

## New Features Added

1. **Configurable Axios Setup** - Users can pass any baseURL and headers
2. **Callback System** - Success, error, and finally callbacks for all operations
3. **Custom Headers Support** - Per-request custom headers capability
4. **Query Configuration** - Control stale time, refetch behavior, cache keys
5. **Type Safety** - Full TypeScript support with exported interfaces
6. **Default Values** - useGetSingle supports default values while loading
7. **Multipart Detection** - Automatic Content-Type header for form data
8. **Request Cancellation** - Automatic cleanup with cancel tokens

## Usage Example

```typescript
import {
  createAuthAxiosInstance,
  useAxiosAuth,
  useGet,
  useUploadFile,
} from 'izen-react-starter';

// Setup
const authApi = createAuthAxiosInstance({
  baseURL: 'https://api.example.com'
});

// Use in component
function Dashboard() {
  const axios = useAxiosAuth({
    axiosInstance: authApi,
    refreshUrl: '/auth/refresh',
    onRefreshFail: () => window.location.href = '/login'
  });

  // Fetch users
  const { data: users, isLoading } = useGet(axios, '/users', {
    queryKey: 'users',
    params: { page: 1, limit: 20 }
  });

  // Upload file
  const uploadFile = useUploadFile(axios, {
    queryKey: 'files',
    onSuccess: () => console.log('Uploaded!')
  });

  return <YourUI />;
}
```

## Files Created

### Source Files (src/lib/api/)
```
src/lib/api/
├── axios/
│   ├── axios.ts (instance creation)
│   ├── delete-item.ts (delete handler)
│   ├── useRefreshToken.ts (token refresh)
│   ├── hooks/
│   │   ├── useAxiosAuth.ts (interceptors)
│   │   ├── useAxiosHeadersUrl.ts (headers config)
│   │   └── useFetchSingleAxios.ts (direct fetch)
│   └── index.ts (exports)
├── queries/
│   ├── generic.ts (useGet, useGetSingle)
│   └── index.ts (exports)
├── mutation/
│   ├── file-uploading.ts (useUploadFile)
│   ├── send-email.ts (useSendEmail)
│   └── index.ts (exports)
└── index.ts (main exports)
```

### Documentation
- **API.md** - Comprehensive API documentation with examples
- All functions include JSDoc comments with examples

## Integration Points

1. **AuthProvider** - Uses `useAuth()` for token management
2. **React Query** - Built-in caching and invalidation
3. **Axios** - Standard axios patterns and configuration
4. **TypeScript** - Full type support throughout

## Testing Recommendations

1. Test token refresh flow with 401 responses
2. Verify cache invalidation on mutations
3. Test multipart form data uploads
4. Verify cancel tokens work on unmount
5. Test custom headers are applied correctly
6. Verify error callbacks are triggered

## Migration from Original

For consuming projects previously using the original API:

1. Install latest version: `npm install izen-react-starter@2.2.0`
2. Import from library instead of local files
3. Configure axios instances with baseURL
4. Replace hardcoded toast calls with callbacks
5. Update import paths (now from library exports)

## Version

- **Current Version**: 2.2.0
- **Released**: January 2026
- **Changes**: Added comprehensive API utilities

## What's Next

The library now has:
- ✅ Configurable RBAC (2.1.0)
- ✅ Comprehensive API utilities (2.2.0)
- Form components (already included)
- UI components (already included)
- Layout and navigation components (already included)

Future enhancements could include:
- GraphQL support
- Caching strategies
- Optimistic updates
- Websocket integration
- Request retries with exponential backoff
