import { RemoveItem } from '@components/remove-item';
import { Modal } from '@mui/material';
import { Button } from '@styles/components/button';
import { useItemCardModal } from './item-card-modal.state';
import { StyledItemCardModal as Styled } from './item-card-modal.styles';
import { IItemCardModalProps } from './item-card-modal.typings';

export const ItemCardModal: React.FC<IItemCardModalProps> = ({ item, isOpen, close }) => {
  const {
    isRemoveModalOpen,
    isManager,
    isProduct,
    names,
    allergenNames,
    weight,
    onCloseRemoveModal,
    onEditClick,
    onDeleteClick,
    onOrderClick,
  } = useItemCardModal(item);

  return (
    <>
      {isRemoveModalOpen && <RemoveItem isOpen={isRemoveModalOpen} onClose={onCloseRemoveModal} item={item} />}

      <Modal open={isOpen} onClose={close}>
        <Styled.Wrapper>
          <Styled.Header>{isProduct ? 'Product' : 'Menu'} information</Styled.Header>
          <Styled.Title>{item.name}</Styled.Title>
          <Styled.Image>
            <img src={item.image} alt="item" />
          </Styled.Image>

          <Styled.Info>
            <p>{item.description}</p>
            <h3>{isProduct ? 'Ingredients' : 'Contains'}:</h3>
            <span>{names}</span>
            <h3>Allergens:</h3>
            <span>{allergenNames}</span>
          </Styled.Info>
          <Styled.Actions>
            {weight && <div>{weight}</div>}
            <div>{item.price}uah</div>
          </Styled.Actions>

          {isManager ? (
            <Styled.ButtonsWrapper>
              <Styled.EditButton onClick={onEditClick}>edit</Styled.EditButton>
              <Styled.DeleteButton onClick={onDeleteClick}>delete</Styled.DeleteButton>
            </Styled.ButtonsWrapper>
          ) : (
            <Button color="black" onClick={onOrderClick}>
              order
            </Button>
          )}
        </Styled.Wrapper>
      </Modal>
    </>
  );
};
