import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, .2);
  transition: all .1s;
  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;

export const Loading = styled.div`
  padding: 18px;
  font-size: 16px;
  border-radius: 16px;
  color: #fff;
  background-color: rgba(0, 0, 0, .4);
`;