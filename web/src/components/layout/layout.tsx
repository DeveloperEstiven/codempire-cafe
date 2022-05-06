import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { AsideMenu } from '@components/aside-menu';
import { TRoutes } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useLazyGetCompletedOrdersQuery } from '@services/order-api';
import { completedOrderReceived } from '@store/reducers/notifications';
import { ICompletedOrder } from '@store/reducers/notifications/notifications.typings';
import { Container, ContainerWrapper } from '@styles/components/container';
import { IUserOrderResponse } from 'typings/api';
import { ILayoutProps } from './layout.typings';

export const Layout: React.FC<ILayoutProps> = ({ hideAsideMenuPaths = [] }) => {
  const { pathname } = useLocation();
  const [getCompletedOrders, { data: orders }] = useLazyGetCompletedOrdersQuery();
  const dispatch = useAppDispatch();
  const { completedOrders: oldCompletedOrders } = useAppSelector((store) => store.notifications);

  useEffect(() => {
    getCompletedOrders();
  }, []);

  useEffect(() => {
    if (orders) {
      const getUniqueOrders = (list1: IUserOrderResponse[], list2: ICompletedOrder[]) =>
        list1.filter(
          (
            (set) => (a) =>
              !set.has(a.id)
          )(new Set(list2.map((b) => b.id)))
        );

      const receivedCompletedOrders = orders?.filter((order) => order.status == 'delivered') || [];
      const completedOrders = getUniqueOrders(receivedCompletedOrders, oldCompletedOrders);

      completedOrders?.map(({ id, orderNumber, wantedDeliveryDate, rating, customerFeedback }) =>
        dispatch(
          completedOrderReceived({
            id,
            isRated: !!rating,
            orderNumber,
            date: wantedDeliveryDate,
            rating,
            customerFeedback,
          })
        )
      );
    }
  }, [orders]);

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
