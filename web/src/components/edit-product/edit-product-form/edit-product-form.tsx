import { ChangeImageModal } from '@components/change-image-modal';
import { Dropdown } from '@components/dropdown';
import { FormDropdown } from '@components/form-dropdown';
import { FormInput } from '@components/form-input';
import { Input } from '@components/input';
import { Loader } from '@components/loader';
import { RadioButton } from '@components/radio-button';
import { RemoveItem } from '@components/remove-item';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { StyledEditItem as Styled } from '@styles/components/edit-item';
import { Space } from '@styles/components/space';
import { categories, getSubcategories } from './edit-product-form.constants';
import { useEditProductForm } from './edit-product-form.state';
import { IEditProductFormProps } from './edit-product-form.typings';

export const EditProductForm: React.FC<IEditProductFormProps> = (props) => {
  const { formik, handler, func, value } = useEditProductForm(props);
  const { touched, errors } = formik;
  return (
    <>
      {props.product && value.isRemoveModalOpen && (
        <RemoveItem isOpen={value.isRemoveModalOpen} onClose={handler.onCloseRemoveModal} item={props.product} />
      )}

      <ChangeImageModal
        isOpen={value.isChangeImageOpen}
        name="image"
        close={handler.onChangeImageClose}
        handleChange={handler.onImageChange}
      />

      <Styled.Form onSubmit={formik.handleSubmit}>
        <Styled.Header>{props.product ? 'Editing product' : 'Add product'}</Styled.Header>
        <Styled.Wrapper>
          <Space>
            <Styled.Logo>
              {formik.values.image && <img src={formik.values.image} alt="Product" />}
              <Button type="button" onClick={handler.onChangeImageClick}>
                {formik.values.image ? 'change' : 'add image'}
              </Button>
              <Styled.Error>{touched.image && errors.image && <span>{errors.image}</span>}</Styled.Error>
            </Styled.Logo>

            <FormInput
              field={{ touched: touched.name, errorMessage: errors.name }}
              title="Name"
              {...formik.getFieldProps('name')}
              onChange={handler.onNameChange}
            />

            <FormInput
              field={{ touched: touched.description, errorMessage: errors.description }}
              title="Description"
              isTextArea
              {...formik.getFieldProps('description')}
              onChange={handler.onDescriptionChange}
            />

            <Styled.Categories>
              <h3>Category:</h3>
              {categories.map(({ value, label }) => (
                <RadioButton
                  key={value}
                  value={value}
                  label={label}
                  checked={handler.handleIsRadioSelected(value)}
                  onChange={handler.handleRadioCheck}
                  name="category"
                />
              ))}
            </Styled.Categories>

            <div>
              <Styled.TitleWrapper>
                <h3>Subcategory:</h3>
                <Styled.AddSubcategory isActive={value.isNewSubcategoryVisible} onClick={func.toggleNewSubcategory} />
              </Styled.TitleWrapper>
              <Dropdown
                items={getSubcategories(value.subcategories, value.selectedCategory)}
                maxMenuHeight={200}
                name="subcategory"
                selected={formik.values.subcategory.value}
                placeholder="Add subcategory"
                setSelected={(option) => {
                  formik.setFieldValue('subcategory', option);
                }}
                onBlur={() => {
                  formik.handleBlur({ target: { name: 'subcategory' } });
                }}
              />
              <Styled.Error>
                {touched.subcategory && errors.subcategory && <span>{errors.subcategory.value}</span>}
              </Styled.Error>
            </div>

            {value.isNewSubcategoryVisible && (
              <Space gapSize={10}>
                <Input
                  isAutoFocus={value.isNewSubcategoryVisible}
                  value={value.newSubcategory}
                  onChange={handler.onChangeNewSubcategory}
                  title="Add new subcategory"
                />
                <Button color="black" type="button" onClick={handler.onAddNewSubcategory}>
                  add subcategory
                </Button>
              </Space>
            )}

            <div>
              <Styled.TitleWrapper>
                <h3>Ingredients:</h3>
                <Styled.AddSubcategory onClick={handler.onAddNewIngredients} />
              </Styled.TitleWrapper>
              <FormDropdown
                items={value.ingredients}
                setFieldValue={formik.setFieldValue}
                isMulti
                setSelected={handler.onIngredientsChange}
                placeholder="Add ingredients"
                isWithTouched={!props.product}
                maxMenuHeight={200}
                field={{ touched, errors }}
                {...formik.getFieldProps('ingredients')}
              />
            </div>

            <FormInput
              field={{ touched: touched.weight, errorMessage: errors.weight }}
              title="Weight"
              isMasked
              suffix="g"
              {...formik.getFieldProps('weight')}
              onChange={handler.onWeightChange}
            />

            <FormInput
              field={{ touched: touched.price, errorMessage: errors.price }}
              title="Price"
              isMasked
              suffix="uah"
              {...formik.getFieldProps('price')}
              onChange={handler.onPriceChange}
            />
          </Space>
        </Styled.Wrapper>

        <Styled.ButtonWrapper>
          <Loader area={PROMISES_AREA.updateProduct}>
            <Button color="black" type="submit" disabled={!formik.isValid}>
              save
            </Button>
          </Loader>
          {props.product && (
            <Styled.Button color="white" type="button" onClick={handler.onDeleteClick}>
              delete product
            </Styled.Button>
          )}
        </Styled.ButtonWrapper>
      </Styled.Form>
    </>
  );
};
