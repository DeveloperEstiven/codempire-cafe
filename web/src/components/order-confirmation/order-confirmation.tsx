import { Loader } from '@components/loader';
import { OrderInformation } from '@components/order-information';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { useOrderConfirmation } from './order-confirmation.state';
import { StyledOrderConfirmation as Styled } from './order-confirmation.styles';
import './order-confirmation.styles.css';

export const OrderConfirmation: React.FC = () => {
  const { isPropsExists, isCartWithItems, isOneItem, detailOrder, onOrder } = useOrderConfirmation();

  return (
    <>
      {(isPropsExists || isCartWithItems || isOneItem) && (
        <Styled.Page>
          <Styled.Wrapper>
            <OrderInformation order={detailOrder} />
          </Styled.Wrapper>

          <Styled.LoaderBox>
            <Loader area={PROMISES_AREA.addOrder}>
              <Button color="black" onClick={onOrder}>
                Confirm
              </Button>
            </Loader>
          </Styled.LoaderBox>
        </Styled.Page>
      )}
    </>
  );
};
