import styled from 'styled-components';

import { PlusButton } from './plus-button';

export const AddItemButton = styled(PlusButton)`
  padding: 16px;
  height: 56px;
  width: 56px;
  z-index: 20;
  position: fixed;
  left: 90px;
  bottom: 20px;
  border-radius: 50%;
  background-color: #000;

  transition: background-color ${(prop) => prop.theme.transition} ease 0s;
  &:hover {
    background-color: #fff;
    border: 2px solid #000;
  }

  &:hover::after,
  &:hover::before {
    background-color: #000;
    transform: translate(-50%, -50%);
  }

  &::after,
  &::before {
    left: 50%;
    top: 50%;
    background-color: #fff;
    transform: translate(-50%, -50%);
  }
`;
