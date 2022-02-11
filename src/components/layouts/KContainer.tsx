import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 540px;
  height: 100%;
  margin: 0 auto;
  overflow: auto;
`;

const KContainer: React.FC = (props) => {
  return <Container>{props.children}</Container>;
};

export default KContainer;
