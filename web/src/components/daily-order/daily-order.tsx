import { useNavigate } from 'react-router-dom';

import { Group } from '@styles/components/group';
import { getTime } from '@utils/date';
import { StyledDailyOrder as Styled } from './daily-order.styles';
import { IDailyOrderProps } from './daily-order.typings';

export const DailyOrder: React.FC<IDailyOrderProps> = ({ orderGroup }) => {
  const navigate = useNavigate();

  const onOrderClick = (orderNumber: number) => () => navigate(`${orderNumber}`);

  return (
    <>
      {orderGroup?.map((group) => (
        <Group.Card key={group.date}>
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
        </Group.Card>
      ))}
    </>
  );
};
