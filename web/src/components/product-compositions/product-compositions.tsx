import { Checkbox } from '@components/checkbox';
import { Loader } from '@components/loader';
import { RemoveItemModal } from '@components/remove-item-modal';
import { PROMISES_AREA } from '@constants/promises-area';
import { AddItemButton } from '@styles/components/add-item';
import { AddIngredientModal } from '../add-ingredient-modal/add-ingredient-modal';
import { useProductCompositions } from './product-compositions.state';
import { StyledProductCompositions as Styled } from './product-compositions.styles';

const tableHeaderNames = ['Name', 'Is allergen', ''];

export const ProductCompositions: React.FC = () => {
  const {
    isIngredientsLoading,
    isRemoveModalOpen,
    onCloseRemoveModal,
    onRemoveIngredient,
    productsWithIngredient,
    removedIngredient,
    onCloseAddModal,
    isAddModalOpen,
    onAddIngredient,
    ingredients,
    onRemoveIngredientClick,
  } = useProductCompositions();

  if (isIngredientsLoading) {
    return <Loader isWithoutArea />;
  }

  return (
    <>
      <RemoveItemModal
        area={PROMISES_AREA.removeIngredient}
        isOpen={isRemoveModalOpen}
        onClose={onCloseRemoveModal}
        onDelete={onRemoveIngredient}
        text="Delete"
        items={productsWithIngredient}
        allergenName={removedIngredient.name}
      />

      <AddIngredientModal onCloseAddModal={onCloseAddModal} isAddModalOpen={isAddModalOpen} />

      <AddItemButton onClick={onAddIngredient} />

      <Styled.Wrapper>
        <Styled.Table>
          <thead>
            <tr>
              {tableHeaderNames.map((head) => (
                <Styled.Header key={head}>{head}</Styled.Header>
              ))}
            </tr>
          </thead>
          <tbody>
            {ingredients?.map((ingredient) => (
              <Styled.Row key={ingredient.id}>
                <td>{ingredient.name}</td>
                <td>
                  <Checkbox id={ingredient.id} value={ingredient.name} isReadOnly isChecked={ingredient.isAllergen} />
                </td>
                <td>
                  <Styled.RemoveIngredient onClick={onRemoveIngredientClick(ingredient)} />
                </td>
              </Styled.Row>
            ))}
          </tbody>
        </Styled.Table>
      </Styled.Wrapper>
    </>
  );
};
