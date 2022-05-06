import styled from 'styled-components';

export const StyledRateOrder = {
  Modal: styled.div`
    padding: 32px 16px 20px;
    background-color: #fff;
    text-align: center;
    border-radius: ${(props) => props.theme.borderRadius};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40;
    box-shadow: ${(props) => props.theme.boxShadow};

    h3 {
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: #000000;
      margin-bottom: 27px;
    }
  `,

  FeedbackWrapper: styled.div`
    margin-top: 27px;
  `,

  ModalButtons: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 27px;
    button {
      width: 80px;
      background-color: #fff;
      &:first-child {
        color: ${(props) => props.theme.colors.textDanger};
      }
      &:last-child {
        color: ${(props) => props.theme.colors.textPrimary};
      }
      &:hover {
        color: #000 !important;
        background-color: #eee !important;
      }
    }
  `,
};
