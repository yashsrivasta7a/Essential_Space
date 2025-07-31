
import type { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface RouteInference {
  element : ReactElement
}


const ProtectedRoute = ({ element } :RouteInference) => {
  const jwt = localStorage.getItem('tokennn');
  return jwt ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
