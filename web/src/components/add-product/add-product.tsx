import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useNavigate } from 'react-router-dom';

import { EditProductForm } from '@components/edit-product/edit-product-form';
import {
    THandleEditProduct
} from '@components/edit-product/edit-product-form/edit-product-form.typings';
import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAddProductMutation } from '@services/main-page-api';
import { IResponseError, TAddProduct } from 'typings/api';

export const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [addProduct, { error }] = useAddProductMutation();

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const onAddProduct: THandleEditProduct = async (newProduct: TAddProduct) => {
    await trackPromise(addProduct(newProduct).unwrap(), PROMISES_AREA.updateProduct);
    successMixin({ title: `${newProduct.name} has been successfully added` }).fire();
    navigate(ROUTES.mainPage);
  };

  return <EditProductForm onEditProduct={onAddProduct} />;
};
