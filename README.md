# React Starter

A modern React component library built with Vite, TypeScript, and best practices.

## Features

- 🎨 **UI Components**: Pre-built, customizable components (Button, Card, etc.)
- 🎭 **Layout Context**: Context API for managing layout state (sidebar, theme)
- 🔐 **Authentication Provider**: Built-in auth context with cookie management
- 🛣️ **Routing Utilities**: Protected routes and navigation hooks
- 🎨 **Theme Provider**: Dark/light mode with system preference support
- 🌐 **API Service**: Axios-based service for data fetching and posting
- 🔄 **React Query Integration**: Built-in query client and provider
- � **RBAC System**: Role-based access control with customizable permissions
- 🎣 **Custom Hooks**: Utility hooks like useIsMobile, useRouter, usePathname
- 🛠️ **Utility Functions**: Helper functions for common tasks (cn, debounce, throttle, etc.)
- 💾 **Cache Utilities**: React Query cache manipulation helpers
- �📦 **TypeScript**: Full type safety and IntelliSense support
- ⚡ **Vite**: Lightning-fast development and optimized builds
- 🌳 **Tree-shakeable**: Optimized for minimal bundle size

## Installation

```bash
npm install react-starter
# or
yarn add react-starter
# or
pnpm add react-starter
```

### Import Styles

Don't forget to import the CSS file in your app entry point:

```tsx
// In your main.tsx or App.tsx
import 'react-starter/style.css';
```

The library includes Tailwind CSS with pre-configured theme variables for:
- Light/Dark modes
- Customizable color schemes
- Geist font family
- Custom CSS variables for theming

## Usage

### App Provider (All-in-one)

Wrap your application with `AppProvider` to get all providers in one go:

```tsx
import { AppProvider } from 'react-starter';
import { AppRouter } from './routes';

function App() {
  return (
    <AppProvider 
      defaultTheme="light"
      showReactQueryDevtools={true}
    >
      <AppRouter />
    </AppProvider>
  );
}
```

### Authentication

```tsx
import { AuthProvider, useAuth } from 'react-starter';

function LoginPage() {
  const { setAuthData } = useAuth();
  
  const handleLogin = async (credentials) => {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    const { user, tokens } = await response.json();
    
    // Store user and tokens in cookies
    setAuthData(user, tokens);
  };
  
  return <div>Login Form</div>;
}

function ProfilePage() {
  const { user, tokens } = useAuth();
  
  return (
    <div>
      <h1>Welcome {user?.name}</h1>
      <p>Token: {tokens?.access_token}</p>
    </div>
  );
}
```

### Protected Routes

```tsx
import { RequiredAuth } from 'react-starter';
import { Routes, Route } from 'react-router-dom';

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected routes */}
      <Route element={<RequiredAuth redirectTo="/login" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
```

### Router Hooks

```tsx
import { useRouter, usePathname } from 'react-starter';

function MyComponent() {
  const router = useRouter();
  const pathname = usePathname();
  
  return (
    <div>
      <p>Current path: {pathname}</p>
      <button onClick={() => router.push('/dashboard')}>
        Go to Dashboard
      </button>
      <button onClick={() => router.back()}>
        Go Back
      </button>
    </div>
  );
}
```

### Theme Provider

```tsx
import { ThemeProvider, useTheme } from 'react-starter';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### Modal and Overlay

```tsx
import { ModalProvider, useModal, OverlayProvider, useOverlay } from 'react-starter';

function MyComponent() {
  const { isOpen, setIsOpen } = useModal();
  const { showOverlay, setShowOverlay } = useOverlay();
  
  return (
    <div>
      <button onClick={() => setIsOpen('my-modal')}>Open Modal</button>
      {isOpen === 'my-modal' && <div>Modal Content</div>}
    </div>
  );
}
```

### Components

```tsx
import { Button, Card } from 'react-starter';

function MyApp() {
  return (
    <Card title="Hello World">
      <p>Card content goes here</p>
      <Button variant="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </Button>
    </Card>
  );
}
```

### Layout Context

```tsx
import { LayoutProvider, useLayout } from 'react-starter';

function App() {
  return (
    <LayoutProvider initialTheme="light" initialSidebarOpen={true}>
      <MyComponent />
    </LayoutProvider>
  );
}

function MyComponent() {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useLayout();
  
  return (
    <div>
      <button onClick={toggleTheme}>
        Current theme: {theme}
      </button>
      <button onClick={toggleSidebar}>
        Sidebar is {sidebarOpen ? 'open' : 'closed'}
      </button>
    </div>
  );
}
```

### API Service

```tsx
import { apiService } from 'react-starter';

// Configure base URL
apiService.setBaseURL('https://api.example.com');

// Set auth token
apiService.setAuthToken('your-token-here');

// Make API calls
async function fetchData() {
  try {
    const data = await apiService.get('/users');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function postData() {
  try {
    const response = await apiService.post('/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log(response);
  } catch (error) {
    console.error('Error posting data:', error);
  }
}
```

### Role-Based Access Control (RBAC)

```tsx
import { 
  useAccessControl, 
  AccessControlWrapper, 
  withAccessControl,
  Action, 
  Resource 
} from 'react-starter';

// Using the hook
function AdminPanel() {
  const { isAllowed } = useAccessControl();
  
  return (
    <div>
      {isAllowed(Action.Create, Resource.Users) && (
        <button>Create User</button>
      )}
      {isAllowed(Action.Delete, Resource.Users) && (
        <button>Delete User</button>
      )}
    </div>
  );
}

// Using the wrapper component
function Dashboard() {
  return (
    <AccessControlWrapper resource={Resource.Reports} action={Action.Read}>
      <ReportsPanel />
    </AccessControlWrapper>
  );
}

// Using the HOC
const ProtectedComponent = withAccessControl(MyComponent);

<ProtectedComponent 
  accessedResource={Resource.Users} 
  accessAction={Action.Update}
  otherProp="value" 
/>
```

### Utility Functions

```tsx
import { cn, debounce, throttle, capitalize, formatDate } from 'react-starter';

// Combine classnames with Tailwind merge
const className = cn('bg-blue-500', 'text-white', 'hover:bg-blue-600');

// Debounce function calls
const debouncedSearch = debounce((query: string) => {
  console.log('Searching for:', query);
}, 300);

// Throttle function calls
const throttledScroll = throttle(() => {
  console.log('Scroll event');
}, 100);

// Capitalize strings
const capitalized = capitalize('hello'); // 'Hello'

// Format dates
const formatted = formatDate(new Date(), 'yyyy-MM-dd');
```

### Custom Hooks

```tsx
import { useIsMobile } from 'react-starter';

function ResponsiveComponent() {
  const isMobile = useIsMobile();
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

### Cache Management

```tsx
import { handleEditCache, handleSingleEditCache } from 'react-starter';

// Update cache after editing an item
handleEditCache({
  item: updatedUser,
  type: 'edit',
  cacheKey: 'users'
});

// Add new item to cache
handleEditCache({
  item: newUser,
  type: 'add',
  cacheKey: 'users'
});

// Delete item from cache
handleEditCache({
  item: { id: userId },
  type: 'delete',
  cacheKey: 'users'
});
```

## Development

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library
npm run build

# Lint code
npm run lint
```

### Project Structure

```
src/
├── components/          # UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   └── index.ts
│   └── Card/
│       ├── Card.tsx
│       ├── Card.css
│       └── index.ts
├── contexts/           # React contexts
│   └── LayoutContext.tsx
├── hooks/              # Custom hooks
│   ├── useIsMobile.ts
│   └── index.ts
├── lib/                # Utility functions
│   ├── utils.ts
│   ├── cache-util.ts
│   └── index.ts
├── providers/          # Context providers
│   ├── AuthProvider.tsx
│   ├── ModalProvider.tsx
│   ├── OverlayProvider.tsx
│   ├── ThemeProvider.tsx
│   ├── AppProvider.tsx
│   └── index.ts
├── rbac/               # Role-based access control
│   ├── access-rules.ts
│   ├── useAccessControl.ts
│   ├── AccessControlWrapper.tsx
│   ├── UpdateAccessControlWrapper.tsx
│   └── index.ts
├── routes/             # Routing utilities
│   ├── RequiredAuth.tsx
│   ├── hooks/
│   │   ├── usePathname.ts
│   │   ├── useRouter.ts
│   │   └── index.ts
│   └── index.ts
│   └── index.ts
├── services/           # API and utility services
│   └── apiService.ts
├── index.ts           # Main export file
└── main.tsx           # Dev preview entry
```

## API Documentation

### AppProvider

A comprehensive provider that wraps your app with all necessary providers.

Props:
- `children`: ReactNode (required)
- `ErrorFallback`: React.ComponentType<FallbackProps> (optional)
- `showReactQueryDevtools`: boolean (default: false)
- `defaultTheme`: 'dark' | 'light' | 'system' (default: 'light')
- `storageKey`: string (default: 'vite-ui-theme')

### AuthProvider

Authentication context provider with cookie-based storage.

Hooks:
- `useAuth()`: Returns auth context with user, tokens, and management methods

Context value:
- `user`: User | undefined
- `tokens`: BackendTokens | undefined
- `setAuthData(user, tokens)`: Store auth data in cookies
- `otherData`: any (for additional app data)
- `setOtherData(data)`: Set additional data

### RequiredAuth

Protected route component that redirects unauthenticated users.

Props:
- `redirectTo`: string (default: '/login') - Where to redirect if not authenticated

### Router Hooks

**useRouter()**
- `back()`: Navigate back
- `forward()`: Navigate forward
- `reload()`: Reload page
- `push(href)`: Navigate to route
- `replace(href)`: Replace current route

**usePathname()**
- Returns current pathname string

### ThemeProvider

Theme management with localStorage persistence.

Props:
- `children`: ReactNode
- `defaultTheme`: 'dark' | 'light' | 'system' (default: 'light')
- `storageKey`: string (default: 'vite-ui-theme')

Hook:
- `useTheme()`: Returns { theme, setTheme }

### ModalProvider

Modal state management.

Hook:
- `useModal()`: Returns { isOpen, setIsOpen }

### OverlayProvider

Overlay state management.

Hook:
- `useOverlay()`: Returns { showOverlay, setShowOverlay }

### Button Component

Props:
- `variant`: 'primary' | 'secondary' | 'outline' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- `loading`: boolean (default: false)
- All standard HTML button attributes

### Card Component

Props:
- `title`: string (optional)
- `children`: ReactNode (required)
- `footer`: ReactNode (optional)
- `elevation`: 'none' | 'low' | 'medium' | 'high' (default: 'medium')
- `className`: string (optional)

### Layout Context

Context value:
- `sidebarOpen`: boolean
- `toggleSidebar`: () => void
- `setSidebarOpen`: (open: boolean) => void
- `theme`: 'light' | 'dark'
- `toggleTheme`: () => void
- `setTheme`: (theme: 'light' | 'dark') => void

### API Service

Methods:
- `get<T>(url, config?)`: Promise<T>
- `post<T>(url, data?, config?)`: Promise<T>
- `put<T>(url, data?, config?)`: Promise<T>
- `patch<T>(url, data?, config?)`: Promise<T>
- `delete<T>(url, config?)`: Promise<T>
- `setBaseURL(baseURL)`: void
- `setAuthToken(token)`: void
- `removeAuthToken()`: void

### RBAC System

**Enums:**
- `Action`: Manage, Create, Read, Update, Delete
- `Resource`: Users, UserGroups, Clients, Reports, etc.
- `Role`: Admin, Manager, Reader, Client

**Functions:**
- `userCan(roles, action, resource)`: Check if user can perform action
- `useAccessControl()`: Hook for access control
  - `isAllowed(action, resource)`: boolean
  - `getResourceByUrl(url)`: Resource

**Components:**
- `<AccessControlWrapper>`: Conditionally render based on permissions
- `withAccessControl(Component)`: HOC for access control
- `<UpdateAccessControlWrapper>`: Wrapper specifically for Update action

### Utility Functions

- `cn(...inputs)`: Merge Tailwind classes with clsx
- `capitalize(str)`: Capitalize first letter
- `convertToHourMinuteString(hours)`: Convert decimal hours to HH:MM
- `formatErrorToList(errors)`: Format errors as HTML list
- `formatDate(date, format)`: Format date strings
- `appendFormData(data)`: Convert object to FormData
- `debounce(func, wait)`: Debounce function calls
- `throttle(func, limit)`: Throttle function calls

### Cache Utilities

- `handleEditCache({ item, type, cacheKey })`: Manipulate React Query cache
  - type: 'edit' | 'add' | 'delete'
- `handleSingleEditCache({ item, cacheKey })`: Update single item in cache

### Custom Hooks

- `useIsMobile()`: Detect if viewport is mobile (<768px)
- `useRouter()`: Navigation utilities
- `usePathname()`: Get current pathname
- `useAccessControl()`: Access control utilities

## License

MIT
