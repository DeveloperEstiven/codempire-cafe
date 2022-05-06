import { useMemo, useState } from 'react';

import { Icon } from '@components/icon';
import { NotFound } from '@components/not-found';
import { RateOrder } from '@components/rate-order';
import { useAppSelector } from '@hooks/redux';
import { ICompletedOrder } from '@store/reducers/notifications/notifications.typings';
import { Drawer } from '@styles/components/drawer';
import { Group } from '@styles/components/group';
import { getTime } from '@utils/date';
import { showScrollBar } from '@utils/scrollbar';
import { groupNotificationsByDate } from './notifications-drawer.constants';
import { StyledNotificationsDrawer as Styled } from './notifications-drawer.styles';
import { INotificationsDrawer } from './notifications-drawer.typings';

export const NotificationsDrawer: React.FC<INotificationsDrawer> = ({ isActive, setIsActive }) => {
  const { completedOrders } = useAppSelector((store) => store.notifications);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<ICompletedOrder>({} as ICompletedOrder);

  const onCloseDrawer = () => {
    showScrollBar();
    setIsActive(false);
  };

  const onModalOpen = (completedOrder: ICompletedOrder) => () => {
    setCurrentOrder(() => completedOrder);
    setIsRatingModalOpen(true);
  };

  const notificationGroup = useMemo(() => groupNotificationsByDate(completedOrders), [completedOrders]);

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
                {group.notifications.map((completedOrder: ICompletedOrder) => (
                  <Styled.NotificationItem
                    key={completedOrder.id}
                    isRated={completedOrder.isRated}
                    onClick={onModalOpen(completedOrder)}
                  >
                    <p>please, rate an order {completedOrder.orderNumber}</p>
                    <span>time: {getTime(completedOrder.date)}</span>
                  </Styled.NotificationItem>
                ))}
              </ul>
            </Group.Card>
          ))}
        </Styled.Wrapper>
      </Drawer.Item>
    </>
  );
};
