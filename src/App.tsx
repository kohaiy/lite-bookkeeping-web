import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import BuildInfo from './components/BuildInfo';
import KLoading from './components/KLoading';
import KContainer from './layouts/KContainer';
import { LoadingSubscription } from './components/LoadingSubscription';
import { isLoadingState } from './store';
import AuthProvider from './router/AuthProvider';
import Router, { history } from './router';

const App: React.FC = () => {
    const [isLoading] = useRecoilState(isLoadingState);
    return (
        <AuthProvider>
            <HistoryRouter history={history}>
                <KContainer>
                    <Router />
                </KContainer>
                <KLoading isLoading={isLoading} />
                <BuildInfo />
                <LoadingSubscription />
            </HistoryRouter>
        </AuthProvider>
    );
};

export default App;
