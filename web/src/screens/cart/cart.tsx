import { useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';

import { NotFound } from '@components/not-found';
import { ROUTES } from '@constants/routes';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { decrement, increment, removeItem } from '@store/reducers/cart';
import { Button } from '@styles/components/button';
import { StyledCart as Styled } from './cart.styles';

export const Cart: React.FC = () => {
  const { cart: products, totalPrice } = useAppSelector((store) => store.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onDecrementClick = (id: string) => () => dispatch(decrement({ id }));
  const onIncrementClick = (id: string) => () => dispatch(increment({ id }));

  const onRemove = (id: string) => () => dispatch(removeItem({ id }));

  const onMakeOrder = () => {
    navigate(ROUTES.orderPage);
  };
  return (
    <Styled.Cart>
      {!!products.length && (
        <>
          <Styled.Wrapper>
            <SimpleBar>
              {products.map(({ product, count }) => (
                <Styled.Item key={product.id}>
                  <Styled.Product>
                    <Styled.ImageBox>
                      <img src={product.image} alt="product" />
                    </Styled.ImageBox>
                    <Styled.Description>
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                    </Styled.Description>
                    <Styled.Count>
                      <button onClick={onDecrementClick(product.id)} disabled={count === 1}>
                        -
                      </button>
                      <span>{count}</span>
                      <button onClick={onIncrementClick(product.id)}>+</button>
                    </Styled.Count>
                  </Styled.Product>
                  <Styled.Actions>
                    <button onClick={onRemove(product.id)}>remove</button>
                    <span>{product.price * count}uah</span>
                  </Styled.Actions>
                </Styled.Item>
              ))}
            </SimpleBar>
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

      {!products.length && <NotFound title="Your cart is currently empty" />}
    </Styled.Cart>
  );
};
