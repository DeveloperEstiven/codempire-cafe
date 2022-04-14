export enum PRODUCT_CATEGORY {
  drink = 'drink',
  food = 'food',
}

export const PRODUCT_ROUTES = {
  main: 'product',
  addProduct: 'add-product',
  getAllProducts: 'get-all-products',
  updateProduct: 'update-product',
  removeProduct: 'remove-product',
};

export const PRODUCT_ERRORS = {
  notFound: 'This product was not found.',
  alreadyExist: 'This product already exists',
};
