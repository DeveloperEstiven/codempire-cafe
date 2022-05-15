import { Link } from 'react-router-dom';

import { Addresses } from '@components/addresses';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routes';
import { Button } from '@styles/components/button';
import { useProfilePage } from './profile-page.state';
import { SectionHeader, StyledProfilePage as Styled } from './profile-page.styles';

export const ProfilePage: React.FC = () => {
  const {
    isAuthorized,
    userName,
    phoneNumber,
    role,
    logo,
    isManager,
    currentSectionsList,
    onLogOutClick,
    onLogInClick,
  } = useProfilePage();

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
          {!isManager && (
            <Styled.Section>
              <Addresses />
            </Styled.Section>
          )}

          {currentSectionsList.map((list) => (
            <Styled.Section key={list.listTitle}>
              <SectionHeader>
                <h4>{list.listTitle}</h4>
              </SectionHeader>
              <Styled.SectionList>
                {list.listItems.map(({ route, title, state }) => (
                  <li key={route + title}>
                    <Link to={route} state={state}>
                      {title}
                    </Link>
                  </li>
                ))}
              </Styled.SectionList>
            </Styled.Section>
          ))}

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
