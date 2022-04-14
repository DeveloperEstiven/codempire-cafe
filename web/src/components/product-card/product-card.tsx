import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { Button } from '@styles/components/button';

import { ProductCardConfig } from './product-card.constants';

import { IProductCardProps } from './product-card.typings';

import { StyledCard as Styled } from './product-card.styles';
import './product-card.styles.css';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { name, description, price, image /* , ingredients */ } = product;

  const onExpandCard = () => Swal.fire(ProductCardConfig(product));

  useEffect(() => () => Swal.close(), []);

  return (
    <Styled.Wrapper>
      <Styled.Card>
        <Styled.ImageBox onClick={onExpandCard}>
          <img src={image} alt="product-card" />
        </Styled.ImageBox>
        <div>
          <Styled.Description>
            <h4 onClick={onExpandCard}>{name}</h4>
            <p>{description}</p>
          </Styled.Description>
          <Styled.Footer>
            <span>{price}</span>
            <Button color="black">to cart</Button>
          </Styled.Footer>
        </div>
      </Styled.Card>
    </Styled.Wrapper>
  );
};
