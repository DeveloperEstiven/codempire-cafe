import styled from 'styled-components';

import { Button } from '@styles/components/button';
import { Space } from '@styles/components/space';

export const StyledRemoveItemModal = {
  Wrapper: styled.div`
    background-color: #fff;
    padding: 32px 16px 24px;
    width: 280px;
    position: absolute;
    left: calc(50% + 35px);
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${(props) => props.theme.borderRadius};
    box-shadow: ${(props) => props.theme.boxShadow};

    img {
      height: 70px;
      width: 70px;
      object-fit: cover;
    }
  `,

  Title: styled.h2`
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
  `,

  ProductInfo: styled(Space)<{ isWithContentText: boolean }>`
    margin-top: 25px;
    line-height: 140%;
    justify-content: ${(props) => (props.isWithContentText ? 'center' : 'inherit')};
    h3 {
      font-weight: 500;
      margin-bottom: 4px;
      letter-spacing: 0.1px;
    }

    p {
      letter-spacing: 0.25px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  `,

  Menus: styled.div`
    margin: 25px 0;
    h3 {
      font-weight: 500;
    }
  `,

  MenusList: styled.ul`
    max-height: 130px;
    overflow-y: auto;
    margin-top: 10px;
    li {
      overflow: hidden;
      white-space: nowrap;
      border-bottom: 1px solid rgba(33, 33, 33, 0.08);
      padding: 10px 0;
      text-overflow: ellipsis;

      &:last-child {
        border-bottom: 0;
      }
    }
  `,

  ButtonsWrapper: styled(Space)`
    margin-top: 24px;
    div {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `,

  CancelButton: styled(Button)`
    color: ${(props) => props.theme.colors.textPrimary};
    &:hover {
      background-color: #eee !important;
      color: ${(props) => props.theme.colors.textPrimary} !important;
    }
  `,

  DeleteButton: styled(Button)`
    color: ${(props) => props.theme.colors.textDanger};
    &:hover {
      background-color: #eee !important;
      color: ${(props) => props.theme.colors.textDanger} !important;
    }
  `,
};
