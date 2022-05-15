import { ChangeImageModal } from '@components/change-image-modal';
import { FormDropdown } from '@components/form-dropdown';
import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { RemoveItem } from '@components/remove-item';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { StyledEditItem as Styled } from '@styles/components/edit-item';
import { Space } from '@styles/components/space';
import { useEditMenuForm } from './edit-menu-form.state';
import { IEditMenuFormProps } from './edit-menu-form.typings';

export const EditMenuForm: React.FC<IEditMenuFormProps> = (props) => {
  const { formik, handler, value } = useEditMenuForm(props);
  const { touched, errors } = formik;
  return (
    <>
      {props.menu && value.isRemoveModalOpen && (
        <RemoveItem isOpen={value.isRemoveModalOpen} onClose={handler.onCloseRemoveModal} item={props.menu} />
      )}

      <ChangeImageModal
        isOpen={value.isChangeImageOpen}
        name="image"
        close={handler.onChangeImageClose}
        handleChange={handler.onImageChange}
      />

      <Styled.Form onSubmit={formik.handleSubmit}>
        <Styled.Header>{props.menu ? 'Editing menu' : 'Add menu'}</Styled.Header>
        <Styled.Wrapper>
          <Space>
            <Styled.Logo>
              {formik.values.image && <img src={formik.values.image} alt="Menu" />}
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

            <div>
              <Styled.TitleWrapper>
                <h3>Products:</h3>
              </Styled.TitleWrapper>
              <FormDropdown
                items={value.products}
                setFieldValue={formik.setFieldValue}
                isMulti
                setSelected={handler.onProductsChange}
                placeholder="Add products"
                isWithTouched={!props.menu}
                maxMenuHeight={100}
                field={{ touched, errors }}
                {...formik.getFieldProps('products')}
              />
            </div>

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
          <Loader area={PROMISES_AREA.updateMenu}>
            <Button color="black" type="submit" disabled={!formik.isValid}>
              save
            </Button>
          </Loader>
          {props.menu && (
            <Styled.Button color="white" type="button" onClick={handler.onDeleteClick}>
              delete menu
            </Styled.Button>
          )}
        </Styled.ButtonWrapper>
      </Styled.Form>
    </>
  );
};
