import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addItem, increment } from '@store/reducers/cart';
import { IMenu, IProduct } from 'typings/api';
import { itemCardConfig } from './item-card.constants';

export const useItemCard = (item: IMenu | IProduct) => {
  const { name, description, price, image } = item;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  useEffect(() => () => Swal.close(), []);

  const onExpandCard = async () => {
    const { isConfirmed } = await Swal.fire(itemCardConfig(item));
    isConfirmed && navigate(ROUTES.orderPage, { state: item });
  };

  const onAddToCart = () => {
    if (!isProductExistsInCart && !isMenuExistsInCart) {
      return dispatch(addItem(item));
    }
    Swal.mixin({
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      icon: 'info',
      title: `increased ${item.name} cart quantity`,
      timer: 1500,
    }).fire();
    dispatch(increment({ id: item.id }));
  };

  const isProductExistsInCart = cart.products?.some(({ product }) => product?.id === item.id);
  const isMenuExistsInCart = cart.menus?.some(({ menu }) => menu?.id === item.id);
  const weight = 'weight' in item ? item.weight : null;

  return {
    onExpandCard,
    name,
    image,
    description,
    weight,
    price,
    onAddToCart,
  };
};
