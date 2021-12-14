import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import routes from './router';
import BuildInfo from './components/BuildInfo';
import AuthLogin from './pages/auth/Login';
import AuthRegister from './pages/auth/Register';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="/" element={<AuthLogin />}></Route>
          <Route path="login" element={<AuthLogin />}></Route>
          <Route path="register" element={<AuthRegister />}></Route>
        </Route>
        {/* {routes.map((r) =>
          Array.isArray(r.children) ? (
            <Route
              {...r}
              children={r.children.map((c) => (
                <Route {...c} key={c.path} />
              ))}
              key={r.path}
            />
          ) : (
            <Route {...r} key={r.path} />
          )
        )} */}
      </Routes>

      <BuildInfo />
    </BrowserRouter>
  );
};

export default App;
