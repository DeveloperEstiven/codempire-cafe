import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { DailyOrder } from '@components/daily-order';
import { StyledDataOrganizer as Styled } from '@components/data-organizer/data-organizer.styles';
import { Dropdown } from '@components/dropdown';
import { TDropdownData } from '@components/dropdown/dropdown.typings';
import { Loader } from '@components/loader';
import { NotFound } from '@components/not-found';
import { TypeSelector } from '@components/type-selector';
import { errorMixin } from '@constants/pop-up-messages';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { useGetOrdersQuery } from '@services/order-api';
import { isWaitingOrderReceived, selectedTabReceived, setSort } from '@store/reducers/user-orders';
import { IOrderGroup, IResponseError } from 'typings/api';
import { getGroupOrders, sortingStyle, sortItems, sortOrders } from './orders-page.constants';
import { Sort } from './orders-page.styles';
import { TSelectedType } from './orders-page.typings';

export const OrdersPage: React.FC = () => {
  const isManager = useAppSelector((store) => store.user.user.role) === 'manager';
  const { sort } = useAppSelector((store) => store.userOrders);
  const { selectedTab } = useAppSelector((store) => store.userOrders);
  const { notificationsOrders: managerOrders } = useAppSelector((store) => store.notifications);
  const [selectedType, setSelectedType] = useState<TSelectedType>(selectedTab);
  const dispatch = useAppDispatch();
  const [selectedSort, setSelectedSort] = useState(sort);

  const {
    data: userOrders,
    error,
    isLoading,
  } = useGetOrdersQuery('', {
    skip: isManager,
    pollingInterval: 10000,
  });

  const { waitingOrders, completedOrders } = useMemo(
    () => getGroupOrders(isManager ? managerOrders : userOrders),
    [userOrders, managerOrders]
  );

  useEffect(() => {
    dispatch(isWaitingOrderReceived(waitingOrders?.length ? true : false));
  }, [waitingOrders]);

  useEffect(() => {
    if (selectedSort) {
      dispatch(setSort(selectedSort));
    }
  }, [selectedSort]);

  const onTypeSelect = (type: string) => {
    dispatch(selectedTabReceived(type as TSelectedType));
    setSelectedType(type as TSelectedType);
  };

  if (isLoading) {
    return <Loader isWithoutArea />;
  }

  if (error) {
    const err = error as IResponseError;
    errorMixin({ title: err.data.message }).fire();
  }

  const data = sortOrders(
    selectedSort,
    selectedType === 'waiting' ? (waitingOrders as IOrderGroup[]) : (completedOrders as IOrderGroup[])
  );

  return (
    <>
      {(!!waitingOrders?.length || !!completedOrders?.length) && (
        <TypeSelector titles={['waiting', 'complete']} onTypeSelect={onTypeSelect} selectedType={selectedType} />
      )}

      {!data?.length ? (
        <NotFound
          isButtonHide={isManager}
          title={`You don't have any ${selectedType === 'complete' ? 'completed' : 'pending'} orders yet`}
        />
      ) : (
        <>
          {isManager && (
            <Sort>
              <Styled.FilterItem>
                <Dropdown
                  isSearchable={false}
                  placeholder="sorting by"
                  stylesConfig={sortingStyle}
                  selected={selectedSort}
                  setSelected={setSelectedSort as Dispatch<SetStateAction<TDropdownData>>}
                  items={sortItems}
                />
              </Styled.FilterItem>
            </Sort>
          )}

          <DailyOrder orderGroup={data} />
        </>
      )}
    </>
  );
};
