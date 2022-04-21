import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 350px;
  margin: 0 auto;
`;

export const FormButtonsWrapper = styled.div`
  margin: 90px 0 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormLinks = styled.div`
  margin-top: 16px;
  font-weight: 500;
  width: 100%;
  display: flex;
  justify-content: space-between;
  a {
    transition: color 0.2s ease;
    &:hover {
      color: ${(props) => props.theme.colors.textPrimary};
    }
  }
`;
