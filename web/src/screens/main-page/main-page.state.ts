import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useNavigate } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useAddProductMutation } from '@services/main-page-api';
import { clearEditItemState } from '@store/reducers/edit-item';
import { selectedTabReceived } from '@store/reducers/main-page';
import { hideScrollBar } from '@utils/scrollbar';
import { IResponseError, IUpdateProduct } from 'typings/api';
import { IMainPageState, TSelectedType } from './main-page.typings';

export const useMainPage = () => {
  const { state } = useLocation() as IMainPageState;
  const { selectedTab } = useAppSelector((store) => store.mainPage);
  const [selectedType, setSelectedType] = useState<TSelectedType>(state?.tab || selectedTab);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [createProduct, { error: productError }] = useAddProductMutation();
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearEditItemState());
  }, []);

  const onTypeSelect = (type: string) => {
    dispatch(selectedTabReceived(type as TSelectedType));
    setSelectedType(type as TSelectedType);
  };

  const onFilterClick = () => {
    hideScrollBar();
    setIsFilterActive(true);
  };

  const onAddItemClick = () => {
    selectedType === 'product' ? navigate(ROUTES.addProduct) : navigate(ROUTES.addMenu);
  };

  const onCloseAddProduct = () => {
    setIsAddProductModalOpen(false);
  };

  useEffect(() => {
    if (productError) {
      const err = productError as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [productError]);

  const addProduct = async (values: IUpdateProduct) => {
    const { id, ...newProduct } = values;
    await trackPromise(createProduct(newProduct).unwrap(), PROMISES_AREA.updateProduct);
    setIsAddProductModalOpen(false);
    successMixin({ title: 'The product has been successfully added' }).fire();
  };

  return {
    selectedType,
    isFilterActive,
    setIsFilterActive,
    onFilterClick,
    onTypeSelect,
    onAddItemClick,
    isAddProductModalOpen,
    addProduct,
    onCloseAddProduct,
    isManager,
  };
};
