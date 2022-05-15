import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addItem, increment } from '@store/reducers/cart';
import { IMenu, IProduct } from 'typings/api';

export const useItemCard = (item: IMenu | IProduct) => {
  const { name, description, price, image } = item;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  useEffect(() => () => Swal.close(), []);
  const [isProductItemOpen, setIsProductItemOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const isProduct = 'weight' in item;
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';

  const onCloseProductItem = () => {
    setIsProductItemOpen(false);
  };

  const onOpenProductItem = () => {
    setIsProductItemOpen(true);
  };

  const onDeleteClick = async () => {
    setIsRemoveModalOpen(true);
  };

  const onCloseRemoveItem = async () => {
    setIsRemoveModalOpen(false);
  };

  const onEditClick = () => {
    navigate(`${isProduct ? ROUTES.editProduct : ROUTES.editMenu}/${item.id}`, {
      state: {
        item,
      },
    });
  };

  const onAddToCart = () => {
    if (!isProductExistsInCart && !isMenuExistsInCart) {
      return dispatch(addItem(item));
    }
    const productCount = cart.products.find(({ product }) => product.id === item.id)?.count;
    const menuCount = cart.menus.find(({ menu }) => menu.id === item.id)?.count;
    const count = productCount || menuCount;

    if (count && count >= 10) {
      return Swal.mixin({
        toast: true,
        showConfirmButton: false,
        position: 'top-end',
        icon: 'error',
        title: `you can add a maximum of 10 identical items`,
        timer: 1500,
      }).fire();
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
  const weight = isProduct ? item.weight : null;

  return {
    name,
    image,
    description,
    weight,
    price,
    isManager,
    onAddToCart,
    isProductItemOpen,
    isRemoveModalOpen,
    onCloseProductItem,
    onOpenProductItem,
    onDeleteClick,
    onCloseRemoveItem,
    onEditClick,
  };
};
