import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '@components/icon';
import { NotFound } from '@components/not-found';
import { RateOrder } from '@components/rate-order';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useUpdateOrderMutation } from '@services/order-api';
import { countReceived } from '@store/reducers/notifications';
import { Drawer } from '@styles/components/drawer';
import { Group } from '@styles/components/group';
import { getTime } from '@utils/date';
import { showScrollBar } from '@utils/scrollbar';
import { IUserOrderResponse } from 'typings/api';
import { groupNotificationsByDate } from './notifications-drawer.constants';
import { StyledNotificationsDrawer as Styled } from './notifications-drawer.styles';
import { INotificationsDrawer } from './notifications-drawer.typings';

export const NotificationsDrawer: React.FC<INotificationsDrawer> = ({ isActive, setIsActive }) => {
  const { notificationsOrders } = useAppSelector((store) => store.notifications);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<IUserOrderResponse>({} as IUserOrderResponse);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';
  const [setIsViewedByUser] = useUpdateOrderMutation();
  const [setIsViewedByManager] = useUpdateOrderMutation();

  const current = isManager
    ? notificationsOrders?.filter((o) => o.status === 'created')
    : [
        ...notificationsOrders?.filter((o) => o.status === 'delivered'),
        ...notificationsOrders?.filter((o) => o.status === 'ready'),
      ] || [];

  const count = isManager
    ? current.reduce((acc, item) => {
        if (!item.isViewedByManager) {
          return (acc += 1);
        }
        return acc;
      }, 0)
    : current.reduce((acc, item) => {
        if (!item.isViewedByUser) {
          return (acc += 1);
        }
        return acc;
      }, 0);

  dispatch(countReceived(count));

  const onCloseDrawer = () => {
    showScrollBar();
    setIsActive(false);
  };

  const onItemClick = (order: IUserOrderResponse) => async () => {
    onCloseDrawer();
    if (isManager) {
      await setIsViewedByManager({ id: order.id, isViewedByManager: true });
      return navigate(`${ROUTES.ordersPage}/${order.orderNumber}`);
    }

    await setIsViewedByUser({ id: order.id, isViewedByUser: true });
    if (order.status === 'delivered') {
      setCurrentOrder(order);
      setIsRatingModalOpen(true);
    } else {
      navigate(`${ROUTES.ordersPage}/${order.orderNumber}`);
    }
  };

  const sorted =
    current?.sort(function (a, b) {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    }) || [];

  const notificationGroup = useMemo(() => groupNotificationsByDate(sorted), [sorted]);

  return (
    <>
      <RateOrder
        order={currentOrder}
        isRatingModalOpen={isRatingModalOpen}
        setIsRatingModalOpen={setIsRatingModalOpen}
      />

      <Drawer.Item open={isActive} duration={200} size={300} onClose={onCloseDrawer} direction="left">
        <Styled.Header>
          <Icon type="notification" />
          Notifications
        </Styled.Header>
        {!notificationGroup?.length && <NotFound isButtonHide title="You don't have any notifications yet" />}
        <Styled.Wrapper>
          {notificationGroup?.map((group) => (
            <Group.Card key={group.date}>
              <h3>{group.date}</h3>
              <ul>
                {group.notifications.reverse().map((n: IUserOrderResponse) => {
                  return (
                    <div key={n.id + n.date}>
                      {isManager ? (
                        <Styled.NotificationItem isChecked={n?.isViewedByManager} onClick={onItemClick(n)}>
                          <p>You have a new order! {n.orderNumber}</p>
                          <span>time: {getTime(n.date)}</span>
                        </Styled.NotificationItem>
                      ) : (
                        <div>
                          {(n.status === 'delivered' || n.status === 'ready') && (
                            <Styled.NotificationItem isChecked={n?.isViewedByUser} onClick={onItemClick(n)}>
                              <p>
                                {n.status === 'delivered' && 'please, rate an order ' + n.orderNumber}
                                {n.status === 'ready' && 'Your order ' + n?.orderNumber + ' is ready'}
                              </p>
                              <span>time: {getTime(n.date)}</span>
                            </Styled.NotificationItem>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </ul>
            </Group.Card>
          ))}
        </Styled.Wrapper>
      </Drawer.Item>
    </>
  );
};
