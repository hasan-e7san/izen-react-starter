import { useAuth } from '../providers/AuthProvider';
import { useLocation, Outlet, Navigate } from 'react-router-dom';

export interface RequiredAuthProps {
  redirectTo?: string;
}

export const RequiredAuth = ({ redirectTo = '/login' }: RequiredAuthProps) => {
  const auth = useAuth();
  const location = useLocation();
  
  return (
    (auth?.user && auth?.user?.verified)
      ? <Outlet />
      : <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}

export default RequiredAuth;
