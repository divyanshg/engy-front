import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';

function Public() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated || user) {
    return <Navigate to="/rooms" />;
  } else {
    return <Outlet />;
  }
}

export default Public;
