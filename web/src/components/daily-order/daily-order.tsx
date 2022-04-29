import { useNavigate } from 'react-router-dom';

import { NotFound } from '@components/not-found';
import { getTime } from '@utils/date';
import { StyledDailyOrder as Styled } from './daily-order.styles';
import { IDailyOrderProps } from './daily-order.typings';

export const DailyOrder: React.FC<IDailyOrderProps> = ({ selectedType, orderGroup }) => {
  const navigate = useNavigate();

  const onOrderClick = (orderNumber: number) => () => navigate(`${orderNumber}`);

  return (
    <>
      {orderGroup?.map((group) => (
        <Styled.Card key={group.date}>
          <h3>{group.date}</h3>
          <ul>
            {group.orders.map(({ orderNumber, date, description }) => (
              <Styled.Item key={orderNumber} onClick={onOrderClick(orderNumber)}>
                <div>
                  <b>{orderNumber}</b>
                  <span>time: {getTime(date)}</span>
                </div>
                <div>
                  <p>{description}</p>
                </div>
              </Styled.Item>
            ))}
          </ul>
        </Styled.Card>
      ))}
      {!orderGroup?.length && (
        <NotFound title={`You don't have any ${selectedType === 'complete' ? 'completed' : 'pending'} orders yet`} />
      )}
    </>
  );
};
