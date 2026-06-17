import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Stethoscope, Lock, Mail, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setFormError(err.message || 'Invalid credentials or connection issue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Diagnostic helper to auto-fill development logins
  const fillCredentials = (role) => {
    const defaultLogins = {
      LEARNER: { email: 'learner@pulsemed.edu', pass: 'learnerpass123' },
      FACULTY: { email: 'faculty@pulsemed.edu', pass: 'facultypass123' },
      ADMIN: { email: 'admin@pulsemed.edu', pass: 'adminpass123' }
    };
    setEmail(defaultLogins[role].email);
    setPassword(defaultLogins[role].pass);
    setFormError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#091216] relative overflow-hidden font-sans text-white p-4">
      {/* Background Ambient Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-teal-900/10 blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Main Glass Panel */}
      <div className="w-full max-w-lg glass-panel rounded-3xl border border-medical-800/30 p-8 md:p-10 shadow-2xl relative z-10 animate-slide-up">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-teal-400 flex items-center justify-center shadow-lg shadow-cyan-500/20 mb-4 animate-pulse-slow">
            <Stethoscope size={30} className="text-[#091216]" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-medical-200 to-cyan-300 bg-clip-text text-transparent">
            PulseMed
          </h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold">
            Clinical Training & Certification
          </p>
        </div>

        {formError && (
          <div className="mb-6 flex items-start gap-3 bg-red-950/40 border border-red-500/20 rounded-xl p-4 text-red-200 text-sm animate-fade-in">
            <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
            <span>{formError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Clinical Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dr.keller@pulsemed.edu"
                className="w-full bg-[#12222b] border border-medical-800/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
              Credentials Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#12222b] border border-medical-800/30 rounded-xl py-3 pl-11 pr-4 text-sm focus:border-cyan-400 focus:outline-none transition-all placeholder-slate-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3.5 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 active:from-cyan-700 active:to-teal-600 font-semibold text-sm rounded-xl text-white shadow-lg shadow-cyan-950 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating Session...' : 'Establish Session'}
            {!isSubmitting && <ArrowRight size={16} />}
          </button>
        </form>

        {/* Development Quick Helper Panel */}
        <div className="mt-8 border-t border-medical-800/20 pt-6">
          <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <UserCheck size={14} className="text-cyan-400" />
            <span>Developer Sandbox Logins</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => fillCredentials('LEARNER')}
              type="button"
              className="py-1.5 px-2.5 bg-[#12222b] hover:bg-[#1a2f3a] text-[11px] rounded-lg text-slate-300 border border-medical-800/10 hover:border-cyan-400/20 transition-all font-medium"
            >
              Learner
            </button>
            <button
              onClick={() => fillCredentials('FACULTY')}
              type="button"
              className="py-1.5 px-2.5 bg-[#12222b] hover:bg-[#1a2f3a] text-[11px] rounded-lg text-slate-300 border border-medical-800/10 hover:border-cyan-400/20 transition-all font-medium"
            >
              Faculty
            </button>
            <button
              onClick={() => fillCredentials('ADMIN')}
              type="button"
              className="py-1.5 px-2.5 bg-[#12222b] hover:bg-[#1a2f3a] text-[11px] rounded-lg text-slate-300 border border-medical-800/10 hover:border-cyan-400/20 transition-all font-medium"
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
