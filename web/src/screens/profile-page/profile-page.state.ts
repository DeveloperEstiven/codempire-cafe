import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { useLogOutMutation } from '@services/user-api';

export const useProfilePage = () => {
  const {
    user: { id, userName, phoneNumber, role },
  } = useAppSelector((store) => store.user);
  const navigate = useNavigate();
  const [logOut] = useLogOutMutation();

  const isAuthorized = true; //!!token; //FIXME

  useEffect(() => {
    document.body.style.backgroundColor = '#ededf8';
    return () => {
      document.body.style.backgroundColor = '#fff';
    };
  }, []);

  const onLogOutClick = () => {
    logOut({ id });
  };

  const onLogInClick = () => {
    navigate(ROUTES.logIn);
  };

  return {
    isAuthorized,
    userName,
    phoneNumber,
    role,
    onLogOutClick,
    onLogInClick,
  };
};
