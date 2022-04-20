import styled from 'styled-components';

export const StyledProductsList = {
  List: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px 0px;
    margin: 0 -8px;
    height: 100%;
  `,
  NotFound: styled.h4`
    margin-top: 25px;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 20px;
  `,
  EndMessage: styled.h4`
    margin-top: 25px;
    display: block;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  `,
  LoaderBox: styled.div`
    margin-top: 20px;
    svg {
      width: 70px;
      height: 70px;
    }
  `,
};
