import { Input } from '@components/input';
import { StarRating } from '@components/star-rating';
import { Modal } from '@mui/material';
import { Button } from '@styles/components/button';
import { useRateOrder } from './rate-order.state';
import { StyledRateOrder as Styled } from './rate-order.styles';
import { IRateOrderProps } from './rate-order.typings';

export const RateOrder: React.FC<IRateOrderProps> = ({ order, setIsRatingModalOpen, isRatingModalOpen }) => {
  const { onModalClose, onRatingClick, feedback, onCustomerFeedbackChange, onRateOrder } = useRateOrder({
    order,
    setIsRatingModalOpen,
  });

  return (
    <Modal open={isRatingModalOpen} onClose={onModalClose}>
      <Styled.Modal>
        {order.isRated ? (
          <h3>You have already rated this order</h3>
        ) : (
          <h3>Please, rate an order {order.orderNumber}</h3>
        )}

        <StarRating
          onRatingClick={onRatingClick}
          value={order.isRated ? order.rating : feedback.rating}
          isReadonly={order.isRated}
        />

        <Styled.FeedbackWrapper>
          {order.isRated ? (
            order.customerFeedback && <p>{order.customerFeedback}</p>
          ) : (
            <Input
              isAutoFocus
              onChange={onCustomerFeedbackChange}
              value={feedback.customerFeedback}
              isDisabled={order.isRated}
            />
          )}
        </Styled.FeedbackWrapper>

        <Styled.ModalButtons>
          <Button onClick={onModalClose}>Close</Button>
          {!order.isRated && <Button onClick={onRateOrder}>Save</Button>}
        </Styled.ModalButtons>
      </Styled.Modal>
    </Modal>
  );
};
