import { Loader } from '@components/loader';
import { Modal } from '@mui/material';
import { StyledRemoveItemModal as Styled } from './remove-item-modal.styles';
import { IRemoveItemModalProps } from './remove-item-modal.typings';

export const RemoveItemModal: React.FC<IRemoveItemModalProps> = ({
  isOpen,
  onClose,
  item,
  text,
  onDelete,
  items,
  area,
  allergenName,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Styled.Wrapper>
        <Styled.Title>{text} item?</Styled.Title>

        <Styled.ProductInfo direction="horizontal" gapSize={16} isWithContentText={!!allergenName}>
          {item ? (
            <>
              <img src={item.image} alt="product" />
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
              </div>
            </>
          ) : (
            <h3>{allergenName}</h3>
          )}
        </Styled.ProductInfo>

        {!!items?.length && (
          <Styled.Menus>
            <h3>This product is contained in these {allergenName ? 'products' : 'menus'}:</h3>
            <Styled.MenusList>
              {items.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
            </Styled.MenusList>
          </Styled.Menus>
        )}

        <Styled.ButtonsWrapper direction="horizontal">
          <div>
            <Styled.CancelButton onClick={onClose}>cancel</Styled.CancelButton>
          </div>
          <div>
            <Loader area={area}>
              <Styled.DeleteButton onClick={onDelete}>{text}</Styled.DeleteButton>
            </Loader>
          </div>
        </Styled.ButtonsWrapper>
      </Styled.Wrapper>
    </Modal>
  );
};
