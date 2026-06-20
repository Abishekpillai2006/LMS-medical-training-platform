import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import Enrollment from '../models/Enrollment.js'
import CourseProgress from '../models/CourseProgress.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  const safeUser = user.toObject()
  delete safeUser.password
  delete safeUser._id
  delete safeUser.__v
  res.json({ token, user: safeUser })
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, phoneNumber, hospital, department, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = 'u_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)

    const user = await User.create({
      id: userId,
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      hospital,
      department,
      role: 'learner'
    })

    // Auto-enroll the new learner in all 6 courses
    const courseIds = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6']
    await Promise.all(
      courseIds.map(async (courseId) => {
        // Create legacy Enrollment
        await Enrollment.create({
          id: 'e_' + courseId + '_' + userId,
          learnerId: userId,
          courseId,
          progress: 0,
          status: 'in_progress',
          enrolledAt: new Date().toISOString()
        })
        // Create CourseProgress
        await CourseProgress.create({
          id: 'cp_' + courseId + '_' + userId,
          learnerId: userId,
          courseId,
          progress: 0,
          preTestPassed: true,
          postTestPassed: false,
          completedModules: [],
          unlockedModules: [],
          status: 'not_started'
        })
      })
    )

    const safeUser = user.toObject()
    delete safeUser.password
    delete safeUser._id
    delete safeUser.__v

    res.status(201).json({ message: 'User registered successfully', user: safeUser })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
})

export default router

