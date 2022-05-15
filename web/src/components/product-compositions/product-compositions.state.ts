import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

import { successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import {
    useGetAllIngredientsQuery, useLazyCheckIngredientIsInProductQuery, useRemoveIngredientMutation
} from '@services/main-page-api';
import { IIngredient, IProduct } from 'typings/api';

export const useProductCompositions = () => {
  const { data: receivedIngredients, isLoading: isIngredientsLoading } = useGetAllIngredientsQuery();
  const [ingredients, setIngredients] = useState<IIngredient[]>();
  const [removeIngredient] = useRemoveIngredientMutation();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [removedIngredient, setRemovedIngredient] = useState<IIngredient>({} as IIngredient);
  const [checkProductsWithIngredient, { data: receivedProductsWithIngredient }] =
    useLazyCheckIngredientIsInProductQuery();
  const [productsWithIngredient, setProductsWithIngredient] = useState<IProduct[]>([]);

  useEffect(() => {
    if (receivedIngredients) {
      setIngredients(receivedIngredients);
    }
  }, [receivedIngredients]);

  useEffect(() => {
    if (receivedProductsWithIngredient) {
      setProductsWithIngredient(receivedProductsWithIngredient);
    }
  }, [receivedProductsWithIngredient]);

  const onAddIngredient = () => {
    setIsAddModalOpen(true);
  };

  const onRemoveIngredientClick = (ingredient: IIngredient) => async () => {
    ingredient.id !== removedIngredient.id && setProductsWithIngredient([]);
    setRemovedIngredient(ingredient);
    setIsRemoveModalOpen(true);
    await trackPromise(checkProductsWithIngredient(ingredient.id).unwrap(), PROMISES_AREA.removeIngredient);
  };

  const onRemoveIngredient = async () => {
    await trackPromise(removeIngredient({ id: removedIngredient.id }).unwrap(), PROMISES_AREA.removeIngredient);
    successMixin({ title: `${removedIngredient.name} has been deleted` }).fire();
    setIsRemoveModalOpen(false);
    setIngredients((prev) => prev?.filter((i) => i.id !== removedIngredient.id));
    setRemovedIngredient({} as IIngredient);
  };

  const onCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const onCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  return {
    isIngredientsLoading,
    isRemoveModalOpen,
    onCloseRemoveModal,
    onRemoveIngredient,
    productsWithIngredient,
    removedIngredient,
    onCloseAddModal,
    isAddModalOpen,
    onAddIngredient,
    ingredients,
    onRemoveIngredientClick,
  };
};
