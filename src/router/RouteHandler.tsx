import { getUserInfo } from '@/apis/modules/user';
import { getToken } from '@/helpers/storage';
import { useLayoutEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

export interface Props {
    auth?: boolean;
}

const RouteHandler: React.FC<Props> = ({ auth, children }) => {
    const token = getToken();
    const [isLoading, setLoading] = useState(true);
    const [isInvalid, setInvalid] = useState(false);
    let authData = useAuth();
    let { user } = authData;
    let location = useLocation();
    useLayoutEffect(() => {
        console.log('useLayoutEffect', location.pathname);
        if (!user && token) {
            getUserInfo().then(({ data }) => {
                if (data) {
                    user = { token, ...data };
                    authData.setUser(user);
                } else {
                    setInvalid(true);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
            setInvalid(true);
        }
    }, [location]);
    if (auth === false) {
        if (isLoading) return <></>;
        if (isInvalid) return <>{children}</>;
        console.log('to /');
        return (
            <>
                <Navigate to="/" state={{ from: location }} replace />
            </>
        );
    } else if (!user) {
        if (isLoading) return <></>;
        console.log('to /login');
        return (
            <>
                <Navigate to="/login" state={{ from: location }} replace />
            </>
        );
    }

    return <>{children}</>;
};

export default RouteHandler;
