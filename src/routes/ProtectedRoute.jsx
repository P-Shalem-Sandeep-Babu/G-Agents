import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PageLoader from '../components/PageLoader';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return <PageLoader />;
  if (!currentUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;