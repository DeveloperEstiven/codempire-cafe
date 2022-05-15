import { ItemCardModal } from '@components/item-card-modal';
import { RemoveItem } from '@components/remove-item';
import { Button } from '@styles/components/button';
import { useItemCard } from './item-card.state';
import { StyledCard as Styled } from './item-card.styles';
import { IItemCardProps } from './item-card.typings';

export const ItemCard: React.FC<IItemCardProps> = ({ item }) => {
  const {
    name,
    image,
    description,
    weight,
    price,
    isManager,
    onAddToCart,
    isProductItemOpen,
    isRemoveModalOpen,
    onCloseProductItem,
    onOpenProductItem,
    onDeleteClick,
    onCloseRemoveItem,
    onEditClick,
  } = useItemCard(item);

  return (
    <>
      {isProductItemOpen && <ItemCardModal isOpen={isProductItemOpen} close={onCloseProductItem} item={item} />}

      {isRemoveModalOpen && <RemoveItem isOpen={isRemoveModalOpen} onClose={onCloseRemoveItem} item={item} />}

      <Styled.Wrapper>
        <Styled.Card>
          <Styled.ImageBox onClick={onOpenProductItem}>
            <img src={image} alt="item-card" />
          </Styled.ImageBox>
          <>
            <Styled.Description>
              <h4 onClick={onOpenProductItem}>{name}</h4>
              <p>{description}</p>
            </Styled.Description>
            <Styled.Footer>
              <Styled.FooterBox>
                {weight && <span>{weight}</span>}
                <span>{price}uah</span>
              </Styled.FooterBox>

              {isManager ? (
                <Styled.ButtonsWrapper>
                  <Styled.EditButton onClick={onEditClick}>edit</Styled.EditButton>
                  <Styled.DeleteButton onClick={onDeleteClick}>delete</Styled.DeleteButton>
                </Styled.ButtonsWrapper>
              ) : (
                <Button color="black" onClick={onAddToCart}>
                  to cart
                </Button>
              )}
            </Styled.Footer>
          </>
        </Styled.Card>
      </Styled.Wrapper>
    </>
  );
};
