import { Link, useLocation } from 'react-router-dom';

import { DatePickerField } from '@components/date-picker-field';
import { Dropdown } from '@components/dropdown';
import { IDropdownData } from '@components/dropdown/dropdown.typings';
import { FormInput } from '@components/form-input';
import { Loader } from '@components/loader';
import { RadioButton } from '@components/radio-button';
import { TimePicker } from '@components/time-picker';
import { PROMISES_AREA } from '@constants/promises-area';
import { ROUTES } from '@constants/routes';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from '@styles/components/button';
import { Form } from '@styles/components/form';
import { PlusButton } from '@styles/components/plus-button';
import { Space } from '@styles/components/space';
import { radioButtons } from './order-page-form.constants';
import { StyledOrderPage as Styled } from './order-page-form.styles';
import { IOrderFormProps } from './order-page-form.typings';
import { useOrderPage } from './order-page.state';

export const OrderForm: React.FC<IOrderFormProps> = ({ onOrder }) => {
  const {
    values,
    time,
    maxDate,
    errors,
    touched,
    isValid,
    selectedRadio,
    classesTextField,
    getActiveAddresses,
    onTimeChange,
    handleSubmit,
    handleBlur,
    isRadioSelected,
    handleRadioCheck,
    onCommentChange,
    onDateChange,
    onAddressChange,
  } = useOrderPage({ onOrder });
  const { state } = useLocation();

  return (
    <Form onSubmit={handleSubmit}>
      <Styled.Wrapper>
        <Space direction="vertical" gapSize={22}>
          <div>
            <h3>Choose address</h3>
            <Dropdown
              items={getActiveAddresses() || ([] as IDropdownData[])}
              name="address"
              placeholder="select address"
              selected={'value' in values.address ? values.address : ''}
              setSelected={onAddressChange}
              onBlur={() => {
                handleBlur({ target: { name: 'address' } });
              }}
            />
            <Styled.Error>{touched.address && <span>{errors.address?.value}</span>}</Styled.Error>

            <Styled.AddAddresses>
              <Link to={{ pathname: ROUTES.addAddresses }} state={{ prevPath: location.pathname, prevState: state }}>
                add another
                <PlusButton />
              </Link>
            </Styled.AddAddresses>
          </div>

          <Styled.ChooseDate>
            <Space direction="vertical" gapSize={10}>
              {radioButtons.map(({ value, label }) => (
                <RadioButton
                  key={value}
                  value={value}
                  label={label}
                  checked={isRadioSelected(value)}
                  onChange={handleRadioCheck}
                  name="deliveryDate"
                />
              ))}
            </Space>
          </Styled.ChooseDate>

          {selectedRadio === 'later' && (
            <Styled.DateSelect>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePickerField
                    value={values.deliveryDate}
                    classesTextField={classesTextField}
                    maxDate={maxDate}
                    onChange={onDateChange}
                  />
                </LocalizationProvider>
                <Styled.Error>{errors.deliveryDate && <span>{errors.deliveryDate}</span>}</Styled.Error>
              </div>
              <TimePicker time={time} setTime={onTimeChange} />
            </Styled.DateSelect>
          )}

          <FormInput
            field={{ touched: touched.comment, errorMessage: errors.comment }}
            title="Add a comment"
            isTextArea
            name="comment"
            onBlur={handleBlur}
            value={values.comment}
            onChange={onCommentChange}
          />

          <Loader area={PROMISES_AREA.addOrder}>
            <Button color="black" type="submit" disabled={!isValid}>
              go on
            </Button>
          </Loader>
        </Space>
      </Styled.Wrapper>
    </Form>
  );
};
