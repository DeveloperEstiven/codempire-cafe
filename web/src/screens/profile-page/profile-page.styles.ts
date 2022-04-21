import styled from 'styled-components';

//?=============!__Common__!=============
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 14px;

  h4 {
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.1px;
  }
`;

export const List = styled.ul`
  li {
    border-top: 1px solid rgba(33, 33, 33, 0.08);
    padding: 16px;
  }
`;

export const StyledProfilePage = {
  //?=============!__Common__!=============
  Page: styled.section`
    padding: 16px 0 0;
  `,

  Section: styled.div`
    margin-bottom: 16px;
    padding: 16px;
    background-color: #fff;
    box-shadow: ${(props) => props.theme.boxShadow};
  `,

  //?=============!__Header__!=============

  Header: styled(SectionHeader)`
    padding: 5px 0;
    display: flex;
    position: relative;
    justify-content: flex-start;
    span {
      position: absolute;
      right: 16px;
      top: 16px;
      font-size: 12px;
      line-height: 16px;
      letter-spacing: 0.4px;
    }
  `,

  Logo: styled.div`
    margin-right: 16px;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  `,

  Info: styled.div`
    h2 {
      font-size: 34px;
      line-height: 36px;
      letter-spacing: 0.15px;
      margin-bottom: 5px;
    }
    p {
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 0.15px;
    }
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  `,

  //?=============!__Settings__!=============

  SettingsList: styled(List)`
    li {
      position: relative;
      display: block;
      cursor: pointer;
      height: 100%;
      padding: 0;
      a {
        display: inline-block;
        padding: 10px;
        width: 100%;
        height: 100%;
      }

      &:hover::before {
        transform: scale(130%) rotate(45deg);
      }
      &:hover {
        background-color: #efefef;
      }

      &::before {
        transition: transform ${(prop) => prop.theme.transition} ease 0s;
        position: absolute;
        top: 15px;
        right: 8px;
        content: '';
        display: inline-block;
        width: 8.4px;
        height: 8.4px;
        border-right: 2px solid black;
        border-top: 2px solid black;
        transform: rotate(45deg);
      }
    }
  `,

  //?=============!__Actions__!=============

  Actions: styled.div`
    display: flex;
    a,
    button {
      display: block;
      width: 50%;
      background-color: #fff;
      text-align: center;
      padding: 5px 0;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 1.25px;
      transition: color ${(prop) => prop.theme.transition} ease 0s;
    }
    a {
      color: ${(props) => props.theme.colors.textPrimary};
      &:hover {
        color: #000;
      }
    }
    button {
      color: ${(props) => props.theme.colors.textDanger};
      &:hover {
        color: #000;
      }
    }
  `,
  //?=============!__UnauthorizedActions__!=============
  UnauthorizedActions: styled.div`
    margin: 150px auto 0;
    width: 350px;

    a {
      margin-top: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      height: 48px;
      text-align: center;
      padding: 5px 0;
      text-transform: uppercase;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 1.25px;
      background-color: #ededf8;
      transition: color ${(prop) => prop.theme.transition} ease 0s;
      color: ${(props) => props.theme.colors.textPrimary};
      &:hover {
        color: #000;
      }
    }
  `,
};
