import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { addItem, increment } from '@store/reducers/cart';
import { Button } from '@styles/components/button';
import { ProductCardConfig } from './product-card.constants';
import { StyledCard as Styled } from './product-card.styles';
import './product-card.styles.css';
import { IProductCardProps } from './product-card.typings';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { name, description, price, image } = product;
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((store) => store.cart);
  useEffect(() => () => Swal.close(), []);

  const onExpandCard = () => Swal.fire(ProductCardConfig(product));

  const onAddToCart = () => {
    if (!isExistsInCart) {
      return dispatch(addItem(product));
    }
    Swal.mixin({
      toast: true,
      showConfirmButton: false,
      position: 'top-end',
      icon: 'info',
      title: `increased ${product.name} cart quantity`,
      timer: 1500,
    }).fire();
    dispatch(increment({ id: product.id }));
  };

  const isExistsInCart = cart.some(({ product: p }) => p.id === product.id);
  const weight = 'weight' in product ? product.weight : null;

  return (
    <Styled.Wrapper>
      <Styled.Card>
        <Styled.ImageBox onClick={onExpandCard}>
          <img src={image} alt="product-card" />
        </Styled.ImageBox>
        <>
          <Styled.Description>
            <h4 onClick={onExpandCard}>{name}</h4>
            <p>{description}</p>
          </Styled.Description>
          <Styled.Footer>
            <Styled.FooterBox>
              {weight && <span>{weight}</span>}
              <span>{price}uah</span>
            </Styled.FooterBox>
            <Button color="black" onClick={onAddToCart}>
              to cart
            </Button>
          </Styled.Footer>
        </>
      </Styled.Card>
    </Styled.Wrapper>
  );
};
