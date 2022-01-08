import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 80px 8px 0;
`;

export const FormItem = styled.div`
  & ~ & {
    margin-top: 24px;
  }
`;

export const Input = styled.input`
  width: 100%;
  line-height: 1.5;
  font-size: 18px;
  border: none;
  border-bottom: 2px solid #000;
  outline: none;
  background-color: transparent;
`;

export const Button = styled.button`
  width: 160px;
  height: 40px;
  font-size: 18px;
  border: 2px solid #000;
  border-radius: 20px;
  cursor: pointer;
  &.primary {
    background-color: #f3d965;
  }
`;

export const Footer = styled.div`
  margin-top: 80px;
  text-align: center;
`;
