import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from 'universal-cookie';

export interface User {
  id?: string;
  name?: string;
  email?: string;
  verified?: boolean;
  [key: string]: any;
}

export interface BackendTokens {
  access_token?: string;
  refresh_token?: string;
  [key: string]: any;
}

export interface AuthContextType {
  user: User | undefined;
  tokens: BackendTokens | undefined;
  setAuthData: (user: User | undefined | null, token?: BackendTokens | null | undefined) => void;
  setOtherData: (data: any | undefined) => void;
  otherData: any | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const cookies = new Cookies();

export interface AuthProviderProps {
  children: ReactNode;
}

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

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
