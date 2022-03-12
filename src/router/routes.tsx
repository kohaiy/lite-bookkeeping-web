import { RouteObject } from 'react-router-dom';
import Home from '@/pages/home';
import AuthLogin from '@/pages/auth/Login';
import AuthRegister from '@/pages/auth/Register';
import BillAdd from '@/pages/bill/BillAdd';

export interface RouteParams extends RouteObject {
  // default `true`
  auth?: boolean;
}

const routes: RouteParams[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    auth: false,
    element: <AuthLogin />,
  },
  {
    path: '/register',
    auth: false,
    element: <AuthRegister />,
  },
  {
    path: '/bill-add',
    element: <BillAdd />,
  },
];

export default routes;
