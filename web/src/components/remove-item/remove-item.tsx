import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { RemoveItemModal } from '@components/remove-item-modal';
import { errorMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppDispatch } from '@hooks/redux';
import {
    useCheckProductIsInMenuQuery, useDeleteMenuMutation, useDeleteProductMutation
} from '@services/main-page-api';
import { deletedMenuIdReceived, deletedProductIdReceived } from '@store/reducers/main-page';
import { IMenu, IResponseError } from 'typings/api';
import { IRemoveItemProps } from './remove-item.typings';

export const RemoveItem: React.FC<IRemoveItemProps> = ({ isOpen, item, onClose }) => {
  const isProduct = 'weight' in item;
  const [menusWithProduct, setMenusWithProduct] = useState<IMenu[]>([]);
  const [removeProduct, { data: removedProduct, error: productError }] = useDeleteProductMutation();
  const [removeMenu, { data: removedMenu, error: menuError }] = useDeleteMenuMutation();
  const { data: receivedMenusWithProduct } = useCheckProductIsInMenuQuery(item.id, {
    skip: !isProduct,
  });
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (receivedMenusWithProduct) {
      setMenusWithProduct(receivedMenusWithProduct);
    }
  }, [receivedMenusWithProduct]);

  useEffect(() => {
    const currentError = productError || menuError;
    if (currentError) {
      const err = currentError as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [productError, menuError]);

  useEffect(() => {
    if (removedProduct) {
      dispatch(deletedProductIdReceived(removedProduct!.id));
      navigate(`${ROUTES.editProduct}/${removedProduct.id}`, { state: null });
    } else if (removedMenu) {
      dispatch(deletedMenuIdReceived(removedMenu!.id));
      navigate(`${ROUTES.editMenu}/${removedMenu.id}`, { state: null });
    }
    return () => {
      onClose();
    };
  }, [removedProduct, removedMenu]);

  const deleteItem = async () => {
    if (isProduct) {
      await trackPromise(removeProduct(item.id).unwrap(), PROMISES_AREA.removeProduct);
    } else {
      await trackPromise(removeMenu(item.id).unwrap(), PROMISES_AREA.removeMenu);
    }
  };

  return (
    <RemoveItemModal
      text="Delete"
      isOpen={isOpen}
      onDelete={deleteItem}
      onClose={onClose}
      area={isProduct ? PROMISES_AREA.removeProduct : PROMISES_AREA.removeMenu}
      item={item}
      items={menusWithProduct}
    />
  );
};
