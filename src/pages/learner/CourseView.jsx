import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'

const typeIcons = { video: '🎬', pdf: '📄', interactive: '🎮' }
const typeBg = {
  video: 'bg-blue-50 text-blue-600',
  pdf: 'bg-red-50 text-red-600',
  interactive: 'bg-purple-50 text-purple-600',
}

function VideoPlayer({ url }) {
  return (
    <div className="bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
      {url ? (
        <video controls className="w-full h-full">
          <source src={url} type="video/mp4" />
          <p className="text-white text-sm">Your browser does not support the video tag.</p>
        </video>
      ) : (
        <div className="text-center text-slate-400 p-8">
          <div className="text-5xl mb-3">🎬</div>
          <p className="text-sm font-medium">Video content</p>
          <p className="text-xs mt-1 opacity-60">In production, the video would stream here</p>
        </div>
      )}
    </div>
  )
}

function PDFViewer() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden min-h-80 flex items-center justify-center">
      <div className="text-center text-slate-400 p-8">
        <div className="text-5xl mb-3">📄</div>
        <p className="text-sm font-medium">Study Document</p>
        <p className="text-xs mt-1 opacity-60">Course reading content is shown below</p>
      </div>
    </div>
  )
}

function InteractiveModule() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl min-h-80 flex items-center justify-center">
      <div className="text-center p-8">
        <div className="text-5xl mb-3">🎮</div>
        <p className="text-sm font-semibold text-purple-800">Interactive Module</p>
        <p className="text-xs text-purple-600 mt-1">Simulation scenario loads here</p>
      </div>
    </div>
  )
}

export default function CourseView() {
  const { id } = useParams()
  const toast = useToast()
  const [activeModule, setActiveModule] = useState(null)

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/courses/${id}/modules`).then((r) => r.data),
  })

  const completeMutation = useMutation({
    mutationFn: (moduleId) => api.post(`/courses/${id}/modules/${moduleId}/complete`),
    onSuccess: () => {
      toast.success('Module marked as complete!')
      queryClient.invalidateQueries(['course', id])
    },
    onError: () => toast.error('Failed to update progress'),
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!course) {
    return <div className="text-center text-slate-500 py-16">Course not found.</div>
  }

  const modules = course.modules || []

  const current =
    modules.find((m) => m.id === activeModule) ||
    modules.find((m) => !m.completed && !m.locked) ||
    modules[0]

  const assessmentId = id === 'c4' ? 'nals-pretest' : 'pals-pretest'

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 transition-colors text-sm">
          ← Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-700 font-medium text-sm truncate">{course.name}</span>
      </div>

      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-bold text-slate-800">{course.name}</h1>
          <span className="text-sm text-slate-500">{course.progress || 0}% complete</span>
        </div>
        <ProgressBar value={course.progress || 0} color="auto" showPercent={false} />

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to={`/learner/assessment/${assessmentId}`}
            className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700"
          >
            Take Pretest
          </Link>

          <Link
            to={`/learner/assessment/${assessmentId}`}
            className="px-5 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700"
          >
            Take Post Test
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800 text-sm">Modules</h2>
            </div>

            <div className="divide-y divide-slate-50">
              {modules.map((mod, i) => (
                <button
                  key={mod.id}
                  disabled={mod.locked}
                  onClick={() => !mod.locked && setActiveModule(mod.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors text-sm
                    ${mod.locked ? 'opacity-40 cursor-not-allowed' : 'hover:bg-slate-50 cursor-pointer'}
                    ${current?.id === mod.id ? 'bg-blue-50' : ''}
                  `}
                >
                  <div
                    className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs
                    ${mod.completed
                        ? 'bg-green-500 text-white'
                        : mod.locked
                          ? 'bg-slate-200 text-slate-400'
                          : 'bg-slate-100 text-slate-600'
                      }
                  `}
                  >
                    {mod.completed ? '✓' : mod.locked ? '🔒' : i + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`font-medium truncate ${current?.id === mod.id ? 'text-blue-700' : 'text-slate-700'}`}>
                      {mod.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{mod.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-4">
          {current && (
            <>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${typeBg[current.type]}`}>
                    {typeIcons[current.type]}
                  </span>

                  <div>
                    <h2 className="font-bold text-slate-800">{current.title}</h2>
                    <p className="text-xs text-slate-500 capitalize">
                      {current.type} · {current.duration}
                    </p>
                  </div>
                </div>

                {current.type === 'video' && <VideoPlayer url={current.contentUrl} />}
                {current.type === 'pdf' && <PDFViewer />}
                {current.type === 'interactive' && <InteractiveModule />}

                <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-800 mb-2">Study Content</h3>
                  <p className="text-sm text-slate-700 leading-6 whitespace-pre-line">
                    {current.studyContent || 'No study content available for this module.'}
                  </p>

                  {current.keyPoints?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-slate-800 text-sm mb-2">Key Points</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {current.keyPoints.map((point, index) => (
                          <li key={index} className="text-sm text-slate-600">
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xs text-slate-400">Review the content before marking complete</p>

                  {!current.completed ? (
                    <button
                      onClick={() => completeMutation.mutate(current.id)}
                      disabled={completeMutation.isPending}
                      className="px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
                    >
                      {completeMutation.isPending ? <LoadingSpinner size="sm" color="text-white" /> : '✓'}
                      Mark as Complete
                    </button>
                  ) : (
                    <span className="flex items-center gap-1.5 text-green-600 text-sm font-semibold">
                      <span className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs">
                        ✓
                      </span>
                      Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                {modules.indexOf(current) > 0 && (
                  <button
                    onClick={() => setActiveModule(modules[modules.indexOf(current) - 1].id)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    ← Previous
                  </button>
                )}

                {modules.indexOf(current) < modules.length - 1 && (
                  <button
                    onClick={() => {
                      const next = modules[modules.indexOf(current) + 1]
                      if (!next.locked) setActiveModule(next.id)
                      else toast.warn('Complete the current module first')
                    }}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Next →
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}