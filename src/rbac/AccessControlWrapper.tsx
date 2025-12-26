import React, { ReactElement } from 'react';
import useAccessControl from './useAccessControl';
import { Action, Resource } from './access-rules';

export interface AccessControlWrapperProps {
  children: ReactElement;
  resource: Resource;
  action?: Action;
  fallback?: ReactElement | null;
}

export const AccessControlWrapper: React.FC<AccessControlWrapperProps> = ({
  children,
  resource,
  action = Action.Read,
  fallback = null,
}) => {
  const { isAllowed } = useAccessControl();

  if (!isAllowed(action, resource)) {
    return fallback;
  }

  return children;
};

export interface WithAccessControlProps {
  accessedResource: Resource;
  accessAction?: Action;
}

export const withAccessControl = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return React.forwardRef<any, P & WithAccessControlProps>((props, ref) => {
    const { isAllowed } = useAccessControl();
    const { accessedResource, accessAction = Action.Read, ...rest } = props;

    if (!isAllowed(accessAction, accessedResource)) {
      return null;
    }

    return <WrappedComponent ref={ref} {...(rest as P)} />;
  });
};

export default withAccessControl;
