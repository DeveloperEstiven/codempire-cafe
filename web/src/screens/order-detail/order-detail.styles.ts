import styled from 'styled-components';

export const StyledOrderDetail = {
  Page: styled.div`
    margin: 0 auto;
    max-width: 450px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h4 {
      font-weight: 500;
      letter-spacing: 0.1px;
      margin-bottom: 6px;
    }

    span {
      letter-spacing: 0.25px;
      display: block;
      margin-bottom: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    button {
      margin: 15px 0 0;
    }
  `,

  Delivered: styled.div`
    margin: 16px 0;
    display: flex;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h4 {
        margin-bottom: 0;
      }
    }

    span {
      display: inline-block;
      height: 24px;
      margin-bottom: 0;
    }
  `,

  WaitingWrapper: styled.div<{ isManager: boolean; isOrderAccepted: boolean }>`
    margin-top: 10px;
    height: ${(props) => (props.isManager && props.isOrderAccepted ? '77vh' : props.isManager ? '84vh' : '73vh')};
    overflow-y: scroll;
  `,

  CompletedWrapper: styled.div<{ isManager: boolean }>`
    margin-top: 10px;
    height: ${(props) => (props.isManager ? '84vh' : '76vh')};
    overflow-y: scroll;
  `,

  Status: styled.div`
    margin: 16px 0;

    & div:first-child {
      display: flex;
      margin-bottom: 20px;
      h4 {
        margin: 0 0 0 15px;
      }
    }

    span {
      margin-bottom: 0;
    }
  `,

  Footer: styled.div`
    padding-bottom: 5px;
  `,

  Cancel: styled.div`
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: 0.15px;
  `,
};
