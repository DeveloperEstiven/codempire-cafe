import { IMenuResponse, IProductResponse } from 'typings/api';

export interface IProductCardProps {
  product: IMenuResponse | IProductResponse;
}
