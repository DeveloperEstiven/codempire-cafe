import styled from 'styled-components';

import { Button } from '@styles/components/button';

export const StyledItemCardModal = {
  Wrapper: styled.div`
    background-color: #fff;
    border-radius: ${(props) => props.theme.borderRadius};
    padding: 16px;
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 512px;
    position: absolute;
    left: calc(50% + 35px);
    top: 50%;
    transform: translate(-50%, -50%);
  `,

  Header: styled.div`
    margin: 0;
    justify-content: start;
    padding-bottom: 16px;
    border-top: 0;
    border-bottom: 1px solid #eee;
    font-weight: 500;
    font-size: 14px;
    line-height: 140%;
    letter-spacing: 0.1px;
    color: rgba(0, 0, 0, 0.87);
  `,

  Title: styled.h2`
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    padding-top: 16px;
    color: rgba(0, 0, 0, 0.87);
  `,

  Image: styled.div`
    margin: 0 auto;
    text-align: center;
    margin: 15px;
    img {
      height: 136px;
      width: 136px;
      object-fit: cover;
    }
  `,

  Info: styled.div`
    overflow: auto;
    max-height: 150px;

    p {
      font-size: 16px;
      line-height: 24px;
      overflow: hidden;
      height: 100%;
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.87);
      text-align: left;
    }

    h3 {
      font-weight: 500;
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0.1px;
      margin: 15px 0 0px;
    }

    span {
      font-size: 14px;
      line-height: 140%;
      letter-spacing: 0.25px;
    }
  `,

  Actions: styled.div`
    display: flex;
    margin: 10px 0 20px;
    justify-content: center;
    div {
      border-right: 1px solid rgba(33, 33, 33, 0.08);
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      line-height: 24px;
      letter-spacing: 0.18px;
      padding: 0 15px;
      &:last-child {
        border-right: 0;
      }
    }
  `,

  ButtonsWrapper: styled.div`
    width: 100%;
    padding: 0 25.6px;
    display: flex;
    justify-content: center;

    button {
      &:hover {
        background-color: #eee !important;
      }
    }
  `,

  DeleteButton: styled(Button)`
    color: ${(props) => props.theme.colors.textDanger};
    &:hover {
      color: ${(props) => props.theme.colors.textDanger} !important;
    }
  `,

  EditButton: styled(Button)`
    color: ${(props) => props.theme.colors.textPrimary};
    &:hover {
      color: ${(props) => props.theme.colors.textPrimary} !important;
    }
  `,
};
