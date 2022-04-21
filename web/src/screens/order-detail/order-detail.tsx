import { useState } from 'react';

import { Range } from '@components/range';
import { StarRating } from '@components/star-rating';
import { Button } from '@styles/components/button';
import { StyledOrderDetail as Styled } from './order-detail.styles';

export const OrderDetail: React.FC = () => {
  const isDelivered = false; //FIXME
  const status = ['created', 'ready']; //FIXME
  const [rate, setRate] = useState(3);

  const onRate = (value: number) => {
    setRate(value);
  };

  return (
    <Styled.Page>
      <Styled.InformationBox>
        <h2>{'User information'}</h2>
        <h4>{'Name'}</h4>
        <span>{'Jane Cooper'}</span>
        <h4>{'Phone'}</h4>
        <span>{'(603) 555-0123'}</span>
        <h4>{'Address'}</h4>
        <span>{'2464 Royal Ln. Mesa, New Jersey 45463'}</span>
      </Styled.InformationBox>
      <Styled.InformationBox>
        <h2>{'Delivery information'}</h2>
        <h4>{'Date'}</h4>
        <span>{'10/05/2021'}</span>
        <h4>{'Order'}</h4>
        <span>{'Some salad, some soup and other in two lines..'}</span>
      </Styled.InformationBox>
      {isDelivered && (
        <>
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
        </>
      )}

      {!isDelivered && (
        <>
          <Styled.Status>
            <div>
              <span>Delivery expected on:</span>
              <h4>15:28</h4>
            </div>
            <Range status={status} />
          </Styled.Status>
          <Button color="black">cancel</Button>
        </>
      )}
    </Styled.Page>
  );
};
