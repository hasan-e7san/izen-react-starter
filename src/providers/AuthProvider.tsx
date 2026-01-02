import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from 'universal-cookie';

/**
 * Default User type - can be overridden by consuming projects
 * Extend this interface or pass your own type to AuthProvider
 */
export interface User {
  [key: string]: any;
}

export interface BackendTokens {
  [key: string]: any;
}

/**
 * Generic AuthContextType that accepts a custom User type
 * @template TUser - The user type for this auth context
 * @example
 * interface MyUser {
 *   id: string;
 *   name: string;
 *   role: 'admin' | 'user';
 * }
 * 
 * type MyAuthContext = AuthContextType<MyUser>;
 */
export interface AuthContextType<TUser = User> {
  user: TUser | undefined;
  tokens: BackendTokens | undefined;
  setAuthData: (user: TUser | undefined | null, token?: BackendTokens | null | undefined) => void;
  setOtherData: (data: any | undefined) => void;
  otherData: any | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookies = new Cookies();

/**
 * Props for AuthProvider
 */
export interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - manages authentication state
 * Accepts any User type through useAuth generic
 * 
 * @example
 * // In your app:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * // In your components, use with your custom User type:
 * interface MyUser {
 *   id: string;
 *   name: string;
 *   department: string;
 * }
 * 
 * const { user } = useAuth<MyUser>();
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {

  function setAuthData(userr?: User | undefined | null, token?: BackendTokens | undefined | null) {

    if (userr === undefined) {
      cookies.remove("access_token")
      cookies.remove("user")
      setToken(undefined)
      setAuth(undefined)
    } else {
      if (token !== null) {
        cookies.set('access_token', token, {
          path: '/',
          httpOnly: false,
          secure: false
        });
        setToken(token)

      }
      if (userr !== null) {
        cookies.set('user', userr, {
          path: '/',
          httpOnly: false,
          secure: false
        });
        setAuth(userr)
      }
    }

  }

  const [user, setAuth] = useState<User | undefined>(cookies.get("user"))
  const [tokens, setToken] = useState<BackendTokens | undefined>(cookies.get("access_token"))
  const [otherData, setOtherData] = useState<any | undefined>({})

  const auth: AuthContextType = { user, tokens, setAuthData, otherData, setOtherData }
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )

}

/**
 * Hook to use auth context
 * Must be used within an AuthProvider
 * 
 * @returns The auth context with user, tokens, and auth methods
 * 
 * @example
 * const { user, tokens, setAuthData } = useAuth();
 */
export function useAuth<TUser extends User = User>() {
  const context = useContext(AuthContext) as AuthContextType<TUser> | undefined;
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
