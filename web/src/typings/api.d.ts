import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { TIcon } from '@components/icon';
import { IUserPublic } from '@services/user-api/user-api.typings';

export interface IEditProfile extends IUserPublic {
  logo: string;
}

export interface IAddAddresses {
  addresses: IAddress[];
}

export interface IUser extends IEditProfile {
  id: string;
  publicKey: string;
  role: TRole;
  addresses: IAddress[];
}

interface IAddress {
  address: string;
  isActive: boolean;
}
export interface IError {
  message?: string;
  code?: number;
}
export interface IResponseError {
  status: number;
  data: IError;
}

export type TInputEvent = React.ChangeEvent<HTMLInputElement>;

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
  products: IProduct[];
}

export interface IProduct extends IMenuProductCommon {
  category: string;
  subcategory: string;
  weight: string;
  ingredients: IIngredient[];
}
export interface IIngredient {
  id: string;
  name: string;
  isAllergen: string;
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
  orderNumber: number;
  date: string;
  wantedDeliveryDate: string;
  status: TDeliveryStatus;
  price: number;
  comment: string | null;
  description: string;
}
export interface IUserDetailOrder extends IUserOrderResponse {
  productsOrders?: IProductOrder[];
  menusOrders?: IMenuOrder[];
}

export interface IGroupOrders {
  waitingOrders?: IOrderGroup[];
  completedOrders?: IOrderGroup[];
}

export interface IOrderGroup {
  date: string;
  orders: IUserOrderResponse[];
}

export type TProductResponse = IResponse<IProduct>;
export type TMenuResponse = IResponse<IMenu>;
