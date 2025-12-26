import React, { ReactElement } from 'react';
import useAccessControl from './useAccessControl';
import { Action, Resource } from './access-rules';

export interface UpdateAccessControlWrapperProps {
  children: ReactElement;
  resource: Resource;
  fallback?: ReactElement | null;
}

export const UpdateAccessControlWrapper: React.FC<UpdateAccessControlWrapperProps> = ({
  children,
  resource,
  fallback = null,
}) => {
  const { isAllowed } = useAccessControl();

  if (!isAllowed(Action.Update, resource)) {
    return fallback;
  }

  return children;
};

export default UpdateAccessControlWrapper;
