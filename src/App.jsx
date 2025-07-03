import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToasterProvider } from './components/Toaster';
import AppRoutes from './routes/AppRoutes';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToasterProvider>
            <ErrorBoundary>
              <AppRoutes />
              <div className="text-green-500 text-3xl p-6">
  ✅ Tailwind is Working!
</div>

            </ErrorBoundary>
          </ToasterProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}