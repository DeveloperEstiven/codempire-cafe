import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { useAppSelector } from '@hooks/redux';
import { StyledAddresses as Styled } from './addresses.styles';

export const Addresses: React.FC = () => {
  const navigate = useNavigate();
  const { addresses } = useAppSelector((store) => store.user.user);

  const onAddAddresses = () => {
    navigate(ROUTES.addAddresses, { state: { prevPath: location.pathname } });
  };

  const activeAddresses = addresses?.filter((address) => address.isActive) || [];
  return (
    <>
      <Styled.Header>
        <h4>Addresses</h4>
        <i onClick={onAddAddresses} />
      </Styled.Header>
      <Styled.List>
        {activeAddresses?.map(({ address }) => (
          <li key={address}>
            <span>{address}</span>
          </li>
        ))}
        {!!addresses?.length && !activeAddresses?.length && <li>Addresses available for activation</li>}
        {!addresses?.length && <li>Add your first address</li>}
      </Styled.List>
    </>
  );
};
