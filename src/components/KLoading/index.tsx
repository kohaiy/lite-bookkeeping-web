import { Loading, Wrapper } from './style';

interface Props {
  isLoading?: boolean;
}

const KLoading: React.FC<Props> = (props) => {
  return (
    <Wrapper className={props.isLoading ? '' : 'hidden'}>
      <Loading>加载中...</Loading>
    </Wrapper>
  );
};

export default KLoading;
