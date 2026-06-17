import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin-settings',
    element: (
      <ProtectedRoute>
        <RoleGuard allowedRoles={['ADMIN']}>
          {/* Admin specific configuration view placeholder */}
          <div className="flex h-screen items-center justify-center bg-[#0f1e26] text-white">
            <h1 className="text-xl">Admin Settings Console</h1>
          </div>
        </RoleGuard>
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
]);

export default router;
