import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '@components/loader';
import { Range } from '@components/range';
import { StarRating } from '@components/star-rating';
import { errorMixin } from '@constants/pop-up-messages';
import { useAppSelector } from '@hooks/redux';
import { useGetDetailOrderQuery } from '@services/profile-page-api';
import { Button } from '@styles/components/button';
import { getDate, getTime } from '@utils/date';
import { IResponseError } from 'typings/api';
import { StyledOrderDetail as Styled } from './order-detail.styles';

export const OrderDetail: React.FC = () => {
  const { orderNumber } = useParams();
  const { data: order, isLoading, error } = useGetDetailOrderQuery(orderNumber!);
  const isDelivered = order?.status === 'delivered';
  const { user } = useAppSelector((store) => store.user);
  const [rate, setRate] = useState(3);

  const onRate = (value: number) => {
    setRate(value);
  };

  if (isLoading) {
    return <Loader isWithoutArea />;
  }

  if (error) {
    const err = error as IResponseError;
    errorMixin({ title: err.data.message }).fire();
  }

  return (
    <Styled.Page>
      <Styled.Wrapper>
        <Styled.Box>
          <h2>User information</h2>
          <h4>Name</h4>
          <span>{user.userName}</span>
          <h4>Phone</h4>
          <span>{user.phoneNumber}</span>
          <h4>Address</h4>
          <span>{user?.addresses[0]?.address}</span>
        </Styled.Box>
        <Styled.Box>
          <h2>Delivery information</h2>
          <h4>Date</h4>
          <span>{getDate(order!.date)}</span>
          <h4>Time</h4>
          <span>{getTime(order!.date)}</span>
          <h4>Comment</h4>
          <span>{order?.comment || '-'}</span>
        </Styled.Box>
        <Styled.Box>
          <h2>Order {orderNumber}</h2>
          <Styled.Products>
            {order?.productsOrders?.map(({ id, product, count }) => (
              <li key={id}>
                <div>
                  <h4>
                    {product.name} {count > 1 && <i>&times; {count}</i>}
                  </h4>
                  <span>{product.description}</span>
                </div>
                <span>{product.price * count} uah</span>
              </li>
            ))}
            {order?.menusOrders?.map(({ id, menu, count }) => (
              <li key={id}>
                <div>
                  <h4>
                    {menu.name} {count > 1 && <i>&times; {count}</i>}{' '}
                  </h4>
                  <span>{menu.description}</span>
                </div>
                <span>{menu.price * count} uah</span>
              </li>
            ))}
          </Styled.Products>
          <Styled.TotalPrice>
            <h4>total</h4>
            <h4>{order?.price} uah</h4>
          </Styled.TotalPrice>
        </Styled.Box>
      </Styled.Wrapper>

      {isDelivered ? (
        <Styled.Footer>
          <Styled.Delivered>
            <div>
              <span>Your mark:</span>
              <StarRating onRatingClick={onRate} value={rate} />
            </div>
            <div>
              <span>Status:</span>
              <h4>Delivered</h4>
            </div>
          </Styled.Delivered>
          <Button color="black">order again</Button>
        </Styled.Footer>
      ) : (
        <Styled.Footer>
          <Styled.Status>
            <div>
              <span>Delivery expected on:</span>
              <h4>{getTime(order!.wantedDeliveryDate)}</h4>
            </div>
            <Range status={order!.status} />
          </Styled.Status>
          <Button color="black">cancel</Button>
        </Styled.Footer>
      )}
    </Styled.Page>
  );
};
