export enum DELIVERY_STATUS {
  created = 'created',
  ready = 'ready',
  onWay = 'on way',
  delivered = 'delivered',
}

export const ORDER_ROUTES = {
  main: 'order',
  addOrder: 'add-order',
  updateOrder: 'update-order',
  cancelOrder: 'cancel-order',
};

export const ORDER_ERRORS = {
  notFound: 'This order was not found',
};
