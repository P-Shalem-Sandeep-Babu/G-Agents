import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToasterProvider } from './components/Toaster';
import AppRoutes from './routes';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToasterProvider>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </ToasterProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}