import { useAppDispatch } from '@hooks/redux';
import { decrement, increment, removeItem } from '@store/reducers/cart';
import { StyledCartItem as Styled } from './cart-item.styles';
import { ICartItemProps } from './cart-item.typings';

export const CartItem: React.FC<ICartItemProps> = ({ item, count }) => {
  const dispatch = useAppDispatch();
  const onDecrementClick = (id: string) => () => dispatch(decrement({ id }));
  const onIncrementClick = (id: string) => () => dispatch(increment({ id }));

  const onRemove = (id: string) => () => dispatch(removeItem({ id }));

  return (
    <Styled.Item key={item.id}>
      <Styled.Product>
        <Styled.ImageBox>
          <img src={item.image} alt="item" />
        </Styled.ImageBox>
        <Styled.Description>
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </Styled.Description>
        <Styled.Count>
          <button onClick={onDecrementClick(item.id)} disabled={count === 1}>
            -
          </button>
          <span>{count}</span>
          <button onClick={onIncrementClick(item.id)}>+</button>
        </Styled.Count>
      </Styled.Product>
      <Styled.Actions>
        <button onClick={onRemove(item.id)}>remove</button>
        <span>{item.price * count}uah</span>
      </Styled.Actions>
    </Styled.Item>
  );
};
