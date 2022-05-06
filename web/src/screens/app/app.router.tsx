import { Route, Routes } from 'react-router-dom';

import { AddressesForm } from '@components/addresses/addresses-from';
import { Animation } from '@components/animation';
import { Layout } from '@components/layout';
import { OrderConfirmation } from '@components/order-confirmation';
import { Page404 } from '@components/page-404';
import { hideAsideMenuPaths, ROUTES } from '@constants/routes';
import { Cart } from '@screens/cart';
import { ChangePassword } from '@screens/change-password';
import { EditProfile } from '@screens/edit-profile';
import { LogInPage } from '@screens/log-in';
import { MainPage } from '@screens/main-page';
import { OrderDetail } from '@screens/order-detail';
import { OrderPage } from '@screens/order-page/order-page';
import { OrdersPage } from '@screens/orders-page';
import { ProfilePage } from '@screens/profile-page';
import { SignUpPage } from '@screens/sign-up';
import { PrivateRoute } from './private-route';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout hideAsideMenuPaths={hideAsideMenuPaths} />}>
        <Route index element={<Animation element={<LogInPage />} />} />
        <Route path={ROUTES.logIn} element={<Animation element={<LogInPage />} />} />
        <Route path={ROUTES.signUp} element={<Animation element={<SignUpPage />} />} />
        <Route path={ROUTES.mainPage} element={<MainPage />} />
        <Route path={ROUTES.profilePage} element={<ProfilePage />} />
        <Route
          path={ROUTES.editProfile}
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.changePassword}
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.addAddresses}
          element={
            <PrivateRoute>
              <AddressesForm />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ordersPage}
          element={
            <PrivateRoute>
              <OrdersPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.ordersPage + '/:orderNumber'}
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.orderPage}
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.orderConfirmation}
          element={
            <PrivateRoute>
              <OrderConfirmation />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.cart} element={<Cart />} />
        <Route path={ROUTES.default} element={<Page404 />} />
      </Route>
    </Routes>
  );
};
