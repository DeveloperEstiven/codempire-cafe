import { TSelectedType } from '@screens/main-page/main-page.typings';
import { IMenuResponse, IProductResponse } from 'typings/api';

export interface IProductsListProps {
  selectedType: TSelectedType;
  menus: IMenuResponse[] | IProductResponse[];
  products: IMenuResponse[] | IProductResponse[];
}
