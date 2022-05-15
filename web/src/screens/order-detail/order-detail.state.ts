import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import {
    useCancelOrderMutation, useGetDetailOrderQuery, useGetManagerDetailOrderQuery,
    useUpdateOrderMutation
} from '@services/order-api';
import { IResponseError, IUserDetailOrderResponse } from 'typings/api';
import { swalConfig } from './order-detail.constants';

const swal = withReactContent(Swal);

export const useOrderDetail = () => {
  const { orderNumber } = useParams();
  const navigate = useNavigate();
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';
  const [currentOrder, setCurrentOrder] = useState<IUserDetailOrderResponse>();
  const [cancel, { data: isCanceled }] = useCancelOrderMutation();
  const [accept] = useUpdateOrderMutation();
  const [close] = useUpdateOrderMutation();
  const [setViewed] = useUpdateOrderMutation();
  const [isDelivered, setIsDelivered] = useState(false);
  const [isOrderAccepted, setIsOrderAccepted] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isError, setIsError] = useState(false);

  const {
    data: order,
    isLoading,
    error,
  } = useGetDetailOrderQuery(orderNumber!, {
    skip: isManager || isRated || isError,
    pollingInterval: 5000,
  });

  const {
    data: managerOrder,
    isLoading: isManagerOrderLoading,
    error: managerError,
  } = useGetManagerDetailOrderQuery(orderNumber!, {
    skip: !isManager || isError || isRated,
    pollingInterval: 5000,
  });

  useEffect(() => {
    const currentOrder = isManager ? managerOrder : order;
    isManager && currentOrder && setViewed({ id: currentOrder?.id, isViewedByManager: true });

    if (currentOrder) {
      setIsDelivered(currentOrder.status === 'delivered');
      setIsRated(!!currentOrder.rating);
      setIsOrderAccepted(currentOrder.status !== 'created');
      setCurrentOrder(currentOrder);
    }
  }, [managerOrder, order]);

  useEffect(() => {
    const currentError = isManager ? managerError : error;
    if (currentError) {
      const err = currentError as IResponseError;
      setIsError(true);
      errorMixin({ title: err?.data.message })
        .fire()
        .finally(() => navigate(ROUTES.ordersPage));
    }
  }, [error, managerError]);

  useEffect(() => {
    isCanceled && navigate(ROUTES.ordersPage);
  }, [isCanceled]);

  const cancelOrder = async (id: string) => {
    const { isConfirmed } = await swal.fire(swalConfig);

    if (isConfirmed) {
      await trackPromise(cancel({ id }).unwrap(), PROMISES_AREA.cancelOrder);
      successMixin({ title: 'Order has been canceled' }).fire();
    }
  };

  const acceptOrder = async (id: string) => {
    await trackPromise(accept({ id, status: 'ready' }).unwrap(), PROMISES_AREA.acceptOrder);
    setIsOrderAccepted(true);
    successMixin({ title: 'Order has been accepted' }).fire();
  };

  const closeOrder = async (id: string) => {
    await trackPromise(close({ id, status: 'delivered' }).unwrap(), PROMISES_AREA.closeOrder);
    setIsOrderAccepted(true);
    successMixin({ title: 'Order has been closed' }).fire();
  };

  const onOrderAgain = () => {
    navigate(ROUTES.orderPage, { state: order });
  };

  const onCancelClick = (id: string) => () => cancelOrder(id);
  const onAcceptOrder = (id: string) => () => acceptOrder(id);
  const onCloseOrder = (id: string) => () => closeOrder(id);

  useEffect(() => () => swal.close(), []);

  return {
    isOrderAccepted,
    currentOrder,
    isLoading,
    isManager,
    isManagerOrderLoading,
    isDelivered,
    onCancelClick,
    onAcceptOrder,
    onOrderAgain,
    onCloseOrder,
  };
};
