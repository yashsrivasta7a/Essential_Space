
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const jwt = localStorage.getItem('tokennn');
  return jwt ? element : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
