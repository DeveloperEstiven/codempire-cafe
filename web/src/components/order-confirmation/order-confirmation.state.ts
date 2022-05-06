import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { errorMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useAddOrderMutation } from '@services/order-api';
import { clearCart } from '@store/reducers/cart';
import { clearOrderState } from '@store/reducers/order';
import { IAddOrder, IResponseError, IUserDetailOrderResponse, IUserOrder } from 'typings/api';
import { getNewItems, getOrderedItems, swalConfig } from './order-confirmation.constants';
import { IOrderConfirmationProps } from './order-confirmation.typings';

const swal = withReactContent(Swal);

export const useOrderConfirmation = () => {
  const navigate = useNavigate();
  const {
    totalPrice,
    cart: { products, menus },
  } = useAppSelector((store) => store.cart);

  const { user } = useAppSelector((store) => store.user);
  const { state, pathname } = useLocation();
  const props = state as IOrderConfirmationProps | IUserDetailOrderResponse;
  const oldOrder = state as IUserDetailOrderResponse;
  const [addOrder, { error }] = useAddOrderMutation();
  const dispatch = useAppDispatch();

  const isPropsExists = !!state;
  const isOneItem = !!props && 'item' in props && !!props?.item;
  const isOldOrder = !!props && 'orderNumber' in oldOrder;
  const isCartWithItems = !!totalPrice;

  useEffect(() => {
    if (!isPropsExists && (!isCartWithItems || !isOneItem)) {
      navigate(ROUTES.cart);
    }
  }, []);

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  useEffect(() => () => swal.close(), []);

  const { newProducts, newMenus } = getNewItems(products, menus, isCartWithItems, isOneItem, isOldOrder, oldOrder);

  const oldOrderPrice = oldOrder?.price;

  const { itemPrice, productsOrders, menusOrders } = getOrderedItems(
    isOneItem,
    isOneItem ? props?.item : null,
    newProducts,
    newMenus
  );

  const detailOrder: IUserOrder = {
    address: props?.address,
    comment: props?.comment,
    wantedDeliveryDate: props?.wantedDeliveryDate.toString(),
    price: isOneItem ? itemPrice : oldOrderPrice || totalPrice,
    productsOrders: newProducts,
    menusOrders: newMenus,
    user,
  };

  const onOrder = async () => {
    const addOrderResult: IAddOrder = {
      addressId: props.address?.id,
      wantedDeliveryDate: props.wantedDeliveryDate,
      comment: props.comment,
      productsOrders,
      menusOrders,
    };

    await trackPromise(addOrder(addOrderResult as IAddOrder).unwrap(), PROMISES_AREA.addOrder);
    await swal.fire(swalConfig);
    navigate(pathname, { state: null }); //clear history state
    navigate(ROUTES.mainPage);
    dispatch(clearOrderState());
    !isOneItem && !isOldOrder && dispatch(clearCart());
  };

  return {
    isPropsExists,
    isCartWithItems,
    isOneItem,
    detailOrder,
    onOrder,
  };
};
