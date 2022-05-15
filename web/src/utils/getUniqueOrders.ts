import { IUserOrderResponse } from 'typings/api';

export const getUniqueOrders = <T extends { id: string }>(list1: IUserOrderResponse[], list2: T[]) =>
  list1.filter(
    (
      (set) => (a) =>
        !set.has(a.id)
    )(new Set(list2.map((b) => b.id)))
  );
