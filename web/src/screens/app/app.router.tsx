import { Route, Routes } from 'react-router-dom';

import { Page404 } from '@components/page-404';
import { Layout } from '@screens/layout';
import { LoginPage } from '@screens/log-in';
import { PrivateRoute } from './private-route';

import { ROUTES } from '@constants/routes';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route path={ROUTES.login} element={<LoginPage />} />
        <Route
          path={ROUTES.admin}
          element={
            <PrivateRoute isAdmin={true}>
              <div>private route</div>
            </PrivateRoute>
          }
        />
      </Route>
      <Route path={ROUTES.default} element={<Page404 />} />
    </Routes>
  );
};
