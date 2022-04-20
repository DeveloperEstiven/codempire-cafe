import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { TIcon } from '@components/icon';
import { IUserPublic } from '@services/user-api/user-api.typings';

export interface IUser extends IUserPublic {
  id: string;
  publicKey: string;
  role: TRole;
}

export interface IError {
  message?: string;
  code?: number;
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

export type TProductResponse = IResponse<IProduct>;
export type TMenuResponse = IResponse<IMenu>;
