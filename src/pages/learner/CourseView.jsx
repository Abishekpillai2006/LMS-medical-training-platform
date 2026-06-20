import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import api from '@/lib/axios'
import { ProgressBar } from '@/components/shared/ProgressBar'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { useToast } from '@/context/ToastContext'
import { queryClient } from '@/lib/queryClient'

// A mock vector/illustration for clinical imagery placeholder
function MedicalChartIllustration() {
  return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 aspect-[16/6] my-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      <svg className="w-12 h-12 text-blue-500 mb-2 opacity-80 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <p className="text-sm font-semibold text-slate-700">Clinical Reference Diagram</p>
      <p className="text-xs text-slate-400 mt-1">Illustrating emergency airway/ventilation vectors</p>
    </div>
  )
}

function ModuleQuizSection({ moduleId, onQuizPassed }) {
  const toast = useToast()
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [quizResult, setQuizResult] = useState(null)

  const { data: quiz, isLoading, error, refetch } = useQuery({
    queryKey: ['quiz', moduleId],
    queryFn: () => api.get(`/modules/${moduleId}/quiz`).then(r => r.data),
    enabled: !!moduleId
  })

  // Reset states when the module changes
  useEffect(() => {
    setQuizResult(null)
    setSelectedAnswers({})
  }, [moduleId])

  const submitMutation = useMutation({
    mutationFn: (answers) => api.post(`/modules/${moduleId}/submit`, { answers }).then(r => r.data),
    onSuccess: (data) => {
      setQuizResult(data)
      if (data.passed) {
        toast.success(`Passed! You scored ${data.score}%.`)
        onQuizPassed()
      } else {
        toast.error(`Not passed. You scored ${data.score}%. Required is 80%.`)
      }
    },
    onError: () => toast.error('Failed to submit quiz answers')
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="md" />
      </div>
    )
  }

  if (error || !quiz) {
    return (
      <div className="text-center text-slate-500 py-8 border border-slate-100 rounded-xl bg-slate-50">
        No quiz available for this module.
      </div>
    )
  }

  const questions = quiz.questions || []

  const handleOptionChange = (qId, optionIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIndex
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Verify all questions are answered
    if (Object.keys(selectedAnswers).length < questions.length) {
      toast.warn('Please answer all questions before submitting.')
      return
    }
    submitMutation.mutate(selectedAnswers)
  }

  const handleRetry = () => {
    setQuizResult(null)
    setSelectedAnswers({})
  }

  // Quiz Results View
  if (quizResult) {
    const { score, passed, correct, total, review } = quizResult
    return (
      <div className="space-y-6 animate-fade-in">
        <div className={`rounded-2xl p-6 text-center border ${passed ? 'bg-green-50/50 border-green-200 text-green-800' : 'bg-rose-50/50 border-rose-200 text-rose-800'}`}>
          <span className="text-5xl block mb-2">{passed ? '🎉' : '✍️'}</span>
          <h4 className="text-2xl font-bold mb-1">{passed ? 'Quiz Passed!' : 'Quiz Attempt Failed'}</h4>
          <p className="text-sm opacity-90 mb-4">You scored {score}% ({correct}/{total} correct). Required pass score is 80% (4/5).</p>
          
          {passed ? (
            <span className="px-4 py-2 bg-green-600 text-white font-bold text-sm rounded-lg inline-block">
              Module Complete
            </span>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg transition-colors inline-block"
              >
                Retry Quiz
              </button>
              <p className="text-xs opacity-75">Review the study materials in the first tab and try again.</p>
            </div>
          )}
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 bg-slate-50">
            <h4 className="font-bold text-slate-800 text-sm">Question Review</h4>
          </div>
          <div className="divide-y divide-slate-100">
            {review.map((r, idx) => {
              const originalQuestion = questions.find(q => q.id === r.questionId)
              if (!originalQuestion) return null
              
              return (
                <div key={r.questionId} className={`p-5 ${r.isCorrect ? 'bg-green-50/20' : 'bg-rose-50/20'}`}>
                  <div className="flex gap-3">
                    <span className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${r.isCorrect ? 'bg-green-500 text-white' : 'bg-rose-500 text-white'}`}>
                      {r.isCorrect ? '✓' : '✕'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800 mb-2">{idx + 1}. {originalQuestion.text}</p>
                      <div className="space-y-1.5">
                        {originalQuestion.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`flex items-center gap-2 text-xs py-1.5 px-3 rounded
                              ${oIdx === r.correct ? 'bg-green-100/50 text-green-800 font-semibold' : ''}
                              ${oIdx === r.selected && !r.isCorrect ? 'bg-rose-100/50 text-rose-800 line-through' : ''}
                              ${oIdx !== r.correct && oIdx !== r.selected ? 'text-slate-500' : ''}
                            `}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center text-[8px]
                              ${oIdx === r.correct ? 'border-green-600 bg-green-600 text-white' : 'border-slate-300'}
                            `}>
                              {oIdx === r.correct ? '✓' : ''}
                            </span>
                            <span>{opt}</span>
                            {oIdx === r.selected && !r.isCorrect && (
                              <span className="text-rose-500 font-medium ml-1">(Your choice)</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Quiz Taking View
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex justify-between items-center text-sm">
        <span className="font-semibold text-slate-700">Mandatory Assessment</span>
        <span className="text-slate-500">5 Questions · 80% passing score</span>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-800 mb-4">{idx + 1}. {q.text}</p>
            <div className="grid grid-cols-1 gap-2.5">
              {q.options.map((opt, oIdx) => {
                const inputId = `quiz-${q.id}-opt-${oIdx}`
                const isChecked = selectedAnswers[q.id] === oIdx
                
                return (
                  <label
                    key={oIdx}
                    htmlFor={inputId}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all text-xs font-medium
                      ${isChecked
                        ? 'border-blue-600 bg-blue-50/50 text-blue-900'
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`question-${q.id}`}
                      checked={isChecked}
                      onChange={() => handleOptionChange(q.id, oIdx)}
                      className="w-4 h-4 accent-blue-600"
                    />
                    <span>{opt}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={submitMutation.isPending}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-600/10 flex items-center justify-center gap-2"
      >
        {submitMutation.isPending && <LoadingSpinner size="sm" color="text-white" />}
        Submit Quiz Answers
      </button>
    </form>
  )
}

export default function CourseView() {
  const { id } = useParams()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState('study') // 'study' | 'quiz'
  const [currentModuleId, setCurrentModuleId] = useState(null) // selected sidebar item id ('pretest', 'posttest', or moduleId)

  const { data: course, isLoading, refetch } = useQuery({
    queryKey: ['course', id],
    queryFn: () => api.get(`/courses/${id}/modules`).then((r) => r.data),
  })

  // Select active panel when data completes loading
  useEffect(() => {
    if (course && course.modules && course.modules.length > 0) {
      const nextActive = course.modules.find(m => !m.completed && !m.locked)
      setCurrentModuleId(nextActive ? nextActive.id : course.modules[0].id)
    }
  }, [course])

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

  // Resolve current active module item
  let activeModule = null
  let showPostTestPanel = false

  if (currentModuleId === 'posttest') {
    showPostTestPanel = true
  } else {
    activeModule = modules.find(m => m.id === currentModuleId) || (modules.length > 0 ? modules[0] : null)
  }

  // Check if posttest is unlocked (all modules are complete)
  const isPostTestUnlocked = modules.length > 0 && modules.every(m => m.completed)

  const handleQuizPassed = () => {
    refetch()
    setActiveTab('study')
  }

  return (
    <div className="space-y-4 animate-fade-in pb-12">
      {/* Header crumbs */}
      <div className="flex items-center gap-3">
        <Link to="/learner" className="text-slate-400 hover:text-slate-600 transition-colors text-xs font-semibold">
          ← Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-600 font-medium text-xs truncate">{course.name}</span>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm shadow-slate-100/30">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="font-bold text-slate-800 text-lg leading-tight">{course.name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">Sequential Learner Workflow</p>
          </div>
          <div className="text-right">
            <span className="text-sm font-bold text-blue-600">{course.progress || 0}% Complete</span>
          </div>
        </div>
        <ProgressBar value={course.progress || 0} color="blue" showPercent={false} />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3.5 border-b border-slate-100 bg-slate-50">
              <h2 className="font-bold text-slate-800 text-sm">Course Flow</h2>
            </div>

            <div className="divide-y divide-slate-100">

              {/* Modules Items */}
              {modules.map((mod, idx) => {
                const isActive = currentModuleId === mod.id
                return (
                  <button
                    key={mod.id}
                    disabled={mod.locked}
                    onClick={() => {
                      setCurrentModuleId(mod.id)
                      setActiveTab('study')
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold
                      ${mod.locked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}
                      ${isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                    `}
                  >
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                      ${mod.completed
                        ? 'bg-green-500 text-white'
                        : mod.locked
                          ? 'bg-slate-200 text-slate-400'
                          : 'bg-blue-600 text-white'
                      }
                    `}>
                      {mod.completed ? '✓' : mod.locked ? '🔒' : idx + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate font-semibold ${isActive ? 'text-blue-800' : 'text-slate-700'}`}>
                        {mod.title}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium">{mod.duration}</p>
                    </div>
                  </button>
                )
              })}

              {/* Posttest Item */}
              <button
                disabled={!isPostTestUnlocked}
                onClick={() => setCurrentModuleId('posttest')}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors text-xs font-semibold
                  ${!isPostTestUnlocked ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:bg-slate-50'}
                  ${currentModuleId === 'posttest' ? 'bg-blue-50 text-blue-800' : 'text-slate-700'}
                `}
              >
                <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px]
                  ${course.postTestPassed
                    ? 'bg-green-500 text-white'
                    : !isPostTestUnlocked
                      ? 'bg-slate-200 text-slate-400'
                      : 'bg-purple-600 text-white'
                  }
                `}>
                  {course.postTestPassed ? '✓' : '🏆'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate">Final Post-Test</p>
                  <p className="text-[10px] text-slate-400 font-medium">Certificate Eligibility</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-3">

          {/* PANEL 2: Post-Test Block */}
          {showPostTestPanel && (
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm text-center max-w-xl mx-auto space-y-4">
              <span className="text-6xl block">🏆</span>
              <h2 className="text-xl font-bold text-slate-800">Final Post-Test</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                Congratulations on completing all 6 modules and quizzes! You are now eligible to take the final evaluation. 70% passing score is required to unlock your certification.
              </p>

              {course.postTestPassed ? (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-sm font-semibold inline-block">
                    ✓ Course Completed! Certificate generated successfully.
                  </div>
                  <div>
                    <Link
                      to="/learner/certificates"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-colors inline-block"
                    >
                      View Certificates
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="pt-2">
                  <Link
                    to={`/learner/assessment/${course.postTestId}`}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-600/10 transition-colors inline-block"
                  >
                    Start Final Post-Test
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* PANEL 3: Active Module Learning Experience */}
          {activeModule && (
            <div className="space-y-4">
              {/* Tab Navigation */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-1.5 flex gap-2">
                <button
                  onClick={() => setActiveTab('study')}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all
                    ${activeTab === 'study' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  📖 Study Material
                </button>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all
                    ${activeTab === 'quiz' 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'hover:bg-slate-50 text-slate-600'
                    }`}
                >
                  ✍️ Practice Quiz
                </button>
              </div>

              {/* Tab 1 Content: Detailed study items */}
              {activeTab === 'study' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
                  {/* Module header */}
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-xl font-bold text-slate-800">{activeModule.title}</h2>
                    <p className="text-xs text-slate-500 mt-1 capitalize">Study Session · {activeModule.duration}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div className="bg-green-50/40 border border-green-100 rounded-xl p-5">
                    <h4 className="font-bold text-green-900 text-sm flex items-center gap-1.5 mb-2">
                      <span>🎯</span> Learning Objectives
                    </h4>
                    <p className="text-xs text-green-800 leading-relaxed font-medium">
                      {activeModule.learningObjectives || 'Analyze critical steps for assessment and rapid intervention.'}
                    </p>
                  </div>

                  {/* Detailed Study Content */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-800 text-sm">Detailed Study Content</h4>
                    <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line bg-slate-50/50 p-5 rounded-xl border border-slate-100">
                      {activeModule.studyContent}
                    </p>
                  </div>

                  {/* Clinical Scenarios */}
                  {activeModule.clinicalScenarios && (
                    <div className="bg-blue-50/40 border border-blue-100 rounded-xl p-5">
                      <h4 className="font-bold text-blue-900 text-sm flex items-center gap-1.5 mb-2">
                        <span>🩺</span> Clinical Scenario
                      </h4>
                      <p className="text-xs text-blue-800 leading-relaxed font-medium">
                        {activeModule.clinicalScenarios}
                      </p>
                    </div>
                  )}

                  {/* Emergency Algorithms */}
                  {activeModule.emergencyAlgorithms && (
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                        <span>⚡</span> Emergency Algorithm
                      </h4>
                      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                        <p className="text-xs font-bold text-blue-700 mb-2">Execution Pipeline:</p>
                        <p className="text-xs font-medium text-slate-700 whitespace-pre-line leading-relaxed">
                          {activeModule.emergencyAlgorithms}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Graphic Diagram */}
                  <MedicalChartIllustration />

                  {/* Key Takeaways & Clinical Pearls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeModule.keyTakeaways && (
                      <div className="bg-slate-50 border border-slate-100 rounded-xl p-5">
                        <h4 className="font-bold text-slate-800 text-sm mb-3">Key Takeaways</h4>
                        <ul className="list-disc pl-4 space-y-1.5 text-xs text-slate-600 font-medium">
                          {Array.isArray(activeModule.keyTakeaways) ? (
                            activeModule.keyTakeaways.map((k, i) => <li key={i}>{k}</li>)
                          ) : (
                            <li>{activeModule.keyTakeaways}</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {activeModule.clinicalPearls && (
                      <div className="bg-purple-50/40 border border-purple-100 rounded-xl p-5">
                        <h4 className="font-bold text-purple-900 text-sm mb-2 flex items-center gap-1.5">
                          <span>💡</span> Clinical Pearl
                        </h4>
                        <p className="text-xs text-purple-800 leading-relaxed font-medium">
                          {activeModule.clinicalPearls}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Important Notes */}
                  {activeModule.importantNotes && (
                    <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-5 flex gap-3">
                      <span className="text-xl">⚠️</span>
                      <div>
                        <h4 className="font-bold text-amber-900 text-sm mb-1">Important Warning</h4>
                        <p className="text-xs text-amber-800 leading-relaxed font-medium">
                          {activeModule.importantNotes}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* References */}
                  {activeModule.references && (
                    <div className="border-t border-slate-100 pt-4 text-[10px] text-slate-400">
                      <p className="font-semibold mb-1">References & Guidelines:</p>
                      <p className="italic font-medium">{activeModule.references}</p>
                    </div>
                  )}

                  {/* Completion Status / Trigger */}
                  <div className="flex justify-between items-center border-t border-slate-100 pt-5">
                    <p className="text-xs text-slate-400 font-medium">Completed reading? Take the practice quiz next.</p>
                    {activeModule.completed ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                        ✓ Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => setActiveTab('quiz')}
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Start Practice Quiz →
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 2 Content: Inline Quiz Section */}
              {activeTab === 'quiz' && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  {activeModule.completed ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-5 text-center font-bold text-sm">
                        ✓ Quiz Passed! You have unlocked the next module.
                      </div>
                      <button
                        onClick={() => {
                          const currentIndex = modules.findIndex(m => m.id === activeModule.id)
                          if (currentIndex !== -1 && currentIndex < modules.length - 1) {
                            setCurrentModuleId(modules[currentIndex + 1].id)
                            setActiveTab('study')
                          } else {
                            setCurrentModuleId('posttest')
                          }
                        }}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-center shadow-md transition-colors block text-xs"
                      >
                        {modules.findIndex(m => m.id === activeModule.id) < modules.length - 1 ? 'Go to Next Module' : 'Go to Final Post-Test'}
                      </button>
                    </div>
                  ) : (
                    <ModuleQuizSection moduleId={activeModule.id} onQuizPassed={handleQuizPassed} />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}