import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import BuildInfo from './components/BuildInfo';
import KLoading from './components/KLoading';
import { LoadingSubscription } from './components/LoadingSubscription';
import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';
import { isLoadingState } from './store';

const App: React.FC = () => {
  const [isLoading] = useRecoilState(isLoadingState);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<AuthLogin />}></Route>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
      </Routes>
      <KLoading isLoading={isLoading} />
      <BuildInfo />
      <LoadingSubscription />
    </BrowserRouter>
  );
};

export default App;
