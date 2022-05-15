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
  const {
    isOrderAccepted,
    currentOrder,
    onAcceptOrder,
    isManager,
    isLoading,
    isDelivered,
    isManagerOrderLoading,
    onCancelClick,
    onOrderAgain,
    onCloseOrder,
  } = useOrderDetail();

  if (!currentOrder || isLoading || isManagerOrderLoading) {
    return <Loader isWithoutArea />;
  }

  return (
    <Styled.Page>
      <Loader area={PROMISES_AREA.cancelOrder}>
        {isDelivered ? (
          <Styled.CompletedWrapper isManager={isManager}>
            <OrderInformation order={currentOrder} />
          </Styled.CompletedWrapper>
        ) : (
          <Styled.WaitingWrapper isManager={isManager} isOrderAccepted={isOrderAccepted}>
            <OrderInformation order={currentOrder} />
          </Styled.WaitingWrapper>
        )}
        {isDelivered ? (
          <Styled.Footer>
            <Styled.Delivered>
              <div>
                <span>{isManager ? 'User' : 'Your'} mark:</span>
                <StarRating value={currentOrder?.rating} isReadonly />
              </div>
              <div>
                <span>Status:</span>
                <h4>Delivered</h4>
              </div>
            </Styled.Delivered>
            {!isManager && (
              <Button color="black" onClick={onOrderAgain}>
                order again
              </Button>
            )}
          </Styled.Footer>
        ) : (
          <>
            <Styled.Footer>
              {!isManager && (
                <>
                  <Styled.Status>
                    <div>
                      <span>Delivery expected on:</span>
                      <h4>{getTime(currentOrder?.wantedDeliveryDate || '')}</h4>
                    </div>
                    <Range status={currentOrder?.status} />
                  </Styled.Status>
                  <Loader area={PROMISES_AREA.cancelOrder}>
                    <Button color="black" onClick={onCancelClick(currentOrder!.id)}>
                      cancel
                    </Button>
                  </Loader>
                </>
              )}
              {isManager && (
                <>
                  <Loader area={PROMISES_AREA.acceptOrder}>
                    <Button color="black" onClick={onAcceptOrder(currentOrder!.id)} disabled={isOrderAccepted}>
                      {isOrderAccepted ? 'accepted' : 'accept order'}
                    </Button>
                  </Loader>

                  {isOrderAccepted && (
                    <Loader area={PROMISES_AREA.closeOrder}>
                      <Button color="black" onClick={onCloseOrder(currentOrder!.id)}>
                        close order
                      </Button>
                    </Loader>
                  )}
                </>
              )}
            </Styled.Footer>
          </>
        )}
      </Loader>
    </Styled.Page>
  );
};
