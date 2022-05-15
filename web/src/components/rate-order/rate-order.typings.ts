import { IUserOrderResponse } from 'typings/api';

export interface IRateOrderProps {
  order: IUserOrderResponse;
  isRatingModalOpen: boolean;
  setIsRatingModalOpen: (isRatingModalOpen: boolean) => void;
}
