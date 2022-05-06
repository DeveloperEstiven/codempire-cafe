import { Loader } from '@components/loader';
import { OrderInformation } from '@components/order-information';
import { Range } from '@components/range';
import { StarRating } from '@components/star-rating';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { getTime } from '@utils/date';
import { useOrderDetail } from './order-detail.state';
import { StyledOrderDetail as Styled } from './order-detail.styles';

export const OrderDetail: React.FC = () => {
  const { order, isLoading, isDelivered, onCancelClick, onOrderAgain } = useOrderDetail();

  if (isLoading) {
    return <Loader isWithoutArea />;
  }

  return (
    <Styled.Page>
      <Loader area={PROMISES_AREA.cancelOrder}>
        <Styled.Wrapper>
          <OrderInformation order={order} />
        </Styled.Wrapper>
        {isDelivered ? (
          <Styled.Footer>
            <Styled.Delivered>
              <div>
                <span>Your mark:</span>
                <StarRating value={order?.rating} isReadonly />
              </div>
              <div>
                <span>Status:</span>
                <h4>Delivered</h4>
              </div>
            </Styled.Delivered>
            <Button color="black" onClick={onOrderAgain}>
              order again
            </Button>
          </Styled.Footer>
        ) : (
          <>
            <Styled.Footer>
              <Styled.Status>
                <div>
                  <span>Delivery expected on:</span>
                  <h4>{getTime(order!.wantedDeliveryDate)}</h4>
                </div>
                <Range status={order!.status} />
              </Styled.Status>
              <Button color="black" onClick={onCancelClick(order!.id)}>
                cancel
              </Button>
            </Styled.Footer>
          </>
        )}
      </Loader>
    </Styled.Page>
  );
};
