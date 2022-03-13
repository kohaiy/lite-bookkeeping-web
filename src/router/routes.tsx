import { RouteObject } from 'react-router-dom';
import AuthLogin from '@/pages/auth/Login';
import AuthRegister from '@/pages/auth/Register';
import BillAdd from '@/pages/bill/BillAdd';
import Main from '@/layouts/Main';
import BillList from '@/pages/bill/BillList';
import UserHome from '@/pages/user/Home';

export interface RouteParams extends RouteObject {
    // default `true`
    auth?: boolean;
    children?: RouteParams[];
}

const routes: RouteParams[] = [
    {
        path: '/',
        element: <Main></Main>,
        children: [
            { path: '', element: <BillList /> },
            { path: 'bill-add', element: <BillAdd /> },
            { path: 'user', element: <UserHome /> },
        ],
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
];

export default routes;
