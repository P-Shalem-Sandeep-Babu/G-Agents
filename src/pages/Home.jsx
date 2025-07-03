import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { currentUser } = useAuth();
  
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">👩‍🏫 Welcome to Sandy</h1>
      <p className="text-xl mb-8">Your AI Teaching Companion</p>
      {currentUser ? (
        <Link 
          to="/dashboard" 
          className="btn-primary"
        >
          Go to Dashboard
        </Link>
      ) : (
        <div className="space-x-4">
          <Link to="/login" className="btn-primary">
            Login
          </Link>
          <Link to="/register" className="btn-secondary">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}