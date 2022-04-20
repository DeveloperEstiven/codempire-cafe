import styled from 'styled-components';

export const StyledAsideMenu = {
  Aside: styled.aside`
    z-index: 1059;
    padding: 20px 10px;
    min-height: 100vh;
    position: sticky;
    top: 0;
    height: 100%;
    width: ${(props) => props.theme.asideMenuWidth};
    background-color: ${(props) => props.theme.colors.bg};
    & > div {
      border-bottom: 1px solid rgba(255, 255, 255, 0.74);
      padding-bottom: 20px;
      &:last-child {
        border-bottom: 0;
        padding: 20px 0 0;
      }
    }
  `,

  Group: styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
  `,

  Item: styled.div<{ isActive?: boolean }>`
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      fill: ${(props) => (props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.74)')};
      transition: fill ${(props) => props.theme.transition} ease 0s;
    }
    &:hover {
      svg {
        fill: #fff;
      }
    }
  `,

  Search: styled.div<{ isActive: boolean }>`
    position: relative;
    background-color: #fff;
    input {
      transform: translate(${(props) => (props.isActive ? '0' : '-200%')}, 0%);
      transition: transform ${(props) => props.theme.transition} ease;
      padding: 10px;
      background-color: #fff;
      height: 50px;
      position: absolute;
      width: 150px;
      top: -37px;
      left: 35px;
      box-shadow: ${(props) => props.theme.boxShadow};
    }

    label {
      display: none;
    }
  `,

  SearchButton: styled.div<{ isSearchValue: boolean }>`
    &::before {
      content: '';
      position: absolute;
      right: 0;
      top: -2px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display: ${(props) => (props.isSearchValue ? 'block' : 'none')};
      background-color: ${(props) => props.theme.colors.textPrimary};
    }
  `,
};
