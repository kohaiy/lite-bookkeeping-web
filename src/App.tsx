import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import BuildInfo from './components/BuildInfo';
import KLoading from './components/KLoading';
import KContainer from './layouts/KContainer';
import { LoadingSubscription } from './components/LoadingSubscription';
import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';
import BillAdd from './pages/bill/BillAdd';
import Home from './pages/home';
import { isLoadingState } from './store';
import AuthProvider from './layouts/AuthProvider';
import RequireAuth from './layouts/RequireAuth';

const App: React.FC = () => {
  const [isLoading] = useRecoilState(isLoadingState);
  return (
    <AuthProvider>
      <BrowserRouter>
        <KContainer>
          <Routes>
            <Route path="/">
              <Route path="/" element={<AuthLogin />}></Route>
              <Route path="login" element={<AuthLogin />}></Route>
              <Route path="register" element={<AuthRegister />}></Route>
              <Route
                path="home"
                element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                }
              ></Route>
              <Route path="bill-add" element={<BillAdd />}></Route>
            </Route>
          </Routes>
        </KContainer>
        <KLoading isLoading={isLoading} />
        <BuildInfo />
        <LoadingSubscription />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
