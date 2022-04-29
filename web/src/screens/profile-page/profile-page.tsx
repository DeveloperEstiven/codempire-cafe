import { Link } from 'react-router-dom';

import { Addresses } from '@components/addresses';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { Button } from '@styles/components/button';
import { settings } from './profile-page.constants';
import { useProfilePage } from './profile-page.state';
import { SectionHeader, StyledProfilePage as Styled } from './profile-page.styles';

export const ProfilePage: React.FC = () => {
  const { isAuthorized, userName, phoneNumber, role, logo, onLogOutClick, onLogInClick } = useProfilePage();

  return (
    <Styled.Page>
      <Styled.Section>
        <Styled.Header>
          <Styled.Logo>
            <img src={logo || IMAGES.unauthorisedUser} alt="User Logo" />
          </Styled.Logo>
          <Styled.Info>
            <h2>{userName || 'Unauthorised'}</h2>
            <p>{phoneNumber || 'Phone number'}</p>
          </Styled.Info>
          <span>{role}</span>
        </Styled.Header>
      </Styled.Section>

      {isAuthorized && (
        <>
          <Styled.Section>
            <Addresses />
          </Styled.Section>

          <Styled.Section>
            <SectionHeader>
              <h4>Settings</h4>
            </SectionHeader>
            <Styled.SettingsList>
              {settings.map(({ route, title }) => (
                <li key={route}>
                  <Link to={route}>{title}</Link>
                </li>
              ))}
            </Styled.SettingsList>
          </Styled.Section>

          <Styled.Section>
            <Styled.Actions>
              <Link to={ROUTES.editProfile}>edit profile</Link>
              <button onClick={onLogOutClick}>sign out</button>
            </Styled.Actions>
          </Styled.Section>
        </>
      )}
      {!isAuthorized && (
        <Styled.UnauthorizedActions>
          <Button color="black" onClick={onLogInClick}>
            log in
          </Button>
          <Link to={ROUTES.signUp}>sign up</Link>
        </Styled.UnauthorizedActions>
      )}
    </Styled.Page>
  );
};
