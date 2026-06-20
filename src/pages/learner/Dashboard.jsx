import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { useAuth } from '@/context/AuthContext'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { EmptyState } from '@/components/shared/EmptyState'
import { format, differenceInDays } from 'date-fns'

function StatCard({ icon, label, value, sub, color = 'blue' }) {
  const colors = { 
    blue: 'bg-blue-50 text-blue-600 border-blue-100', 
    green: 'bg-green-50 text-green-600 border-green-100', 
    amber: 'bg-amber-50 text-amber-600 border-amber-100', 
    red: 'bg-red-50 text-red-600 border-red-100' 
  }
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm shadow-slate-100/50 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${colors[color]} border flex items-center justify-center text-xl mb-3`}>{icon}</div>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
      <p className="text-sm font-medium text-slate-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  )
}

export default function LearnerDashboard() {
  const { user } = useAuth()

  const { data, isLoading, error } = useQuery({
    queryKey: ['learner-dashboard'],
    queryFn: () => api.get('/learner/dashboard').then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (error) return <div className="text-red-500 text-sm text-center py-16">Failed to load dashboard. Please sign in again.</div>

  const { courses = [], simulations = [], certificates = [], notifications = [] } = data || {}

  const activeCourses = courses.filter(c => c.status !== 'completed')
  const completedCourses = courses.filter(c => c.status === 'completed')

  const validCerts = certificates.filter(c => c.status === 'valid').length
  const expiring = certificates.filter(c => c.status === 'expiring').length

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 overflow-hidden shadow-lg shadow-blue-600/10">
        <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
        <div className="absolute right-16 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/3" />
        <div className="relative z-10">
          <p className="text-blue-200 text-sm font-medium mb-1">Welcome back 👋</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{user?.name}</h1>
          <p className="text-blue-200 text-sm">{user?.hospital || 'Apollo Hospitals'} · {user?.department || 'Emergency Medicine'} · {format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="📚" label="Enrolled Courses" value={courses.length} color="blue" />
        <StatCard icon="🏆" label="Certifications Earned" value={certificates.length} color="green" sub={expiring ? `${expiring} expiring soon` : undefined} />
        <StatCard icon="📅" label="Upcoming Sessions" value={simulations.length} color="amber" />
        <StatCard icon="🔔" label="Notifications" value={notifications.length} color="red" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Columns - Courses */}
        <div className="xl:col-span-2 space-y-6">
          {/* Active Enrolled Courses */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <span>📖</span> Enrolled Courses ({activeCourses.length})
            </h2>
            {activeCourses.length === 0 ? (
              <EmptyState icon="📚" title="No active courses" description="You have completed all your courses, or are not enrolled yet." />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {activeCourses.map((c) => (
                  <Link
                    key={c.courseId}
                    to={`/learner/course/${c.courseId}`}
                    className="block bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                    id={`course-card-${c.courseId}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-flex px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded border border-blue-100 mb-1.5">{c.programCode}</span>
                        <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{c.courseName}</h3>
                        <p className="text-xs text-slate-500 mt-1">
                          <span>Next: {c.nextModule}</span>
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full border border-slate-200">
                        {c.progress}%
                      </span>
                    </div>
                    <ProgressBar value={c.progress} color="blue" showPercent={false} />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Completed Courses */}
          {completedCourses.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>✅</span> Completed Courses ({completedCourses.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {completedCourses.map((c) => (
                  <div
                    key={c.courseId}
                    className="bg-emerald-50/20 border border-emerald-100 rounded-2xl p-5 flex items-center justify-between"
                  >
                    <div>
                      <span className="inline-flex px-2 py-0.5 bg-green-50 text-green-700 text-xs font-bold rounded border border-green-100 mb-1.5">{c.programCode}</span>
                      <h3 className="font-semibold text-slate-800">{c.courseName}</h3>
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">Completed & Certified</p>
                    </div>
                    <Link
                      to="/learner/certificates"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                    >
                      View Certificate
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column - Certifications, Simulations, Alerts */}
        <div className="space-y-6">
          {/* Upcoming simulations */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span>📅</span> Upcoming Sessions
            </h2>
            {simulations.length === 0 ? (
              <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center text-sm text-slate-400">No upcoming simulation lab sessions</div>
            ) : (
              <div className="space-y-3">
                {simulations.map((s) => (
                  <div key={s.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center text-lg flex-shrink-0">📅</div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-800 truncate">{s.scenario}</p>
                        <p className="text-xs text-slate-500">{format(new Date(s.date), 'MMM d, yyyy')} at {s.time} · {s.room}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active certifications */}
          <div>
            <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
              <span>🏆</span> Active Certificates
            </h2>
            {certificates.length === 0 ? (
              <div className="bg-white rounded-2xl p-5 border border-slate-100 text-center text-sm text-slate-400">Complete a course and pass the Post-Test to earn certificates</div>
            ) : (
              <div className="space-y-3">
                {certificates.map((cert) => {
                  const daysLeft = differenceInDays(new Date(cert.expiryDate), new Date())
                  return (
                    <div key={cert.id} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm shadow-slate-100/50">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-semibold text-slate-800 truncate">{cert.programName}</p>
                        <StatusBadge status={cert.status} />
                      </div>
                      <p className="text-xs text-slate-500">
                        Expires {format(new Date(cert.expiryDate), 'MMM d, yyyy')}
                        {cert.status !== 'expired' && <span className="ml-1 text-amber-600 font-medium">({daysLeft}d left)</span>}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Notifications */}
          {notifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span>🔔</span> Latest Notifications
              </h2>
              <div className="space-y-2">
                {notifications.slice(0, 3).map((n) => (
                  <div key={n.id} className="bg-amber-50/50 border border-amber-100 rounded-xl p-3 flex gap-2">
                    <span className="text-amber-500">🔔</span>
                    <p className="text-xs text-amber-800 font-medium">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
