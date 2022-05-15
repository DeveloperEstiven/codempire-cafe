import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { useLazyGetProductQuery, useUpdateProductMutation } from '@services/main-page-api';
import { IProduct, IResponseError, IUpdateProduct } from 'typings/api';
import { EditProductForm } from './edit-product-form';
import { THandleEditProduct } from './edit-product-form/edit-product-form.typings';
import { IEditProductProps } from './edit-product.typings';

export const EditProduct: React.FC = () => {
  const { state } = useLocation() as IEditProductProps;
  const navigate = useNavigate();
  const { productId } = useParams();

  const [updateProduct, { error }] = useUpdateProductMutation();
  const [getProduct, { data: receivedProduct, error: productNotFound }] = useLazyGetProductQuery();
  const [product, setProduct] = useState<IProduct>();
  const { deletedProductId } = useAppSelector((store) => store.mainPage);

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  useEffect(() => {
    if (receivedProduct) {
      setProduct(receivedProduct);
    }
  }, [receivedProduct]);

  useEffect(() => {
    productNotFound && navigate(ROUTES.mainPage);
  }, [productNotFound]);

  useEffect(() => {
    if (!state) {
      productId && !deletedProductId ? getProduct(productId) : navigate(ROUTES.mainPage);
    }
  }, [state]);

  const onEditProduct: THandleEditProduct = async (newProduct) => {
    await trackPromise(updateProduct(newProduct as IUpdateProduct).unwrap(), PROMISES_AREA.updateProduct);
    successMixin({ title: `${newProduct.name} has been successfully updated` }).fire();
    navigate(ROUTES.mainPage);
  };

  return (
    <>{(state || product) && <EditProductForm onEditProduct={onEditProduct} product={state?.item || product} />}</>
  );
};
