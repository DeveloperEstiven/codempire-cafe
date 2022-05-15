import { SyntheticEvent, useEffect, useState } from 'react';

import { successMixin } from '@constants/pop-up-messages';
import { useUpdateOrderMutation } from '@services/order-api';
import { IOrderFeedback, IUserOrderResponse, TInputEvent } from 'typings/api';

export const useRateOrder = (order: IUserOrderResponse, setIsRatingModalOpen: (isRatingModalOpen: boolean) => void) => {
  const [addFeedback, { data }] = useUpdateOrderMutation();
  const [feedback, setFeedback] = useState<IOrderFeedback>({
    id: order.id,
    customerFeedback: '',
    rating: 0,
  });
  const isRated = !!order.rating;

  useEffect(() => {
    setFeedback((prev) => ({ ...prev, id: order.id }));
  }, [order]);

  useEffect(() => {
    if (data) {
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
    !isRated && setFeedback((prev) => ({ ...prev, rating: value || 0 }));
  };

  return {
    onModalClose,
    onRatingClick,
    feedback,
    onCustomerFeedbackChange,
    onRateOrder,
    isRated,
  };
};
