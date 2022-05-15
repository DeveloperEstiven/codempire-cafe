import styled from 'styled-components';

import { Button } from '@styles/components/button';
import { Space } from '@styles/components/space';

export const StyledAddIngredientModal = {
  ModalInner: styled.div`
    position: absolute;
    left: calc(50% + 35px);
    padding: 24px 16px;
    text-align: center;
    width: 280px;
    top: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: ${(props) => props.theme.borderRadius};
    h3 {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 500;
    }
  `,

  Checkbox: styled.div`
    margin-top: 15px;
  `,

  ButtonsWrapper: styled(Space)`
    margin-top: 15px;
    width: 100%;
    div {
      width: 50%;
      button[disabled] {
        &:hover {
          color: #fff !important;
        }
        background-color: #eee !important;
        cursor: no-drop !important;
      }
    }
  `,

  CancelButton: styled(Button)`
    color: ${(props) => props.theme.colors.textDanger} !important;
    &:hover {
      background-color: #eee !important;
      color: ${(props) => props.theme.colors.textDanger} !important;
    }
  `,

  AddButton: styled(Button)`
    color: ${(props) => props.theme.colors.textPrimary};
    &:hover {
      background-color: #eee !important;
      color: ${(props) => props.theme.colors.textPrimary} !important;
    }
  `,
};
