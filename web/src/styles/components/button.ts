import styled from 'styled-components';

interface IButtonProps {
  color?: 'black' | 'white';
}

export const Button = styled.button<IButtonProps>`
  background-color: ${(props) => props.color || 'white'};
  color: ${(props) => (props.color === 'black' ? 'white' : 'black')};
  width: 100%;
  overflow: hidden;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1.25px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  padding: 0 16px;
  white-space: nowrap;
  border-radius: ${(props) => props.theme.borderRadius};
  transition: background-color 0.3s ease 0s, color 0.3s ease 0s;

  &:disabled,
  &[disabled] {
    background-color: ${(props) => props.theme.colors.buttonDisabledBg};
    color: #fff;
    cursor: default;
  }

  &:hover:enabled {
    background-color: ${(props) => (props.color === 'black' ? '#fff' : props.theme.colors.textPrimary)};
    border: ${(props) => (props.color === 'black' ? '1px solid #000' : '0')};
    color: ${(props) => (props.color === 'black' ? '#000' : 'white')};
  }
`;
