import { http, HttpResponse, delay } from 'msw'
import {
  mockTokens, mockUsers, mockPrograms, mockCourses, mockEnrollments,
  mockBatches, mockCertificates, mockAssessments, mockOSCEResults,
  mockSimulations, mockNotifications, mockReports,
} from './seed'

const BASE = 'http://localhost:8000/api'
const D = 400 // simulated latency ms

// Helper to get logged-in user from request
function getUser(request) {
  const auth = request.headers.get('Authorization') || ''
  const token = auth.replace('Bearer ', '')
  return Object.values(mockTokens).find((t) => t.token === token)?.user || null
}

export const handlers = [
  // ──────────────────── AUTH ─────────────────────────────
  http.post(`${BASE}/auth/login`, async ({ request }) => {
    await delay(D)
    const body = await request.json()
    const entry = mockTokens[body.email]
    if (!entry || body.password !== 'MedTrain@123') {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 })
    }
    return HttpResponse.json({ token: entry.token, user: entry.user })
  }),

  // ──────────────────── LEARNER ──────────────────────────
  http.get(`${BASE}/learner/dashboard`, async ({ request }) => {
    await delay(D)
    const user = getUser(request)
    if (!user) return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const enrollments = mockEnrollments.filter((e) => e.learnerId === user.id)
    const courses = enrollments.map((e) => {
      const course = mockCourses.find((c) => c.id === e.courseId)
      const prog = mockPrograms.find((p) => p.id === course?.programId)
      return { ...e, courseName: course?.name, programCode: prog?.code, totalModules: course?.modules.length }
    })
    const certs = mockCertificates.filter((c) => c.learnerId === user.id)
    const sims = mockSimulations.filter((s) =>
      mockBatches.some((b) => b.id === s.batchId && b.learners.includes(user.id))
    )
    return HttpResponse.json({
      user, courses, simulations: sims, certificates: certs,
      notifications: mockNotifications.filter(n => !n.read),
    })
  }),

  http.get(`${BASE}/learner/notifications`, async ({ request }) => {
    await delay(D)
    return HttpResponse.json(mockNotifications)
  }),

  http.get(`${BASE}/courses/:id/modules`, async ({ params }) => {
    await delay(D)
    const course = mockCourses.find((c) => c.id === params.id)
    if (!course) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json(course)
  }),

  http.post(`${BASE}/courses/:id/modules/:moduleId/complete`, async () => {
    await delay(D)
    return HttpResponse.json({ success: true })
  }),

  http.get(`${BASE}/assessments/:id`, async ({ params }) => {
    await delay(D)
    const assessment = mockAssessments.find((a) => a.id === params.id)
    if (!assessment) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json(assessment)
  }),

  http.post(`${BASE}/assessments/:id/submit`, async ({ request }) => {
    await delay(D * 2)
    const body = await request.json()
    const assessment = mockAssessments.find((a) => a.id === body.assessmentId || a.id === 'a2')
    if (!assessment) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    const answers = body.answers || {}
    let correct = 0
    const review = assessment.questions.map((q) => {
      const selected = answers[q.id]
      const isCorrect = selected === q.correct
      if (isCorrect) correct++
      return { questionId: q.id, question: q.text, selected, correct: q.correct, isCorrect }
    })
    const score = Math.round((correct / assessment.questions.length) * 100)
    const passed = score >= 70
    return HttpResponse.json({ score, passed, correct, total: assessment.questions.length, review })
  }),

  http.get(`${BASE}/osce/:sessionId/:learnerId`, async ({ params }) => {
    await delay(D)
    const result = mockOSCEResults.find(
      (r) => r.sessionId === params.sessionId && r.learnerId === params.learnerId
    )
    if (!result) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json(result)
  }),

  http.get(`${BASE}/learner/certificates`, async ({ request }) => {
    await delay(D)
    const user = getUser(request)
    const certs = user ? mockCertificates.filter((c) => c.learnerId === user.id) : mockCertificates
    return HttpResponse.json(certs)
  }),

  // ──────────────────── FACULTY ──────────────────────────
  http.get(`${BASE}/faculty/dashboard`, async ({ request }) => {
    await delay(D)
    const user = getUser(request)
    const myBatches = mockBatches.filter((b) => b.faculty.includes(user?.id))
    const pendingOSCE = 3
    const upcomingSims = mockSimulations.filter((s) =>
      myBatches.some((b) => b.id === s.batchId)
    )
    return HttpResponse.json({ batches: myBatches, pendingOSCE, simulations: upcomingSims, user })
  }),

  http.get(`${BASE}/faculty/batch/:id/learners`, async ({ params }) => {
    await delay(D)
    const batch = mockBatches.find((b) => b.id === params.id)
    if (!batch) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    const learners = batch.learners.map((lid) => {
      const user = mockUsers.find((u) => u.id === lid)
      const cert = mockCertificates.find((c) => c.learnerId === lid)
      return {
        ...user,
        preTestScore: Math.floor(Math.random() * 40) + 40,
        postTestScore: Math.floor(Math.random() * 30) + 65,
        osceStatus: ['pending', 'pass', 'fail'][Math.floor(Math.random() * 3)],
        attendance: `${Math.floor(Math.random() * 3) + 3}/4`,
        certStatus: cert?.status || 'none',
      }
    })
    const prog = mockPrograms.find((p) => p.id === batch.programId)
    return HttpResponse.json({ batch: { ...batch, programName: prog?.name }, learners })
  }),

  http.post(`${BASE}/osce/:sessionId/evaluate`, async ({ request }) => {
    await delay(D * 2)
    return HttpResponse.json({ success: true, message: 'OSCE evaluation submitted successfully' })
  }),

  http.get(`${BASE}/faculty/assessments`, async () => {
    await delay(D)
    const submissions = [
      { id: 'sub1', learnerName: 'Priya Sharma',  assessmentTitle: 'BLS Post-Test',  score: 90, passed: true,  submittedAt: '2026-06-16T14:30:00Z', flagged: false },
      { id: 'sub2', learnerName: 'Arjun Mehta',   assessmentTitle: 'BLS Pre-Test',   score: 55, passed: false, submittedAt: '2026-06-15T10:00:00Z', flagged: true  },
      { id: 'sub3', learnerName: 'Kavya Nair',    assessmentTitle: 'PALS Post-Test', score: 75, passed: true,  submittedAt: '2026-06-14T11:00:00Z', flagged: false },
      { id: 'sub4', learnerName: 'Rohit Gupta',   assessmentTitle: 'BLS Post-Test',  score: 65, passed: false, submittedAt: '2026-06-13T09:30:00Z', flagged: false },
      { id: 'sub5', learnerName: 'Vikram Singh',  assessmentTitle: 'ACLS Pre-Test',  score: 80, passed: true,  submittedAt: '2026-06-12T15:00:00Z', flagged: false },
    ]
    return HttpResponse.json(submissions)
  }),

  http.get(`${BASE}/faculty/learner/:id`, async ({ params }) => {
    await delay(D)
    const user = mockUsers.find((u) => u.id === params.id)
    const enrollments = mockEnrollments.filter((e) => e.learnerId === params.id)
    const certs = mockCertificates.filter((c) => c.learnerId === params.id)
    if (!user) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    return HttpResponse.json({ user, enrollments, certificates: certs })
  }),

  http.post(`${BASE}/ai/feedback`, async ({ request }) => {
    await delay(2000)
    const body = await request.json()
    const user = mockUsers.find((u) => u.id === body.learnerId) || { name: 'the learner' }
    const feedback = `**Performance Summary for ${user.name}**\n\nBased on the assessment data and OSCE evaluations, ${user.name} demonstrates solid foundational knowledge in Basic Life Support protocols. The post-test score of 90% reflects excellent conceptual mastery.\n\n**Strengths:**\n- Consistent high performance in cognitive assessments\n- Strong understanding of compression ratios and AED operation\n- Satisfactory attendance and active participation\n\n**Areas for Improvement:**\n- Airway management technique (OSCE step 6 flagged) needs focused practice — specifically avoiding excessive neck hyperextension\n- Recommend reviewing "Special Populations CPR" module before next simulation\n- Consider additional practice on rescue breath technique\n\n**Recommended Next Steps:**\n1. Complete "AED Operation" interactive module\n2. Schedule one-on-one skills check with faculty before OSCE retake\n3. Enroll in ACLS program after BLS certification\n\n*Generated by MedTrain AI — Review before sending to learner.*`
    return HttpResponse.json({ feedback })
  }),

  // ──────────────────── ADMIN ────────────────────────────
  http.get(`${BASE}/admin/dashboard`, async () => {
    await delay(D)
    return HttpResponse.json({
      stats: {
        totalLearners: 143,
        activePrograms: 6,
        certsIssuedThisMonth: 28,
        expiringIn30Days: 15,
      },
      programs: mockPrograms,
      reports: mockReports,
    })
  }),

  http.get(`${BASE}/admin/courses`, async () => {
    await delay(D)
    return HttpResponse.json(mockPrograms)
  }),

  http.post(`${BASE}/admin/courses`, async ({ request }) => {
    await delay(D)
    const body = await request.json()
    return HttpResponse.json({ id: `p${Date.now()}`, ...body, completionRate: 0 })
  }),

  http.get(`${BASE}/admin/batches`, async () => {
    await delay(D)
    const batches = mockBatches.map((b) => {
      const prog = mockPrograms.find((p) => p.id === b.programId)
      const faculty = b.faculty.map((fid) => mockUsers.find((u) => u.id === fid)?.name)
      return { ...b, programName: prog?.name, facultyNames: faculty }
    })
    return HttpResponse.json(batches)
  }),

  http.post(`${BASE}/admin/batches`, async ({ request }) => {
    await delay(D)
    const body = await request.json()
    return HttpResponse.json({ id: `b${Date.now()}`, ...body, enrolledCount: 0 })
  }),

  http.get(`${BASE}/admin/simulations`, async () => {
    await delay(D)
    const sims = mockSimulations.map((s) => {
      const batch = mockBatches.find((b) => b.id === s.batchId)
      const fac = mockUsers.find((u) => u.id === s.faculty)
      return { ...s, batchName: batch?.name, facultyName: fac?.name }
    })
    return HttpResponse.json(sims)
  }),

  http.post(`${BASE}/admin/simulations`, async ({ request }) => {
    await delay(D)
    const body = await request.json()
    return HttpResponse.json({ id: `s${Date.now()}`, ...body })
  }),

  http.get(`${BASE}/admin/users`, async () => {
    await delay(D)
    return HttpResponse.json(mockUsers)
  }),

  http.patch(`${BASE}/admin/users/:id`, async ({ params, request }) => {
    await delay(D)
    const body = await request.json()
    return HttpResponse.json({ id: params.id, ...body })
  }),

  http.get(`${BASE}/admin/reports/completion`, async () => {
    await delay(D)
    return HttpResponse.json(mockReports)
  }),

  http.get(`${BASE}/admin/reports/instructor-utilization`, async () => {
    await delay(D)
    return HttpResponse.json(mockReports.instructorUtilization)
  }),

  http.get(`${BASE}/admin/reports/cert-compliance`, async () => {
    await delay(D)
    return HttpResponse.json(mockReports.certCompliance)
  }),

  http.get(`${BASE}/admin/faculty`, async () => {
    await delay(D)
    return HttpResponse.json(mockUsers.filter((u) => u.role === 'faculty'))
  }),
]
