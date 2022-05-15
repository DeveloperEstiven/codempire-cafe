import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AsideMenu } from '@components/aside-menu';
import { TRoutes } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetAllOrdersQuery, useGetOrdersQuery } from '@services/order-api';
import { notificationOrdersReceived } from '@store/reducers/notifications';
import { Container, ContainerWrapper } from '@styles/components/container';
import { ILayoutProps } from './layout.typings';

export const Layout: React.FC<ILayoutProps> = ({ hideAsideMenuPaths = [] }) => {
  const {
    token: isAuthorized,
    user: { role },
  } = useAppSelector((store) => store.user);

  const isManager = role === 'manager';

  const { data: orders } = useGetOrdersQuery('', {
    skip: !isAuthorized || isManager,
    pollingInterval: 10000,
  });
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const { data: managerOrders } = useGetAllOrdersQuery('', {
    skip: !isManager,
    pollingInterval: 10000,
  });

  useEffect(() => {
    const currentOrders = isManager ? managerOrders : orders;
    currentOrders && dispatch(notificationOrdersReceived(currentOrders));
  }, [managerOrders, orders]);

  return (
    <>
      <ContainerWrapper>
        {!hideAsideMenuPaths.includes(pathname as TRoutes) && <AsideMenu />}
        <Container>
          <Outlet />
        </Container>
      </ContainerWrapper>
    </>
  );
};
