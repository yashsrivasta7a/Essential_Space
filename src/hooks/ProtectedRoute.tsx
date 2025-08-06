import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface ProtectedRouteProps {
  element: ReactElement;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;