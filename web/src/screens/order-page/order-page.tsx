import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { IUserDetailOrderResponse } from 'typings/api';
import { OrderForm } from './order-page-form';
import { THandleOrderSubmit } from './order-page-form/order-page-form.typings';
import { StyledOrderPage as Styled } from './order-page.styles';

export const OrderPage: React.FC = () => {
  const navigate = useNavigate();
  const isCartWithItems = !!useAppSelector((store) => store.cart.totalPrice);
  const { state } = useLocation();

  useEffect(() => {
    if (!state && !isCartWithItems) {
      navigate(ROUTES.cart);
    }
  }, []);

  const onGoOnClick: THandleOrderSubmit = async (values, { setSubmitting }) => {
    const order = state as IUserDetailOrderResponse;
    const isOldOrder = order && 'orderNumber' in (order as IUserDetailOrderResponse);
    const oneItem = {
      address: values.address,
      wantedDeliveryDate: values.deliveryDate,
      comment: values.comment,
      item: isOldOrder ? null : state,
    };
    const newOrder = { ...order, ...oneItem };

    navigate(ROUTES.orderConfirmation, { state: isOldOrder ? newOrder : oneItem });
    setSubmitting(false);
  };

  return <Styled.OrderPage>{(!!state || isCartWithItems) && <OrderForm onOrder={onGoOnClick} />}</Styled.OrderPage>;
};
