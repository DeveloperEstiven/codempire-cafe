import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

interface IPrivateRouteProps {
  isAdmin: boolean;
  redirectPath?: string;
  children: JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = (props) => {
  const { isAdmin, children, redirectPath } = props;
  return isAdmin ? children : <Navigate to={redirectPath ? redirectPath : ROUTES.login} />;
};
