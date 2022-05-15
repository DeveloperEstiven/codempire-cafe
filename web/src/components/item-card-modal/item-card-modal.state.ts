import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { IMenu, IProduct } from 'typings/api';
import { getMenuInfo, getProductInfo } from './item-card-modal.constants';

export const useItemCardModal = (item: IMenu | IProduct) => {
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';
  const isProduct = 'weight' in item;

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const navigate = useNavigate();

  const onCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const onDeleteClick = async () => {
    setIsRemoveModalOpen(true);
  };

  const weight = isProduct && item.weight;
  const [names, allergenNames] = isProduct ? getProductInfo(item) : getMenuInfo(item);
  const isProductEditing = isEditingModalOpen && isProduct;

  const onEditingItemClose = () => {
    setIsEditingModalOpen(false);
  };

  const onEditClick = () => {
    navigate(`${isProduct ? ROUTES.editProduct : ROUTES.editMenu}/${item.id}`, {
      state: {
        item,
      },
    });
  };

  const onOrderClick = async () => {
    navigate(ROUTES.orderPage, { state: item });
  };

  return {
    isProductEditing,
    isEditingModalOpen,
    isRemoveModalOpen,
    isManager,
    isProduct,
    names,
    allergenNames,
    weight,
    onOrderClick,
    onEditingItemClose,
    onCloseRemoveModal,
    onEditClick,
    onDeleteClick,
  };
};
