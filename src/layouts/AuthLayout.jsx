import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img src={logo} alt="Sandy Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800">
              Sandy <span className="text-blue-600">AI</span>
            </h1>
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}