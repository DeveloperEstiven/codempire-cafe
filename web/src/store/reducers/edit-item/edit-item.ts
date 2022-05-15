import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { TCategories } from '@components/edit-product/edit-product-form/edit-product-form.typings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { editItemInitialState } from './edit-item.constants';

export const editItemSlice = createSlice({
  name: 'editItem',
  initialState: editItemInitialState,
  reducers: {
    productImageReceived(state, action: PayloadAction<string>) {
      state.product.image = action.payload;
    },
    productNameReceived(state, action: PayloadAction<string>) {
      state.product.name = action.payload;
    },
    productWeightReceived(state, action: PayloadAction<string>) {
      state.product.weight = action.payload;
    },
    productDescriptionReceived(state, action: PayloadAction<string>) {
      state.product.description = action.payload;
    },
    productPriceReceived(state, action: PayloadAction<string>) {
      state.product.price = action.payload;
    },
    productCategoryReceived(state, action: PayloadAction<TCategories>) {
      state.product.category = action.payload;
    },
    productIngredientsReceived(state, action: PayloadAction<IDropdownData[]>) {
      state.product.ingredients = action.payload;
    },
    productNewSubcategoryValueReceived(state, action: PayloadAction<string>) {
      state.product.newSubcategoryValue = action.payload;
    },
    productIsNewSubcategoryVisibleReceived(state, action: PayloadAction<boolean>) {
      state.product.isNewSubcategoryVisible = action.payload;
    },

    menuImageReceived(state, action: PayloadAction<string>) {
      state.menu.image = action.payload;
    },
    menuNameReceived(state, action: PayloadAction<string>) {
      state.menu.name = action.payload;
    },
    menuDescriptionReceived(state, action: PayloadAction<string>) {
      state.menu.description = action.payload;
    },
    menuPriceReceived(state, action: PayloadAction<string>) {
      state.menu.price = action.payload;
    },
    menuProductsReceived(state, action: PayloadAction<IDropdownData[]>) {
      state.menu.products = action.payload;
    },

    clearEditItemState() {
      return editItemInitialState;
    },
  },
});
const { actions, reducer } = editItemSlice;
export const {
  productImageReceived,
  productNameReceived,
  productWeightReceived,
  productDescriptionReceived,
  productPriceReceived,
  productCategoryReceived,
  productIngredientsReceived,
  productNewSubcategoryValueReceived,
  productIsNewSubcategoryVisibleReceived,

  menuImageReceived,
  menuNameReceived,
  menuDescriptionReceived,
  menuPriceReceived,
  menuProductsReceived,

  clearEditItemState,
} = actions;
export { reducer as editItemReducer };
