import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useCancelOrderMutation, useGetDetailOrderQuery } from '@services/order-api';
import { IResponseError } from 'typings/api';
import { swalConfig } from './order-detail.constants';

const swal = withReactContent(Swal);

export const useOrderDetail = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useGetDetailOrderQuery(orderNumber!);
  const isDelivered = order?.status === 'delivered';
  const [cancel, { data }] = useCancelOrderMutation();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      navigate(ROUTES.ordersPage);
    }
  }, [data]);

  const cancelOrder = async (id: string) => {
    const { isConfirmed } = await swal.fire(swalConfig);

    if (isConfirmed) {
      await trackPromise(cancel({ id }).unwrap(), PROMISES_AREA.cancelOrder);
      successMixin({ title: 'Your order has been canceled' }).fire();
    }
  };

  const onOrderAgain = () => {
    navigate(ROUTES.orderPage, { state: order });
  };

  const onCancelClick = (id: string) => () => cancelOrder(id);

  useEffect(() => () => swal.close(), []);

  if (error) {
    const err = error as IResponseError;
    errorMixin({ title: err.data.message }).fire();
  }

  return {
    order,
    isLoading,
    isDelivered,
    onCancelClick,
    onOrderAgain,
  };
};
