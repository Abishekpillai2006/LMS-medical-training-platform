import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

const ROLE_CONFIGS = {
  learner: {
    label: 'Learner',
    icon: '🎓',
    email: 'learner@demo.com',
    password: 'MedTrain@123',
    colorClass: 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-sm shadow-blue-500/10',
    hoverClass: 'hover:border-blue-200 hover:bg-blue-50/20',
    btnClass: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30 focus:ring-blue-500',
    ringClass: 'focus:ring-blue-500',
    linkClass: 'text-blue-600 hover:text-blue-700',
  },
  faculty: {
    label: 'Faculty',
    icon: '🩺',
    email: 'faculty@demo.com',
    password: 'MedTrain@123',
    colorClass: 'border-violet-500 bg-violet-50/50 text-violet-700 shadow-sm shadow-violet-500/10',
    hoverClass: 'hover:border-violet-200 hover:bg-violet-50/20',
    btnClass: 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/30 focus:ring-violet-500',
    ringClass: 'focus:ring-violet-500',
    linkClass: 'text-violet-600 hover:text-violet-700',
  },
  admin: {
    label: 'Admin',
    icon: '🛡️',
    email: 'admin@demo.com',
    password: 'MedTrain@123',
    colorClass: 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-sm shadow-emerald-500/10',
    hoverClass: 'hover:border-emerald-200 hover:bg-emerald-50/20',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30 focus:ring-emerald-500',
    ringClass: 'focus:ring-emerald-500',
    linkClass: 'text-emerald-600 hover:text-emerald-700',
  }
}

export default function LoginPage() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState('learner')

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const from = location.state?.from?.pathname

  useEffect(() => {
    const config = ROLE_CONFIGS[selectedRole]
    if (config) {
      setValue('email', config.email)
      setValue('password', config.password)
    }
  }, [selectedRole, setValue])

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      const user = await login(data.email, data.password)
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`)
      const redirectMap = { learner: '/learner', faculty: '/faculty', admin: '/admin' }
      navigate(from || redirectMap[user.role] || '/login', { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-md text-center">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/40">
            <span className="text-white text-3xl font-bold">MT</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">MedTrain LMS</h1>
          <p className="text-blue-200 text-lg mb-8">AI-Enabled Healthcare Learning Management System</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            {['BLS', 'ACLS', 'PALS', 'NALS', 'ATLS', 'BLSO'].map((prog) => (
              <div key={prog} className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-white font-bold text-sm">{prog}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-left">
            {[
              { icon: '🎓', text: 'Structured emergency care curriculum' },
              { icon: '🤖', text: 'AI-powered personalized feedback' },
              { icon: '📋', text: 'OSCE evaluations & certifications' },
              { icon: '📊', text: 'Real-time progress analytics' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                <span className="text-lg">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden justify-center">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">MT</span>
            </div>
            <span className="text-xl font-bold text-slate-800">MedTrain LMS</span>
          </div>

          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h2>
            <p className="text-slate-500 text-sm mb-6">Sign in to your training portal</p>

            {/* Path Selection Tabs */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              {Object.entries(ROLE_CONFIGS).map(([key, role]) => {
                const isActive = selectedRole === key
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedRole(key)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? `${role.colorClass} border-2 font-semibold scale-[1.02]` 
                        : `border-slate-200 bg-white text-slate-600 ${role.hoverClass} hover:scale-[1.01]`
                    }`}
                  >
                    <span className="text-xl mb-1">{role.icon}</span>
                    <span className="text-xs font-semibold">{role.label}</span>
                  </button>
                )
              })}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="login-form">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 ${ROLE_CONFIGS[selectedRole].ringClass} focus:border-transparent transition-all placeholder:text-slate-400`}
                  placeholder="you@medtrain.io"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password')}
                  className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 ${ROLE_CONFIGS[selectedRole].ringClass} focus:border-transparent transition-all placeholder:text-slate-400`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <div className="text-xs text-slate-400 mt-1 italic">
                Demo credentials automatically prefilled for testing.
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className={`w-full py-3 disabled:opacity-70 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${ROLE_CONFIGS[selectedRole].btnClass}`}
              >
                {loading ? <><LoadingSpinner size="sm" color="text-white" /> Signing in…</> : `Sign In as ${ROLE_CONFIGS[selectedRole].label}`}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center text-sm">
              <span className="text-slate-500">Don't have an account? </span>
              <Link to="/register" className={`hover:underline font-semibold ${ROLE_CONFIGS[selectedRole].linkClass}`} id="register-link">
                Create Account
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            MedTrain LMS · Emergency Care Training Platform · 2026
          </p>
        </div>
      </div>
    </div>
  )
}
