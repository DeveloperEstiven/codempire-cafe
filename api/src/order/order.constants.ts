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
  getOrders: 'get-orders',
  getAllOrders: 'get-all-orders',
  getManagerDetailOrder: 'get-manager-detail-order',
  getCompleted: 'get-completed',
};

export const ORDER_ERRORS = {
  notFound: 'This order was not found',
  addressNotFound: 'This user does not have this address',
};
