import { useNavigate } from 'react-router-dom';

import { StyledDailyOrder as Styled } from './daily-order.styles';
import { IDailyOrderProps } from './daily-order.typings';

export const DailyOrder: React.FC<IDailyOrderProps> = ({ day, orders }) => {
  const navigate = useNavigate();

  const onOrderClick = (orderNumber: number) => () => navigate(`${orderNumber}`);

  return (
    <Styled.Card>
      <h3>{day}</h3>
      <ul>
        {orders.map(({ orderNumber, time, description }) => (
          <Styled.Item key={orderNumber} onClick={onOrderClick(orderNumber)}>
            <div>
              <b>{orderNumber}</b>
              <span>time: {time}</span>
            </div>
            <div>
              <p>{description}</p>
            </div>
          </Styled.Item>
        ))}
      </ul>
    </Styled.Card>
  );
};
