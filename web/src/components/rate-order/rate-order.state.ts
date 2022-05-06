import { SyntheticEvent, useEffect, useState } from 'react';

import { successMixin } from '@constants/pop-up-messages';
import { useAppDispatch } from '@hooks/redux';
import { useAddOrderFeedbackMutation } from '@services/order-api';
import { ratedOrderReceived } from '@store/reducers/notifications';
import { IOrderFeedback, TInputEvent } from 'typings/api';
import { IRateOrderProps } from './rate-order.typings';

export const useRateOrder = ({ order, setIsRatingModalOpen }: Omit<IRateOrderProps, 'isRatingModalOpen'>) => {
  const [addFeedback, { data }] = useAddOrderFeedbackMutation();
  const dispatch = useAppDispatch();
  const [feedback, setFeedback] = useState<IOrderFeedback>({
    id: order.id,
    customerFeedback: '',
    rating: 0,
  });

  useEffect(() => {
    setFeedback((prev) => ({ ...prev, id: order.id }));
  }, [order]);

  useEffect(() => {
    if (data) {
      dispatch(ratedOrderReceived(feedback));
      setFeedback((prev) => ({ ...prev, rating: 0, customerFeedback: '' }));
      successMixin({ title: 'Thanks for your feedback' }).fire();
    }
  }, [data]);

  const onCustomerFeedbackChange = (e: TInputEvent) => {
    setFeedback((prev) => ({ ...prev, customerFeedback: e.target.value }));
  };

  const onRateOrder = () => {
    addFeedback(feedback).unwrap();
    setIsRatingModalOpen(false);
  };

  const onModalClose = () => {
    setIsRatingModalOpen(false);
  };

  const onRatingClick = (e: SyntheticEvent<Element, Event>, value: number | null) => {
    !order.isRated && setFeedback((prev) => ({ ...prev, rating: value || 0 }));
  };

  return {
    onModalClose,
    onRatingClick,
    feedback,
    onCustomerFeedbackChange,
    onRateOrder,
  };
};
