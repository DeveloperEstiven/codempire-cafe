import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetAllIngredientsQuery } from '@services/main-page-api';
import {
    productCategoryReceived, productDescriptionReceived, productImageReceived,
    productIngredientsReceived, productIsNewSubcategoryVisibleReceived, productNameReceived,
    productNewSubcategoryValueReceived, productPriceReceived, productWeightReceived
} from '@store/reducers/edit-item';
import { transformToDropdownData } from '@utils/arrayToDropdownData';
import { TInputEvent } from 'typings/api';
import { editProductValidationSchema, getInitialValues } from './edit-product-form.constants';
import {
    IEditProductForm, IEditProductFormProps, TCategories, THandleEditProductSubmit
} from './edit-product-form.typings';

export const useEditProductForm = ({ onEditProduct, product }: IEditProductFormProps) => {
  const persistedFields = useAppSelector((store) => store.editItem.product);
  const { data: receivedIngredients } = useGetAllIngredientsQuery();
  const { categories: receivedCategories } = useAppSelector((store) => store.mainPage);

  const currentCategory = persistedFields.category || (product?.category as TCategories) || 'food';
  const [selectedCategory, setSelectedCategory] = useState<TCategories>(currentCategory);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isChangeImageOpen, setIsChangeImageOpen] = useState(false);
  const [ingredients, setIngredients] = useState<IDropdownData[]>([]);
  const [subcategories, setSubcategories] = useState(receivedCategories);
  const [newSubcategory, setNewSubcategory] = useState(persistedFields.newSubcategoryValue);
  const [isNewSubcategoryVisible, setIsNewSubcategoryVisible] = useState(persistedFields.isNewSubcategoryVisible);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const beforeSubmit: THandleEditProductSubmit = (values, actions) => {
    const { ingredients, ...newValues } = values;

    const ingredientIds = receivedIngredients!
      .filter(({ name }) => name === ingredients.find(({ value }) => value === name)?.value)
      .map((ingredient) => ingredient.id);

    const newProduct = {
      ...newValues,
      ingredientIds,
      weight: values.weight.replace(' ', ''),
      image: values.image.split(';base64,')[1],
      price: parseInt(values.price.replace(' ', '')),
      subcategory: values.subcategory.value,
      category: selectedCategory,
    };

    onEditProduct(product ? { ...newProduct, id: product.id } : newProduct, actions);
  };

  const formik = useFormik<IEditProductForm>({
    initialValues: getInitialValues(subcategories, selectedCategory, persistedFields, product),
    validationSchema: editProductValidationSchema,
    onSubmit: beforeSubmit,
  });

  useEffect(() => {
    if (receivedIngredients) {
      setIngredients(transformToDropdownData(receivedIngredients));

      if (formik.values.ingredients.length) {
        const currentIngredients = receivedIngredients.filter(
          ({ name }) => name === formik.values.ingredients.find(({ value }) => value === name)?.value
        );
        const updatedIngredients = transformToDropdownData(currentIngredients);
        formik.setFieldValue('ingredients', updatedIngredients);

        if (!updatedIngredients.length) {
          navigate(ROUTES.mainPage);
        }
      }
    }
  }, [receivedIngredients]);

  const handleIsRadioSelected = (value: string) => selectedCategory === value;
  const handleRadioCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue('subcategory', { value: '', label: '' });
    dispatch(productCategoryReceived(e.target.value as TCategories));
    setSelectedCategory(e.target.value as TCategories);
  };

  const onChangeNewSubcategory = (e: TInputEvent) => {
    setNewSubcategory(e.target.value);
    dispatch(productNewSubcategoryValueReceived(e.target.value));
  };

  const toggleNewSubcategory = () => {
    setIsNewSubcategoryVisible((prev) => {
      dispatch(productIsNewSubcategoryVisibleReceived(!prev));
      return !prev;
    });
  };

  const onAddNewSubcategory = () => {
    setSubcategories((prev) => ({
      ...prev,
      [selectedCategory]: subcategories[selectedCategory]
        ? [...prev[selectedCategory], newSubcategory]
        : [newSubcategory],
    }));
    setNewSubcategory('');
  };

  const onChangeImageClick = () => setIsChangeImageOpen(true);
  const onChangeImageClose = () => setIsChangeImageOpen(false);

  const onCloseRemoveModal = () => setIsRemoveModalOpen(false);
  const onDeleteClick = async () => setIsRemoveModalOpen(true);

  const onAddNewIngredients = () => navigate(ROUTES.productCompositions);

  const getValue = (e: TInputEvent) => {
    formik.handleChange(e);
    return e.target.value;
  };

  const onNameChange = (e: TInputEvent) => dispatch(productNameReceived(getValue(e)));
  const onDescriptionChange = (e: TInputEvent) => dispatch(productDescriptionReceived(getValue(e)));
  const onPriceChange = (e: TInputEvent) => dispatch(productPriceReceived(getValue(e)));
  const onWeightChange = (e: TInputEvent) => dispatch(productWeightReceived(getValue(e)));

  const onIngredientsChange = (ingredients: IDropdownData[]) => {
    dispatch(productIngredientsReceived(ingredients));
    formik.setFieldValue('ingredients', ingredients);
  };

  const onImageChange = (b64: string) => {
    dispatch(productImageReceived(b64));
    formik.setFieldValue('image', b64);
  };

  return {
    formik,
    value: {
      ingredients,
      newSubcategory,
      isRemoveModalOpen,
      isChangeImageOpen,
      isNewSubcategoryVisible,
      subcategories,
      selectedCategory,
    },
    handler: {
      handleIsRadioSelected,
      handleRadioCheck,
      onDeleteClick,
      onChangeImageClick,
      onChangeImageClose,
      onCloseRemoveModal,
      onAddNewSubcategory,
      onNameChange,
      onAddNewIngredients,
      onDescriptionChange,
      onPriceChange,
      onWeightChange,
      onIngredientsChange,
      onChangeNewSubcategory,
      onImageChange,
    },
    func: {
      toggleNewSubcategory,
    },
  };
};
