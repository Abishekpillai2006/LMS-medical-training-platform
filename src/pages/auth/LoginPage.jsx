import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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

const DEMO_ACCOUNTS = [
  { role: 'Learner', email: 'learner@demo.com', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { role: 'Faculty', email: 'faculty@demo.com', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { role: 'Admin', email: 'admin@demo.com', color: 'bg-slate-50 border-slate-200 text-slate-700' },
]

export default function LoginPage() {
  const { login } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  })

  const from = location.state?.from?.pathname

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

  const fillDemo = (email) => {
    setValue('email', email)
    setValue('password', 'MedTrain@123')
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="login-form">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-slate-400"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                id="login-submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shadow-blue-600/30"
              >
                {loading ? <><LoadingSpinner size="sm" color="text-white" /> Signing in…</> : 'Sign In'}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-3 text-center">Demo accounts — password: MedTrain@123</p>
              <div className="space-y-2">
                {DEMO_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.role}
                    type="button"
                    onClick={() => fillDemo(acc.email)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs font-medium transition-colors hover:opacity-80 ${acc.color}`}
                    id={`demo-${acc.role.toLowerCase()}`}
                  >
                    <span className="font-semibold">{acc.role}</span>
                    <span className="opacity-70">{acc.email}</span>
                  </button>
                ))}
              </div>
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
