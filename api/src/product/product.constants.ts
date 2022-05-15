export enum PRODUCT_CATEGORY {
  drink = 'drink',
  food = 'food',
}

export const PRODUCT_ROUTES = {
  main: 'product',
  addProduct: 'add-product',
  getProductCategories: 'get-product-categories',
  getProducts: 'get-products',
  getAllProducts: 'get-all-products',
  getProduct: 'get-product',
  updateProduct: 'update-product',
  removeProduct: 'remove-product',
  checkProductContains: 'check-product-contains',
};

export const PRODUCT_ERRORS = {
  notFound: 'This product was not found.',
  alreadyExist: 'Product with this name already exists',
};
