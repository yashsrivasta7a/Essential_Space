import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { SignupPage } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import SharedBrain from './Pages/SharedBrain';
import ProtectedRoute from './hooks/ProtectedRoute';
import { useAuth } from './hooks/useAuth';
import { ToastProvider } from './components/ui/Toast';
import { Toaster } from './components/ui/Toaster';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ToastProvider>
      <Router>
        <Toaster />
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
    </ToastProvider>
  );
}

export default App;