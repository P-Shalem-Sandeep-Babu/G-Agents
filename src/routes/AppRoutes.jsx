import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import PageLoader from '../components/PageLoader';
import ErrorBoundary from '../components/ErrorBoundary';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Assistant = lazy(() => import('../pages/Assistant'));
const Lessons = lazy(() => import('../pages/Lessons'));
const Worksheets = lazy(() => import('../pages/Worksheets'));
const SpeechAnalysis = lazy(() => import('../pages/SpeechAnalysis'));
const Games = lazy(() => import('../pages/Games'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public routes with auth layout */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected routes with main layout */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/assistant" element={
              <ProtectedRoute>
                <Assistant />
              </ProtectedRoute>
            } />
            <Route path="/lessons" element={
              <ProtectedRoute>
                <Lessons />
              </ProtectedRoute>
            } />
            <Route path="/worksheets" element={
              <ProtectedRoute>
                <Worksheets />
              </ProtectedRoute>
            } />
            <Route path="/speech-analysis" element={
              <ProtectedRoute>
                <SpeechAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/games" element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            } />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;