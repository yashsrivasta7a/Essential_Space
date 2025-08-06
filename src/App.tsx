import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { SignupPage } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import SharedBrain from './Pages/SharedBrain';
import ProtectedRoute from './hooks/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signin />} 
        />
        
        <Route 
          path="/signup" 
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <SignupPage />} 
        />
        
        <Route 
          path="/signin" 
          element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Signin />} 
        />
        
        <Route 
          path="/share/:shareLink" 
          element={<SharedBrain />} 
        />
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute element={<Dashboard />} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;