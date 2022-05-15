import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetAllProductsQuery } from '@services/main-page-api';
import {
    menuDescriptionReceived, menuImageReceived, menuNameReceived, menuPriceReceived,
    menuProductsReceived
} from '@store/reducers/edit-item';
import { transformToDropdownData } from '@utils/arrayToDropdownData';
import { TInputEvent } from 'typings/api';
import { editMenuValidationSchema, getInitialValues } from './edit-menu-form.constants';
import { IEditMenuForm, IEditMenuFormProps, THandleEditMenuSubmit } from './edit-menu-form.typings';

export const useEditMenuForm = ({ onEditMenu, menu }: IEditMenuFormProps) => {
  const persistedFields = useAppSelector((store) => store.editItem.menu);
  const { data: receivedProducts } = useGetAllProductsQuery();

  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isChangeImageOpen, setIsChangeImageOpen] = useState(false);
  const [products, setProducts] = useState<IDropdownData[]>([]);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const beforeSubmit: THandleEditMenuSubmit = (values, actions) => {
    const { products, ...newValues } = values;

    const productIds = receivedProducts!
      .filter(({ name }) => name === products.find(({ value }) => value === name)?.value)
      .map((product) => product.id);

    const newMenu = {
      ...newValues,
      productIds,
      image: values.image.split(';base64,')[1],
      price: parseInt(values.price.replace(' ', '')),
    };

    onEditMenu(menu ? { ...newMenu, id: menu.id } : newMenu, actions);
  };

  const formik = useFormik<IEditMenuForm>({
    initialValues: getInitialValues(persistedFields, menu),
    validationSchema: editMenuValidationSchema,
    onSubmit: beforeSubmit,
  });

  useEffect(() => {
    if (receivedProducts) {
      setProducts(transformToDropdownData(receivedProducts));

      if (formik.values.products.length) {
        const currentProducts = receivedProducts.filter(
          ({ name }) => name === formik.values.products.find(({ value }) => value === name)?.value
        );
        const updatedProducts = transformToDropdownData(currentProducts);
        formik.setFieldValue('products', updatedProducts);

        if (!updatedProducts.length) {
          navigate(ROUTES.mainPage);
        }
      }
    }
  }, [receivedProducts]);

  const onChangeImageClick = () => setIsChangeImageOpen(true);
  const onChangeImageClose = () => setIsChangeImageOpen(false);

  const onCloseRemoveModal = () => setIsRemoveModalOpen(false);
  const onDeleteClick = async () => setIsRemoveModalOpen(true);

  const getValue = (e: TInputEvent) => {
    formik.handleChange(e);
    return e.target.value;
  };

  const onNameChange = (e: TInputEvent) => dispatch(menuNameReceived(getValue(e)));
  const onDescriptionChange = (e: TInputEvent) => dispatch(menuDescriptionReceived(getValue(e)));
  const onPriceChange = (e: TInputEvent) => dispatch(menuPriceReceived(getValue(e)));

  const onProductsChange = (products: IDropdownData[]) => {
    dispatch(menuProductsReceived(products));
    formik.setFieldValue('products', products);
  };

  const onImageChange = (b64: string) => {
    dispatch(menuImageReceived(b64));
    formik.setFieldValue('image', b64);
  };

  return {
    formik,
    value: {
      products,
      isRemoveModalOpen,
      isChangeImageOpen,
    },
    handler: {
      onDeleteClick,
      onChangeImageClick,
      onChangeImageClose,
      onCloseRemoveModal,
      onNameChange,
      onDescriptionChange,
      onPriceChange,
      onProductsChange,
      onImageChange,
    },
  };
};
