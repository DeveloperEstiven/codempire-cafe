import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';

import { errorMixin, successMixin } from '@constants/pop-up-messages';
import { PROMISES_AREA } from '@constants/promises-area';
import { useAddIngredientMutation } from '@services/main-page-api';
import { ICreateIngredient, IResponseError, TInputEvent } from 'typings/api';

export const useAddIngredientModal = (onCloseAddModal: () => void) => {
  const [addIngredient, { error }] = useAddIngredientMutation();

  const [newIngredientValue, setNewIngredientValue] = useState('');
  const [isAllergen, setIsAllergen] = useState(false);

  const onChangeNewIngredientValue = (e: TInputEvent) => {
    setNewIngredientValue(e.target.value);
  };

  useEffect(() => {
    if (error) {
      const err = error as IResponseError;
      errorMixin({ title: err.data.message }).fire();
    }
  }, [error]);

  const createIngredient = async () => {
    const newIngredient: ICreateIngredient = {
      name: newIngredientValue,
      isAllergen,
    };

    await trackPromise(addIngredient(newIngredient).unwrap(), PROMISES_AREA.addIngredient);
    successMixin({ title: `ingredient ${newIngredientValue} added successfully` }).fire();
    setNewIngredientValue('');
    setIsAllergen(false);
    onCloseAddModal();
  };

  const handleCheckIsAllergen = () => {
    setIsAllergen((prev) => !prev);
  };

  return { newIngredientValue, onChangeNewIngredientValue, handleCheckIsAllergen, isAllergen, createIngredient };
};
