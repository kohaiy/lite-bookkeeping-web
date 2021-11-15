import type { RouteProps } from 'react-router-dom';
import App from '../App';
import AuthLogin from '../pages/auth/Login';
import AuthRegister from '../pages/auth/Register';

interface RouteParams extends RouteProps {
  children?: RouteParams[] | RouteProps['children'];
}

const routes: RouteParams[] = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <AuthLogin />,
      },
      {
        path: 'register',
        element: <AuthRegister />,
      },
    ],
  },
];

export default routes;
