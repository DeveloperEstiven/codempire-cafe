import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';

interface IPrivateRouteProps {
  redirectPath?: string;
  children: JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = (props) => {
  const { children, redirectPath } = props;
  const isToken = useAppSelector((store) => store.user.token);

  return isToken ? children : <Navigate to={redirectPath || ROUTES.logIn} />;
};
