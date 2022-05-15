import styled from 'styled-components';



export const StyledMainPage = {
  MainPage: styled.div`
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1.25px;
    margin-bottom: 20px;
  `,

  ProductType: styled.div`
    display: flex;
    align-items: center;
    background-color: ${(props) => props.theme.colors.bg};
    font-weight: 500;
    text-transform: uppercase;
    height: 50px;
  `,

  ProductTypeItem: styled.div<{ isActive: boolean }>`
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${(props) => (props.isActive ? '#fff' : 'rgba(255, 255, 255, 0.74)')};
    padding: 5px;
    transition: color ${(props) => props.theme.transition} ease 0s;
    &:hover {
      color: #fff;
    }
  `,
};
