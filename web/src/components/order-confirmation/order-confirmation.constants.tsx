import { SweetAlertOptions } from 'sweetalert2';

import { IOrderedMenu, IOrderedProduct } from '@store/reducers/cart/cart.typings';
import { IMenu, IProduct, IUserDetailOrderResponse } from 'typings/api';
import { StyledOrderConfirmation as Styled } from './order-confirmation.styles';

export const swalConfig: SweetAlertOptions = {
  title: <Styled.OrderSuccess>Thank you for an order!</Styled.OrderSuccess>,
  customClass: {
    popup: 'popup-container',
    confirmButton: 'add-order',
  },
  confirmButtonText: 'to main page',
};

interface IReturnGetNewItems {
  newProducts: IOrderedProduct[];
  newMenus: IOrderedMenu[];
}

export const getNewItems = (
  products: IOrderedProduct[],
  menus: IOrderedMenu[],
  isCartWithItems: boolean,
  isOneItem: boolean,
  isOldOrder: boolean,
  oldOrder: IUserDetailOrderResponse
): IReturnGetNewItems => {
  let newProducts = [] as IOrderedProduct[];
  let newMenus = [] as IOrderedMenu[];
  if (isOneItem) {
    newProducts = [];
    newMenus = [];
  } else if (isOldOrder) {
    newProducts = [...oldOrder?.productsOrders];
    newMenus = [...oldOrder?.menusOrders];
  } else if (isCartWithItems) {
    newProducts = [...products];
    newMenus = [...menus];
  }
  return { newProducts, newMenus };
};

export const getOrderedItems = (
  isItemExist: boolean,
  item: IMenu | IProduct | null,
  products: IOrderedProduct[],
  menus: IOrderedMenu[]
) => {
  const isItemFromMainPageProduct = item && 'weight' in item;

  if (isItemExist && isItemFromMainPageProduct) {
    products.push({
      count: 1,
      product: item as IProduct,
    });
  } else if (isItemExist && !isItemFromMainPageProduct) {
    menus.push({
      count: 1,
      menu: item as IMenu,
    });
  }

  const productsOrders = products.map((product) => ({
    count: product.count,
    productId: product.product.id,
  }));

  const menusOrders = menus.map((menu) => ({
    count: menu.count,
    menuId: menu.menu.id,
  }));

  const menusTotalPrice = menus.reduce((prev, curr) => prev + curr.count * curr.menu.price, 0);
  const productsTotalPrice = products.reduce((prev, curr) => prev + curr.count * curr.product.price, 0);

  return {
    productsOrders,
    menusOrders,
    itemPrice: menusTotalPrice + productsTotalPrice,
  };
};
