import { useMemo, useState } from 'react';

import { DailyOrder } from '@components/daily-order';
import { Loader } from '@components/loader';
import { TypeSelector } from '@components/type-selector';
import { errorMixin } from '@constants/pop-up-messages';
import { useGetOrdersQuery } from '@services/profile-page-api';
import { IResponseError } from 'typings/api';
import { getGroupOrders } from './orders-page.constants';
import { TSelectedType } from './orders-page.typings';

export const OrdersPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<TSelectedType>('waiting');
  const { data: orders, error, isLoading } = useGetOrdersQuery();
  const { waitingOrders, completedOrders } = useMemo(() => getGroupOrders(orders), [orders]);

  const onTypeSelect = (type: string) => {
    setSelectedType(type as TSelectedType);
  };

  if (isLoading) {
    return <Loader isWithoutArea />;
  }

  if (error) {
    const err = error as IResponseError;
    errorMixin({ title: err.data.message }).fire();
  }

  return (
    <>
      {(!!waitingOrders?.length || !!completedOrders?.length) && (
        <TypeSelector titles={['waiting', 'complete']} onTypeSelect={onTypeSelect} selectedType={selectedType} />
      )}

      <DailyOrder
        selectedType={selectedType}
        orderGroup={selectedType === 'waiting' ? waitingOrders : completedOrders}
      />
    </>
  );
};
