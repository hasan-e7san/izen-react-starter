import { useAuth } from '../providers/AuthProvider';
import { Action, Resource, Role, userCan } from './access-rules';

export interface UseAccessControlReturn {
  isAllowed: (action: Action, target: Resource) => boolean;
  getResourceByUrl: (url: string) => Resource;
}

export const useAccessControl = (): UseAccessControlReturn => {
  const { user } = useAuth();

  const isAllowed = (action: Action, target: Resource): boolean => {
    if (target === Resource.Auth) {
      return true;
    }
    
    if (!user) {
      return false;
    }

    const userRoles = user.role as Role;

    return userCan([userRoles], action, target);
  };

  const getResourceByUrl = (url: string): Resource => {
    const resources = Object.entries(Resource);

    for (const [, value] of resources) {
      if (url.startsWith("/" + value)) {
        return value as Resource;
      }
    }

    return Resource.Undefined;
  };

  return { isAllowed, getResourceByUrl };
};

export default useAccessControl;
