import { IUserOrderResponse } from 'typings/api';

export type TSelectedType = 'waiting' | 'complete';
export type TRawGroups = { [k: string]: IUserOrderResponse[] };
