import { Dropdown } from '@components/dropdown';
import { StyledFormDropdown as Styled } from './form-dropdown.styles';
import { IFormDropdownProps } from './form-dropdown.typings';

export const FormDropdown: React.FC<IFormDropdownProps> = ({
  field,
  title,
  value,
  setFieldValue,
  onBlur,
  setSelected,
  name,
  isWithTouched,
  ...props
}) => {
  const error = field.errors[name];
  const isError = isWithTouched ? field.touched[name] && error : error;

  return (
    <div>
      {title && <Styled.Title>{title}</Styled.Title>}
      <Dropdown
        onBlur={() => {
          onBlur({ target: { name } });
        }}
        selected={value}
        setSelected={(option) => {
          setSelected ? setSelected(option) : setFieldValue(name, option);
        }}
        {...props}
      />
      {isError && <Styled.Error>{error}</Styled.Error>}
    </div>
  );
};
