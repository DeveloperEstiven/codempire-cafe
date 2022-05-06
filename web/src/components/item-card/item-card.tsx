import { Button } from '@styles/components/button';
import { useItemCard } from './item-card.state';
import { StyledCard as Styled } from './item-card.styles';
import './item-card.styles.css';
import { IItemCardProps } from './item-card.typings';

export const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
  const { onExpandCard, name, image, description, weight, price, onAddToCart } = useItemCard(item);

  return (
    <Styled.Wrapper>
      <Styled.Card>
        <Styled.ImageBox onClick={onExpandCard}>
          <img src={image} alt="item-card" />
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
