import styled from 'styled-components';

export const Logo = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  border-radius: 50%;
  width: 128px;
  height: 128px;
  overflow: hidden;
  cursor: pointer;

  &:hover::after {
    transform: translateY(0);
  }
  &::after {
    position: absolute;
    left: 0;
    bottom: 0;
    content: 'change';
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    width: 128px;
    height: 40px;
    transform: translateY(40px);
    background-color: #262429;
    transition: transform ${(prop) => prop.theme.transition} ease 0s;
  }

  img {
    width: 128px;
    height: 128px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
