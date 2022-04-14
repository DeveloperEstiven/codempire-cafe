import styled from 'styled-components';

import { media } from '@styles/media';

export const StyledCard = {
  Wrapper: styled.div`
    padding: 0 8px;
    flex: 0 1 25%;
    width: 25%;

    ${media.tablet} {
      flex: 0 1 33.33333%;
      width: 33.333%;
    }
    ${media.mobile} {
      flex: 0 1 50%;
      width: 50%;
    }
    ${media.sMobile} {
      flex: 0 1 100%;
      width: 100%;
    }
  `,

  Card: styled.div`
    padding: 16px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    box-shadow: ${(props) => props.theme.boxShadow};
    justify-content: space-between;
  `,

  ImageBox: styled.div`
    text-align: center;
    cursor: pointer;
    &:hover + div > div > h4 {
      color: ${(props) => props.theme.colors.textPrimary};
    }
    img {
      object-fit: cover;
      width: 150px;
      height: 150px;
      max-width: 100%;
    }
  `,
  Description: styled.div`
    font-size: 14px;
    line-height: 140%;

    h4 {
      width: 100px;
      font-weight: 500;
      letter-spacing: 0.1px;
      margin-top: 10px;
      margin-bottom: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: color ${(props) => props.theme.transition} ease 0s;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.colors.textPrimary};
      }
    }
    p {
      height: 50px;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      letter-spacing: 0.25px;

      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        top: 0;
        background: rgb(255, 255, 255);
        background: linear-gradient(
          180deg,
          rgba(255, 255, 255, 0) 24%,
          rgba(255, 255, 255, 0.8) 65%,
          rgba(255, 255, 255, 1) 100%
        );
      }
    }
  `,
  Footer: styled.div`
    text-align: center;
    span {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0.15px;
    }
    button {
      height: 40px;
      margin-top: 10px;
    }
  `,
};
