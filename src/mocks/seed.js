// ─── Seed Data ──────────────────────────────────────────────────────────────

export const mockUsers = [
  // Learners
  { id: 'u1', name: 'Priya Sharma',     email: 'priya@medtrain.io',   role: 'learner',  department: 'Emergency Medicine', status: 'active', lastLogin: '2026-06-17', avatar: null },
  { id: 'u2', name: 'Arjun Mehta',      email: 'arjun@medtrain.io',   role: 'learner',  department: 'ICU',                status: 'active', lastLogin: '2026-06-16', avatar: null },
  { id: 'u3', name: 'Kavya Nair',       email: 'kavya@medtrain.io',   role: 'learner',  department: 'Pediatrics',         status: 'active', lastLogin: '2026-06-15', avatar: null },
  { id: 'u4', name: 'Rohit Gupta',      email: 'rohit@medtrain.io',   role: 'learner',  department: 'Anesthesiology',     status: 'active', lastLogin: '2026-06-14', avatar: null },
  { id: 'u5', name: 'Sneha Pillai',     email: 'sneha@medtrain.io',   role: 'learner',  department: 'Emergency Medicine', status: 'pending',lastLogin: '2026-06-10', avatar: null },
  { id: 'u6', name: 'Vikram Singh',     email: 'vikram@medtrain.io',  role: 'learner',  department: 'Surgery',            status: 'active', lastLogin: '2026-06-12', avatar: null },
  { id: 'u7', name: 'Anita Rao',        email: 'anita@medtrain.io',   role: 'learner',  department: 'ICU',                status: 'active', lastLogin: '2026-06-11', avatar: null },
  { id: 'u8', name: 'Dev Krishnan',     email: 'dev@medtrain.io',     role: 'learner',  department: 'Cardiology',         status: 'active', lastLogin: '2026-06-09', avatar: null },
  { id: 'u9', name: 'Meera Joshi',      email: 'meera@medtrain.io',   role: 'learner',  department: 'Pediatrics',         status: 'pending',lastLogin: '2026-06-08', avatar: null },
  { id: 'u10',name: 'Arun Babu',        email: 'arun@medtrain.io',    role: 'learner',  department: 'Emergency Medicine', status: 'active', lastLogin: '2026-06-07', avatar: null },
  // Faculty
  { id: 'f1', name: 'Dr. Suresh Kumar', email: 'suresh@medtrain.io',  role: 'faculty',  department: 'Emergency Medicine', status: 'active', lastLogin: '2026-06-17', avatar: null },
  { id: 'f2', name: 'Dr. Leela Varma',  email: 'leela@medtrain.io',   role: 'faculty',  department: 'Pediatrics',         status: 'active', lastLogin: '2026-06-16', avatar: null },
  { id: 'f3', name: 'Dr. Ramesh Iyer',  email: 'ramesh@medtrain.io',  role: 'faculty',  department: 'ICU',                status: 'active', lastLogin: '2026-06-15', avatar: null },
  // Admin
  { id: 'a1', name: 'Admin User',       email: 'admin@medtrain.io',   role: 'admin',    department: 'Administration',     status: 'active', lastLogin: '2026-06-17', avatar: null },
]

export const mockPrograms = [
  {
    id: 'p1', code: 'BLS', name: 'Basic Life Support',
    description: 'Foundational CPR and AED training for healthcare providers.',
    duration: '8 hours', price: 1200, modules: 6, completionRate: 78,
    color: 'blue',
  },
  {
    id: 'p2', code: 'ACLS', name: 'Advanced Cardiovascular Life Support',
    description: 'Advanced algorithms for cardiac arrest, stroke, and other emergencies.',
    duration: '16 hours', price: 2800, modules: 10, completionRate: 62,
    color: 'purple',
  },
  {
    id: 'p3', code: 'PALS', name: 'Pediatric Advanced Life Support',
    description: 'Resuscitation and stabilization of critically ill pediatric patients.',
    duration: '14 hours', price: 2500, modules: 9, completionRate: 71,
    color: 'green',
  },
  {
    id: 'p4', code: 'NALS', name: 'Neonatal Advanced Life Support',
    description: 'Resuscitation of newborns in the delivery room and NICU.',
    duration: '12 hours', price: 2200, modules: 8, completionRate: 55,
    color: 'amber',
  },
  {
    id: 'p5', code: 'ATLS', name: 'Advanced Trauma Life Support',
    description: 'Systematic approach to care for trauma patients.',
    duration: '16 hours', price: 3000, modules: 11, completionRate: 48,
    color: 'red',
  },
  {
    id: 'p6', code: 'BLSO', name: 'Basic Life Support for Obstetrics',
    description: 'Emergency obstetric and maternal resuscitation techniques.',
    duration: '10 hours', price: 1800, modules: 7, completionRate: 66,
    color: 'pink',
  },
]

export const mockCourses = [
  {
    id: 'c1', programId: 'p1', name: 'Basic Life Support',
    modules: [
      { id: 'm1', title: 'Introduction to BLS', type: 'video', duration: '20 min', completed: true, locked: false, contentUrl: '' },
      { id: 'm2', title: 'Chain of Survival', type: 'pdf', duration: '15 min', completed: true, locked: false, contentUrl: '' },
      { id: 'm3', title: 'Adult CPR Technique', type: 'video', duration: '30 min', completed: true, locked: false, contentUrl: '' },
      { id: 'm4', title: 'AED Operation', type: 'interactive', duration: '25 min', completed: false, locked: false, contentUrl: '' },
      { id: 'm5', title: 'Special Populations', type: 'video', duration: '20 min', completed: false, locked: true, contentUrl: '' },
      { id: 'm6', title: 'BLS in the Hospital', type: 'pdf', duration: '15 min', completed: false, locked: true, contentUrl: '' },
    ],
    progress: 50,
  },
  {
    id: 'c2', programId: 'p2', name: 'Advanced Cardiovascular Life Support',
    modules: [
      { id: 'm7',  title: 'ACLS Overview & BLS Review', type: 'video',  duration: '25 min', completed: true,  locked: false },
      { id: 'm8',  title: 'Airway Management',          type: 'pdf',    duration: '20 min', completed: true,  locked: false },
      { id: 'm9',  title: 'Rhythm Recognition',         type: 'video',  duration: '40 min', completed: false, locked: false },
      { id: 'm10', title: 'Cardiac Arrest Algorithms',  type: 'interactive', duration: '35 min', completed: false, locked: true },
      { id: 'm11', title: 'Post-Cardiac Arrest Care',   type: 'video',  duration: '30 min', completed: false, locked: true },
    ],
    progress: 40,
  },
  {
    id: 'c3', programId: 'p3', name: 'Pediatric Advanced Life Support',
    modules: [
      { id: 'm12', title: 'Pediatric Assessment Triangle', type: 'video', duration: '20 min', completed: true,  locked: false },
      { id: 'm13', title: 'Airway & Breathing Emergencies', type: 'pdf', duration: '25 min', completed: false, locked: false },
      { id: 'm14', title: 'Shock Recognition & Management', type: 'video', duration: '35 min', completed: false, locked: true },
    ],
    progress: 33,
  },
]

export const mockEnrollments = [
  { id: 'e1', learnerId: 'u1', courseId: 'c1', progress: 50, nextModule: 'AED Operation',           enrolledAt: '2026-05-01', status: 'in_progress' },
  { id: 'e2', learnerId: 'u1', courseId: 'c2', progress: 40, nextModule: 'Rhythm Recognition',      enrolledAt: '2026-05-15', status: 'in_progress' },
  { id: 'e3', learnerId: 'u2', courseId: 'c1', progress: 100,nextModule: null,                      enrolledAt: '2026-04-01', status: 'completed'   },
  { id: 'e4', learnerId: 'u3', courseId: 'c3', progress: 33, nextModule: 'Airway & Breathing',      enrolledAt: '2026-05-20', status: 'in_progress' },
]

export const mockSimulations = [
  { id: 's1', scenario: 'Cardiac Arrest Response', batchId: 'b1', date: '2026-06-20', time: '09:00', room: 'Sim Lab A', faculty: 'f1', status: 'scheduled' },
  { id: 's2', scenario: 'Pediatric Respiratory Failure', batchId: 'b2', date: '2026-06-22', time: '14:00', room: 'Sim Lab B', faculty: 'f2', status: 'scheduled' },
  { id: 's3', scenario: 'Trauma Assessment', batchId: 'b3', date: '2026-06-25', time: '10:00', room: 'Sim Lab A', faculty: 'f3', status: 'scheduled' },
  { id: 's4', scenario: 'Neonatal Resuscitation', batchId: 'b1', date: '2026-07-02', time: '11:00', room: 'Sim Lab C', faculty: 'f1', status: 'scheduled' },
]

export const mockBatches = [
  {
    id: 'b1', name: 'BLS June 2026',   programId: 'p1', startDate: '2026-06-15', endDate: '2026-06-30',
    maxSeats: 20, enrolledCount: 15, faculty: ['f1'], status: 'active',
    learners: ['u1','u2','u4','u6','u8','u10'],
  },
  {
    id: 'b2', name: 'ACLS July 2026',  programId: 'p2', startDate: '2026-07-01', endDate: '2026-07-15',
    maxSeats: 15, enrolledCount: 10, faculty: ['f2'], status: 'upcoming',
    learners: ['u1','u3','u5','u7'],
  },
  {
    id: 'b3', name: 'PALS July 2026',  programId: 'p3', startDate: '2026-07-10', endDate: '2026-07-25',
    maxSeats: 12, enrolledCount: 8,  faculty: ['f3'], status: 'upcoming',
    learners: ['u2','u4','u6','u9'],
  },
]

export const mockCertificates = [
  { id: 'cert1', learnerId: 'u1', programId: 'p1', programName: 'Basic Life Support',                   issueDate: '2025-06-15', expiryDate: '2027-06-15', status: 'valid',    credentialId: 'BLS-2025-001' },
  { id: 'cert2', learnerId: 'u1', programId: 'p3', programName: 'Pediatric Advanced Life Support',      issueDate: '2024-12-01', expiryDate: '2026-12-01', status: 'expiring', credentialId: 'PALS-2024-007' },
  { id: 'cert3', learnerId: 'u2', programId: 'p1', programName: 'Basic Life Support',                   issueDate: '2024-01-10', expiryDate: '2026-01-10', status: 'expired',  credentialId: 'BLS-2024-003' },
  { id: 'cert4', learnerId: 'u3', programId: 'p2', programName: 'Advanced Cardiovascular Life Support', issueDate: '2025-09-20', expiryDate: '2027-09-20', status: 'valid',    credentialId: 'ACLS-2025-012' },
  { id: 'cert5', learnerId: 'u4', programId: 'p5', programName: 'Advanced Trauma Life Support',         issueDate: '2025-03-05', expiryDate: '2027-03-05', status: 'valid',    credentialId: 'ATLS-2025-005' },
]

export const mockAssessments = [
  {
    id: 'a2', courseId: 'c1', type: 'post-test', title: 'BLS Post-Test', timeLimit: 30,
    questions: [
      { id: 'q6',  text: 'How long should you check for a pulse before starting CPR?', options: ['5 seconds','No more than 10 seconds','15 seconds','30 seconds'], correct: 1 },
      { id: 'q7',  text: 'What is the target chest recoil between compressions?', options: ['50% recoil','Partial recoil','Full recoil','No recoil needed'], correct: 2 },
      { id: 'q8',  text: 'When should you use an AED?', options: ['Only after 5 min of CPR','As soon as available','Only for adults','Only in hospital'], correct: 1 },
      { id: 'q9',  text: 'What ratio of compressions to ventilation for 2 rescuers with infant?', options: ['15:2','30:2','5:1','3:1'], correct: 0 },
      { id: 'q10', text: 'Recovery position is appropriate when?', options: ['Unconscious with no pulse','Unconscious breathing normally','Conscious and alert','During CPR'], correct: 1 },
    ],
  },
]

export const mockOSCEResults = [
  {
    id: 'osce1', sessionId: 's1', learnerId: 'u1', facultyId: 'f1',
    submittedAt: '2026-06-10T14:30:00Z',
    overallResult: 'pass',
    steps: [
      { id: 'step1', description: 'Scene safety assessment',          result: 'pass', notes: 'Correctly identified hazards' },
      { id: 'step2', description: 'Check responsiveness',             result: 'pass', notes: 'Appropriate stimulation applied' },
      { id: 'step3', description: 'Call for help / activate EMS',     result: 'pass', notes: '' },
      { id: 'step4', description: 'Check for breathing and pulse',    result: 'pass', notes: 'Simultaneous check performed correctly' },
      { id: 'step5', description: 'Start chest compressions',         result: 'pass', notes: 'Rate and depth appropriate' },
      { id: 'step6', description: 'Open airway (head-tilt chin-lift)',result: 'fail', notes: 'Neck hyperextended too much — use caution' },
      { id: 'step7', description: 'Deliver rescue breaths',           result: 'pass', notes: 'Visible chest rise confirmed' },
      { id: 'step8', description: 'Attach and operate AED',           result: 'pass', notes: 'Correct pad placement and clear command given' },
    ],
  },
]

export const mockNotifications = [
  { id: 'n1', type: 'renewal',     message: 'PALS certification expires in 15 days',              read: false, createdAt: '2026-06-17T10:00:00Z' },
  { id: 'n2', type: 'test_result', message: 'BLS Post-Test result: 90% — PASSED',                 read: false, createdAt: '2026-06-16T14:30:00Z' },
  { id: 'n3', type: 'session',     message: 'Simulation session scheduled: Jun 20, 09:00 AM',    read: true,  createdAt: '2026-06-15T09:00:00Z' },
  { id: 'n4', type: 'renewal',     message: 'BLS renewal reminder: expires in 60 days',           read: true,  createdAt: '2026-06-10T08:00:00Z' },
]

export const mockReports = {
  completionRates: [
    { program: 'BLS', enrolled: 45, completed: 35, rate: 78 },
    { program: 'ACLS', enrolled: 30, completed: 19, rate: 62 },
    { program: 'PALS', enrolled: 28, completed: 20, rate: 71 },
    { program: 'NALS', enrolled: 18, completed: 10, rate: 55 },
    { program: 'ATLS', enrolled: 25, completed: 12, rate: 48 },
    { program: 'BLSO', enrolled: 20, completed: 13, rate: 66 },
  ],
  monthlyEnrollments: [
    { month: 'Jan', enrollments: 12 },
    { month: 'Feb', enrollments: 18 },
    { month: 'Mar', enrollments: 25 },
    { month: 'Apr', enrollments: 22 },
    { month: 'May', enrollments: 30 },
    { month: 'Jun', enrollments: 28 },
  ],
  deptCompliance: [
    { name: 'Emergency Medicine', value: 85, color: '#2563eb' },
    { name: 'ICU',                value: 72, color: '#7c3aed' },
    { name: 'Pediatrics',         value: 90, color: '#16a34a' },
    { name: 'Anesthesiology',     value: 65, color: '#d97706' },
    { name: 'Surgery',            value: 58, color: '#dc2626' },
    { name: 'Cardiology',         value: 80, color: '#0891b2' },
  ],
  instructorUtilization: [
    { name: 'Dr. Suresh Kumar', sessions: 12, learnersEvaluated: 45 },
    { name: 'Dr. Leela Varma',  sessions: 9,  learnersEvaluated: 32 },
    { name: 'Dr. Ramesh Iyer',  sessions: 7,  learnersEvaluated: 28 },
  ],
  certCompliance: {
    valid: 145, expiring: 28, expired: 34,
    byDept: [
      { dept: 'Emergency Medicine', valid: 42, expiring: 8,  expired: 5  },
      { dept: 'ICU',                valid: 35, expiring: 6,  expired: 8  },
      { dept: 'Pediatrics',         valid: 28, expiring: 4,  expired: 3  },
      { dept: 'Anesthesiology',     valid: 20, expiring: 5,  expired: 7  },
      { dept: 'Surgery',            valid: 12, expiring: 3,  expired: 8  },
      { dept: 'Cardiology',         valid: 8,  expiring: 2,  expired: 3  },
    ],
  },
}

// Token map for mock login
export const mockTokens = {
  'priya@medtrain.io':  { token: 'mock-learner-token-priya',   user: mockUsers.find(u => u.id === 'u1') },
  'arjun@medtrain.io':  { token: 'mock-learner-token-arjun',   user: mockUsers.find(u => u.id === 'u2') },
  'suresh@medtrain.io': { token: 'mock-faculty-token-suresh',  user: mockUsers.find(u => u.id === 'f1') },
  'leela@medtrain.io':  { token: 'mock-faculty-token-leela',   user: mockUsers.find(u => u.id === 'f2') },
  'admin@medtrain.io':  { token: 'mock-admin-token',           user: mockUsers.find(u => u.id === 'a1') },
}
