import styled from 'styled-components';

export const StyledCart = {
  Cart: styled.div`
    max-width: 450px;
    margin: 0 auto;
  `,

  Wrapper: styled.div`
    overflow-y: scroll;
    margin-top: 30px;
    height: 76vh;
  `,

  Item: styled.div`
    margin-bottom: 24px;
    padding-right: 10px;
  `,

  NoProducts: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
    font-weight: 500;
    font-size: 24px;

    img {
      margin-top: -50px;
    }
    div {
      margin-bottom: 20px;
    }

    a {
      position: relative;
      padding-left: 15px;
      font-size: 16px;
      color: ${(props) => props.theme.colors.textPrimary};
      transition: color ${(prop) => prop.theme.transition} ease 0s;

      &:hover {
        color: black;
      }
      &:hover::before {
        border-color: black;
      }
      &:hover::after {
        background: black;
      }
      &::before {
        content: '';
        border-color: ${(props) => props.theme.colors.textPrimary};
        border-style: solid;
        border-width: 0 0 2px 2px;
        display: block;
        height: 7px;
        left: 0px;
        position: absolute;
        width: 7px;
        margin-top: -3px;
        top: 50%;
        transition: left 0.1s;
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        transition: border-color ${(prop) => prop.theme.transition} ease 0s;
      }
      &::after {
        background-color: ${(props) => props.theme.colors.textPrimary};
        content: '';
        transition: background-color ${(prop) => prop.theme.transition} ease 0s;
        display: block;
        margin-top: -0.5px;
        height: 2px;
        left: 0px;
        position: absolute;
        top: 50%;
        width: 11px;
        transition: left 0.1s;
      }
    }
  `,

  Product: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  `,

  Description: styled.div`
    h4 {
      font-weight: 500;
      width: 220px;
      text-overflow: ellipsis;
      font-size: 16px;
      line-height: 19px;
      transition: color ${(prop) => prop.theme.transition} ease 0s;
    }
    p {
      display: block;
      width: 220px;
      white-space: nowrap;
      overflow: hidden;
      font-size: 16px;
      line-height: 24px;
      color: rgba(0, 0, 0, 0.87);
      letter-spacing: 0.15px;
      text-overflow: ellipsis;
    }
  `,

  ImageBox: styled.div`
    margin-right: 20px;
    img {
      object-fit: cover;
      display: block;
      height: 70px;
      width: 70px;
    }
  `,

  Count: styled.div`
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      background-color: #fff;
      font-style: normal;
      padding: 10px;
      transition: color ${(prop) => prop.theme.transition} ease 0s;
      &:first-child {
        font-size: 26px;
      }
      &:last-child {
        font-size: 16px;
      }
      &:hover:not([disabled]) {
        color: ${(props) => props.theme.colors.textPrimary};
      }
    }
    button[disabled] {
      cursor: no-drop;
    }

    span {
      font-weight: 500;
      font-size: 18px;
      line-height: 16px;
      margin: 0 15px;
    }
  `,

  Actions: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: #000000;
    }

    button {
      padding: 10px 8px;
      background-color: #fff;
      font-weight: 500;
      font-size: 12px;
      letter-spacing: 1.25px;
      text-transform: uppercase;
      color: ${(props) => props.theme.colors.textPrimary};
      transition: color ${(prop) => prop.theme.transition} ease 0s;
      &:hover {
        color: black;
      }
    }
  `,

  Footer: styled.div`
    padding: 16px 0;
    p {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
    }

    span {
      font-weight: 400;
      font-size: 34px;
      line-height: 36px;
      color: #000000;
    }

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `,
};