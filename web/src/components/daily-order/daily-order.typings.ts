import { TSelectedType } from '@screens/orders-page/orders-page.typings';
import { IOrderGroup } from 'typings/api';

export interface IDailyOrderProps {
  orderGroup?: IOrderGroup[];
  selectedType?: TSelectedType;
}
