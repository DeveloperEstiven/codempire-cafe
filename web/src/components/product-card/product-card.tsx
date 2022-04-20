import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { Button } from '@styles/components/button';
import { ProductCardConfig } from './product-card.constants';
import { StyledCard as Styled } from './product-card.styles';
import './product-card.styles.css';
import { IProductCardProps } from './product-card.typings';

export const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
  const { name, description, price, image } = product;

  const weight = 'weight' in product ? product.weight : null;
  const onExpandCard = () => Swal.fire(ProductCardConfig(product));

  useEffect(() => () => Swal.close(), []);

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
            <Button color="black">to cart</Button>
          </Styled.Footer>
        </>
      </Styled.Card>
    </Styled.Wrapper>
  );
};
