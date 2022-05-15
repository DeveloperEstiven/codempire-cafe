import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { TIcon } from '@components/icon';
import { radioButtons } from '@screens/order-page/order-page-form/order-page-form.constants';
import { IUserPublic } from '@services/user-api/user-api.typings';

export interface IEditProfile extends IUserPublic {
  logo: string;
}

export interface IAddAddresses {
  addresses: IAddAddress[];
}

export interface IUser extends IEditProfile {
  id: string;
  publicKey: string;
  role: TRole;
  addresses: IAddress[];
}

interface IAddAddress {
  address: string;
  isActive: boolean;
}

interface IAddress extends IAddAddress {
  id: string;
}

export interface IError {
  message?: string;
  code?: number;
}
export interface IResponseError {
  status: number;
  data: IError;
}

export type TInputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export type TRole = 'user' | 'manager';

export interface IResponse<T> {
  items: T[];
  meta: IMeta;
}

export interface IMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface IMenuProductCommon {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface IMenu extends IMenuProductCommon {
  products?: IProduct[];
}

export interface IProduct extends IMenuProductCommon {
  category: string;
  subcategory: string;
  weight: string;
  ingredients?: IIngredient[];
}

export interface IUpdateProduct extends IMenuProductCommon {
  weight: string;
  ingredientIds: string[];
  category: string;
  subcategory: string;
}

export interface IUpdateMenu extends IMenuProductCommon {
  productIds: string[];
}

export type TAddProduct = Omit<IUpdateProduct, 'id'>;

export type TAddMenu = Omit<IUpdateMenu, 'id'>;

export interface IIngredient extends ICreateIngredient {
  id: string;
}

export interface ICreateIngredient {
  name: string;
  isAllergen: boolean;
}

export interface IPaginateBody {
  filter: IFilter;
  queries: IPaginateQuery;
}
export interface IPaginateQuery {
  page?: number;
  limit?: number;
}
export interface IFilter {
  subcategories?: array[];
  term?: string;
  sort?: Omit<ISort, 'label', 'value'>;
}
export interface ICategories {
  [key: string]: string[];
}
export interface ISort extends IDropdownData {
  field: string;
  order: 'ASC' | 'DESC';
  icon?: TIcon;
}

export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface IOrder {
  id: string;
  count: number;
}

export interface IProductOrder extends IOrder {
  product: Omit<IProduct, 'ingredients'>;
}

export interface IMenuOrder extends IOrder {
  menu: IMenuProductCommon;
}

export type TDeliveryStatus = 'created' | 'ready' | 'on way' | 'delivered';

export interface IUserOrderResponse {
  id: string;
  address: IAddress;
  orderNumber: number;
  date: string;
  isViewedByUser: boolean;
  isViewedByManager: boolean;
  wantedDeliveryDate: string;
  status: TDeliveryStatus;
  price: number;
  comment: string;
  description: string;
  user: IUser;
  rating: number | null;
  customerFeedback: string;
}

export type TUpdateOrderResponse = Omit<IUserOrderResponse, 'user' | 'address'>;

export interface IUserOrder {
  address: IAddress;
  wantedDeliveryDate: string;
  price: number;
  comment: string;
  user: IUser;
  productsOrders?: IOrderedProduct[];
  menusOrders?: IOrderedMenu[];
}

export interface IAddOrder {
  comment: string;
  addressId: string;
  wantedDeliveryDate: Date | string;
  productsOrders: { productId: string; count: number }[];
  menusOrders: { menuId: string; count: number }[];
}

export interface IUserDetailOrderResponse extends IUserOrderResponse {
  productsOrders: IProductOrder[];
  menusOrders: IMenuOrder[];
}

export interface IGroupOrders {
  waitingOrders?: IOrderGroup[];
  completedOrders?: IOrderGroup[];
}

export interface IOrderGroup {
  date: string;
  orders: IUserOrderResponse[];
}

export interface ITime {
  hours: string;
  minutes: string;
}

export interface IOrderFeedback {
  id: string;
  customerFeedback: string;
  rating: number;
}

export type TRadioValues = typeof radioButtons[number]['value'];

export type TProductResponse = IResponse<IProduct>;
export type TMenuResponse = IResponse<IMenu>;
