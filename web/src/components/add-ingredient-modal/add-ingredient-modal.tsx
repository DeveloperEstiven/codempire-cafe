import { Checkbox } from '@components/checkbox';
import { Input } from '@components/input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { Modal } from '@mui/material';
import { StyledAddIngredientModal as Styled } from './add-ingredient-modal.styles';
import { IAddIngredientModalProps } from './add-ingredient-modal.typings';
import { useAddIngredientModal } from './add-ingredient.modal.state';

export const AddIngredientModal: React.FC<IAddIngredientModalProps> = ({ onCloseAddModal, isAddModalOpen }) => {
  const { newIngredientValue, onChangeNewIngredientValue, handleCheckIsAllergen, isAllergen, createIngredient } =
    useAddIngredientModal(onCloseAddModal);

  return (
    <Modal open={isAddModalOpen} onClose={onCloseAddModal}>
      <Styled.ModalInner>
        <h3>Add ingredient</h3>
        <Input value={newIngredientValue} onChange={onChangeNewIngredientValue} placeholder="Name" isAutoFocus />
        <Styled.Checkbox>
          <Checkbox
            id="newIngredient"
            value="Is allergen"
            checkHandler={handleCheckIsAllergen}
            isChecked={isAllergen}
          />
        </Styled.Checkbox>
        <Styled.ButtonsWrapper direction="horizontal">
          <div>
            <Styled.CancelButton onClick={onCloseAddModal}>cancel</Styled.CancelButton>
          </div>
          <div>
            <Loader area={PROMISES_AREA.addIngredient}>
              <Styled.AddButton disabled={!newIngredientValue} onClick={createIngredient}>
                add
              </Styled.AddButton>
            </Loader>
          </div>
        </Styled.ButtonsWrapper>
      </Styled.ModalInner>
    </Modal>
  );
};
