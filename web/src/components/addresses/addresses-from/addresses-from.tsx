import { Checkbox } from '@components/checkbox';
import { Input } from '@components/input';
import { Loader } from '@components/loader';
import { PROMISES_AREA } from '@constants/promises-area';
import { Button } from '@styles/components/button';
import { Space } from '@styles/components/space';
import { useAddressesForm } from './addresses-from.state';
import { StyledAddressesForm as Styled } from './addresses-from.styles';

export const AddressesForm: React.FC = () => {
  const { handleCheck, checkedState, value, addresses, onChange, onAddNewAddress, onApply } = useAddressesForm();

  return (
    <Styled.Wrapper>
      <Input value={value} onChange={onChange} title="Add a new address" onKeyDown={onAddNewAddress} />

      <Space direction="vertical" gapSize={22}>
        <Styled.AddressesList>
          {addresses.map((el) => (
            <li key={el}>
              <Checkbox id={el} value={el} checkHandler={handleCheck} isChecked={checkedState.includes(el)} />
            </li>
          ))}
        </Styled.AddressesList>

        {/* TODO: PROMISES_AREA.addAddresses  */}
        <Loader area={PROMISES_AREA.addAddresses}>
          <Button onClick={onApply} color="black">
            apply
          </Button>
        </Loader>
      </Space>
    </Styled.Wrapper>
  );
};
