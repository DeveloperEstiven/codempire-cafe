import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { List } from '@screens/profile-page/profile-page.styles';
import { StyledAddresses as Styled } from './addresses.styles';

//TODO from store
export const addresses = ['2464 Royal Ln. Mesa, New Jersey 45463', '2464 Royal Ln. Mesa, New Jersey 45462'];

export const Addresses: React.FC = () => {
  const navigate = useNavigate();

  const onAddAddresses = () => {
    navigate(ROUTES.addAddresses);
  };
  return (
    <>
      <Styled.Header>
        <h4>Addresses</h4>
        <i onClick={onAddAddresses} />
      </Styled.Header>
      <List>
        {addresses.map((address) => (
          <li key={address}>{address}</li>
        ))}
      </List>
    </>
  );
};
