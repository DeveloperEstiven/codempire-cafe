import { OrderedItem } from '@components/ordered-item/ordered-item';
import { getDate, getTime } from '@utils/date';
import { StyledOrderInformation as Styled } from './order-information.styles';
import { IOrderInformationProps } from './order-information.typings';

export const OrderInformation: React.FC<IOrderInformationProps> = ({ order }) => {
  return (
    <>
      <Styled.Box>
        <h2>User information</h2>
        <h4>Name</h4>
        <span>{order?.user.userName}</span>
        <h4>Phone</h4>
        <span>{order?.user.phoneNumber}</span>
        <h4>Address</h4>
        <span>{order?.address?.address}</span>
      </Styled.Box>
      <Styled.Box>
        <h2>Delivery information</h2>
        <h4>Date</h4>
        <span>{getDate(order!.wantedDeliveryDate)}</span>
        <h4>Time</h4>
        <span>{getTime(order!.wantedDeliveryDate)}</span>
        <h4>Comment</h4>
        <span>{order?.comment || '-'}</span>
      </Styled.Box>
      <Styled.Box>
        <h2>Order {order && 'orderNumber' in order ? order?.orderNumber : ''}</h2>
        <Styled.Products>
          {order?.productsOrders?.map(({ product, count }) => (
            <OrderedItem key={product.name} item={product} count={count} />
          ))}
          {order?.menusOrders?.map(({ menu, count }) => (
            <OrderedItem key={menu.name} item={menu} count={count} />
          ))}
        </Styled.Products>
        <Styled.TotalPrice>
          <h4>total</h4>
          <h4>{order?.price} uah</h4>
        </Styled.TotalPrice>
      </Styled.Box>
    </>
  );
};
