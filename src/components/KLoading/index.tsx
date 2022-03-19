import { Loop } from '@mui/icons-material';
import { Loading, Wrapper } from './style';

interface Props {
    isLoading?: boolean;
}

const KLoading: React.FC<Props> = (props) => {
    return (
        <Wrapper className={props.isLoading ? '' : 'hidden'}>
            <Loading>
                <Loop color="inherit" fontSize="large" />
            </Loading>
        </Wrapper>
    );
};

export default KLoading;
