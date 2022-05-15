import styled from 'styled-components';

export const StyledChangeImageModal = {
  Wrapper: styled.div`
    background-color: #fff;
    border-radius: ${(props) => props.theme.borderRadius};
    box-shadow: ${(props) => props.theme.boxShadow};
    position: absolute;
    left: calc(50% + 35px);
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    label {
      margin: 0;
    }
  `,
};
