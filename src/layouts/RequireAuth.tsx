import { useLayoutEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';

// TODO
const getToken = () => {
  return localStorage.getItem('token');
};

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const [isLoading, setLoading] = useState(true);
  let auth = useAuth();
  let location = useLocation();
  useLayoutEffect(() => {
    const token = getToken();
    if (!auth.user && token) {
      // TODO 模拟鉴权
      setTimeout(() => {
        auth.setUser({
          token,
        });
        setLoading(false);
      }, 0);
    } else {
      setLoading(false);
    }
  }, []);

  if (!auth.user) {
    return <>{isLoading ? 'loading auth...' : <Navigate to="/login" state={{ from: location }} replace />}</>;
  }

  return children;
}
