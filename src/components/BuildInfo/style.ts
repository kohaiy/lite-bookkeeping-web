import styled from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  top: 4px;
  right: 4px;
  text-align: right;
  font-size: 12px;
  color: #fff;
  pointer-events: none;
`;

export const Top = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  border-radius: 3px;
  overflow: hidden;
  background-color: #555;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, 0));
  }
`;

export const Env = styled.div`
  flex: 1;
  padding: 2px 8px;
`;

export const Version = styled(Env)`
  background-color: #007ec6;
`;

export const BuildTime = styled.div`
  opacity: .4;
`;
