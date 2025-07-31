
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { SignupPage } from './Pages/Signup';
import { Signin } from './Pages/Signin';
import SharedBrain from './Pages/SharedBrain';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  const jwt = localStorage.getItem('tokennn');
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Navigate to={jwt ? "/dashboard" : "/signin"} replace />} />

        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/share/:shareLink" element={<SharedBrain />} />
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
