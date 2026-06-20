import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { StatusBadge } from '@/components/shared/StatusBadge'

const FILTER_OPTIONS = ['All', 'Passed', 'Failed', 'Pending']

export default function LearnerMonitor() {
  const { id } = useParams()
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: ['batch-learners', id],
    queryFn: () => api.get(`/faculty/batch/${id}/learners`).then(r => r.data),
  })

  if (isLoading) return <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
  if (!data) return <div className="text-center text-slate-500 py-16">Batch not found.</div>

  const { batch, learners = [] } = data

  const filtered = learners.filter(l => {
    const matchFilter = filter === 'All' ||
      (filter === 'Passed'  && l.osceStatus === 'pass') ||
      (filter === 'Failed'  && l.osceStatus === 'fail') ||
      (filter === 'Pending' && l.osceStatus === 'pending')
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/faculty" className="text-slate-400 hover:text-slate-600 text-sm">← Dashboard</Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm font-medium text-slate-700">{batch?.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-800">{batch?.programName}</h1>
          <p className="text-slate-500 text-sm">{batch?.name} · {learners.length} learners</p>
        </div>
        <div className="sm:ml-auto flex gap-2">
          {FILTER_OPTIONS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              id={`filter-${f.toLowerCase()}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
        <input
          type="text"
          id="learner-search"
          placeholder="Search learner..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="table-scroll">
          <table className="w-full text-sm" id="learner-monitor-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                {['Learner', 'Department', 'Post-Test', 'OSCE', 'Attendance', 'Certification', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-slate-50 transition-colors" id={`learner-row-${l.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {l.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="font-medium text-slate-800 whitespace-nowrap">{l.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{l.department}</td>
                  <td className="px-4 py-3">
                    <span className={`font-semibold ${l.postTestScore >= 70 ? 'text-green-600' : 'text-red-500'}`}>{l.postTestScore}%</span>
                  </td>
                  <td className="px-4 py-3"><StatusBadge status={l.osceStatus} /></td>
                  <td className="px-4 py-3 text-slate-600">{l.attendance}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.certStatus} /></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/faculty/osce/s1/${l.id}`}
                        className="px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-lg hover:bg-purple-200 transition-colors whitespace-nowrap"
                        id={`osce-eval-${l.id}`}
                      >
                        OSCE
                      </Link>
                      <Link
                        to={`/faculty/feedback/${l.id}`}
                        className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap"
                        id={`feedback-${l.id}`}
                      >
                        Feedback
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500 text-sm">No learners found for the selected filter.</div>
          )}
        </div>
      </div>
    </div>
  )
}
