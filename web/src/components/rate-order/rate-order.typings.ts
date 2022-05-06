import { ICompletedOrder } from '@store/reducers/notifications/notifications.typings';

export interface IRateOrderProps {
  order: ICompletedOrder;
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: (isRatingModalOpen: boolean) => void;
}
