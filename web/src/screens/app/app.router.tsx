import { Route, Routes } from 'react-router-dom';

import { Animation } from '@components/animation';
import { Page404 } from '@components/page-404';
import { LogInPage } from '@screens/log-in';
import { MainPage } from '@screens/main-page';
import { SignUpPage } from '@screens/sign-up';

import { ROUTES } from '@constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route index element={<LogInPage />} />
      <Route
        path={ROUTES.logIn}
        element={
          <>
            <Animation />
            <LogInPage />
          </>
        }
      />
      <Route
        path={ROUTES.signUp}
        element={
          <>
            <Animation />
            <SignUpPage />
          </>
        }
      />
      <Route path={ROUTES.mainPage} element={<MainPage />} />
      <Route path={ROUTES.default} element={<Page404 />} />
    </Routes>
  );
};
