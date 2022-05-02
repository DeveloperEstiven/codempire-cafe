import { OrderForm } from './order-page-form';
import { THandleOrderSubmit } from './order-page-form/order-page-form.typings';
import { StyledOrderPage as Styled } from './order-page.styles';

export const OrderPage: React.FC = () => {
  const onOrder: THandleOrderSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
  };

  return (
    <Styled.OrderPage>
      <OrderForm onOrder={onOrder} />
    </Styled.OrderPage>
  );
};
