import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from './config/db.js'
import User from './models/User.js'
import Program from './models/Program.js'
import Course from './models/Course.js'
import Assessment from './models/Assessment.js'
import Enrollment from './models/Enrollment.js'
import ModuleQuiz from './models/ModuleQuiz.js'
import ModuleQuizResult from './models/ModuleQuizResult.js'
import CourseProgress from './models/CourseProgress.js'
import UserProgress from './models/UserProgress.js'
import { Certificate, Batch, Simulation, Notification } from './models/SimpleModels.js'
import { programs, courses, assessments, generateQuizzes } from './seedData.js'

const password = await bcrypt.hash('MedTrain@123', 10)

const users = [
  { 
    id: 'u1', 
    name: 'Ronaldo', 
    email: 'learner@demo.com', 
    password, 
    role: 'learner', 
    phoneNumber: '9876543210', 
    hospital: 'Apollo Hospitals', 
    department: 'Emergency Medicine' 
  },
  { 
    id: 'f1', 
    name: 'Dr. Suresh Kumar', 
    email: 'faculty@demo.com', 
    password, 
    role: 'faculty', 
    phoneNumber: '9876543211', 
    hospital: 'Apollo Hospitals', 
    department: 'Pediatrics' 
  },
  { 
    id: 'admin1', 
    name: 'Admin User', 
    email: 'admin@demo.com', 
    password, 
    role: 'admin', 
    phoneNumber: '9876543212', 
    hospital: 'Admin HQ', 
    department: 'Training Admin' 
  }
]

const quizzes = generateQuizzes()

const enrollments = [
  { id: 'e_c1_u1', learnerId: 'u1', courseId: 'c1', progress: 0, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c2_u1', learnerId: 'u1', courseId: 'c2', progress: 0, status: 'in_progress', enrolledAt: new Date().toISOString() },
  { id: 'e_c3_u1', learnerId: 'u1', courseId: 'c3', progress: 0, status: 'in_progress', enrolledAt: new Date().toISOString() }
]

const courseProgresses = [
  { id: 'cp_c1_u1', learnerId: 'u1', courseId: 'c1', progress: 0, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['bls-m1'], status: 'not_started' },
  { id: 'cp_c2_u1', learnerId: 'u1', courseId: 'c2', progress: 0, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['acls-m1'], status: 'not_started' },
  { id: 'cp_c3_u1', learnerId: 'u1', courseId: 'c3', progress: 0, preTestPassed: true, postTestPassed: false, completedModules: [], unlockedModules: ['pals-m1'], status: 'not_started' }
]

const certificates = []
const batches = [{ id: 'b1', name: 'Emergency Care Demo Batch', programId: 'p3', startDate: '2026-06-19', endDate: '2026-07-05', maxSeats: 20, enrolledCount: 1, faculty: ['f1'], status: 'active', learners: ['u1'] }]
const simulations = [{ id: 's1', scenario: 'Pediatric Respiratory Failure', batchId: 'b1', date: '2026-06-25', time: '10:00', room: 'Sim Lab A', faculty: 'f1', status: 'scheduled' }]
const notifications = [{ id: 'n1', type: 'course', message: 'All 6 life support training programs are now live.', read: false, createdAt: new Date().toISOString() }]

try {
  await connectDB()
  
  await Promise.all([
    User.deleteMany(),
    Program.deleteMany(),
    Course.deleteMany(),
    Assessment.deleteMany(),
    Enrollment.deleteMany(),
    Certificate.deleteMany(),
    Batch.deleteMany(),
    Simulation.deleteMany(),
    Notification.deleteMany(),
    ModuleQuiz.deleteMany(),
    ModuleQuizResult.deleteMany(),
    CourseProgress.deleteMany(),
    UserProgress.deleteMany()
  ])

  await User.insertMany(users)
  await Program.insertMany(programs)
  await Course.insertMany(courses)
  await Assessment.insertMany(assessments)
  await Enrollment.insertMany(enrollments)
  await CourseProgress.insertMany(courseProgresses)
  await ModuleQuiz.insertMany(quizzes)
  await Certificate.insertMany(certificates)
  await Batch.insertMany(batches)
  await Simulation.insertMany(simulations)
  await Notification.insertMany(notifications)

  console.log('Database seeded successfully with all 6 life support programs, quizzes, and assessments.')
  console.log('Login: learner@demo.com / MedTrain@123')
  process.exit(0)
} catch (error) {
  console.error('Seeding error:', error)
  process.exit(1)
}
