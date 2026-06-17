import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0f1e26] text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-cyan-400 border-slate-700"></div>
          <p className="text-slate-400 text-sm animate-pulse-slow">Loading clinical interface...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Redirect them to login page but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
export default ProtectedRoute;
