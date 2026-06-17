import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ShieldAlert } from 'lucide-react';

export const RoleGuard = ({ allowedRoles, children }) => {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0f1e26] text-white p-4">
        <div className="max-w-md w-full glass-panel rounded-2xl p-8 border border-red-500/20 text-center flex flex-col items-center gap-6 animate-slide-up">
          <div className="p-4 bg-red-500/10 rounded-full text-red-400">
            <ShieldAlert size={48} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-red-400">Access Denied</h1>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              Your account role <span className="text-white font-semibold font-mono bg-slate-800 px-2 py-0.5 rounded">{user?.role}</span> does not have permissions to access this administrative module.
            </p>
          </div>
          <Link
            to="/dashboard"
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-medium rounded-lg text-sm transition-all shadow-md shadow-cyan-950"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return children;
};
export default RoleGuard;
