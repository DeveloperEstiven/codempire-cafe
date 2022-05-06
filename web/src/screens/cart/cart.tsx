import { useNavigate } from 'react-router-dom';

import { CartItem } from '@components/cart-item';
import { NotFound } from '@components/not-found';
import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { Button } from '@styles/components/button';
import { StyledCart as Styled } from './cart.styles';

export const Cart: React.FC = () => {
  const { cart, totalPrice } = useAppSelector((store) => store.cart);
  const isCartWithItems = !!totalPrice;
  const navigate = useNavigate();

  const onMakeOrder = () => {
    navigate(ROUTES.orderPage);
  };

  return (
    <Styled.Cart>
      {isCartWithItems && (
        <>
          <Styled.Wrapper>
            {cart.products.map(({ product, count }) => (
              <CartItem key={product.id} item={product} count={count} />
            ))}
            {cart.menus.map(({ menu, count }) => (
              <CartItem key={menu.id} item={menu} count={count} />
            ))}
          </Styled.Wrapper>

          <Styled.Footer>
            <div>
              <p>Total</p>
              <span>{totalPrice}uah</span>
            </div>
            <Button color="black" onClick={onMakeOrder}>
              order
            </Button>
          </Styled.Footer>
        </>
      )}

      {!isCartWithItems && <NotFound title="Your cart is currently empty" />}
    </Styled.Cart>
  );
};
