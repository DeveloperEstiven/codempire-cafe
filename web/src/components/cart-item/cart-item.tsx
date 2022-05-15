import { useState } from 'react';

import { RemoveItemModal } from '@components/remove-item-modal';
import { useAppDispatch } from '@hooks/redux';
import { decrement, increment, removeItem } from '@store/reducers/cart';
import { IMenu, IProduct } from 'typings/api';
import { StyledCartItem as Styled } from './cart-item.styles';
import { ICartItemProps } from './cart-item.typings';

export const CartItem: React.FC<ICartItemProps> = ({ item, count }) => {
  const dispatch = useAppDispatch();
  const [removed, setRemoved] = useState<IMenu | IProduct>();
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const onRemove = (item: IMenu | IProduct) => () => {
    setIsRemoveModalOpen(true);
    setRemoved(item);
  };

  const deleteProduct = () => {
    dispatch(removeItem({ id: removed!.id }));
    setIsRemoveModalOpen(false);
  };

  const onCloseRemoveModal = () => {
    setIsRemoveModalOpen(false);
  };

  const onIncrementClick = (id: string) => () => dispatch(increment({ id }));
  const onDecrementClick = (id: string) => () => dispatch(decrement({ id }));

  return (
    <>
      {removed && (
        <RemoveItemModal
          text="Remove"
          isOpen={isRemoveModalOpen}
          onDelete={deleteProduct}
          onClose={onCloseRemoveModal}
          item={removed!}
        />
      )}
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
            <button onClick={onIncrementClick(item.id)} disabled={count === 10}>
              +
            </button>
          </Styled.Count>
        </Styled.Product>
        <Styled.Actions>
          <button onClick={onRemove(item)}>remove</button>
          <span>{item.price * count}uah</span>
        </Styled.Actions>
      </Styled.Item>
    </>
  );
};
