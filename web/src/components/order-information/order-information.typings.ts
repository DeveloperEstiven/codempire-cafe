import { IUserDetailOrderResponse, IUserOrder } from 'typings/api';

export interface IOrderInformationProps {
  order?: IUserDetailOrderResponse | IUserOrder;
}
