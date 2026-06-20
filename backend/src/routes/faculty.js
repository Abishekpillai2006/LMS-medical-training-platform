import express from 'express'
import User from '../models/User.js'
import Enrollment from '../models/Enrollment.js'
import { Batch, Certificate, Simulation } from '../models/SimpleModels.js'
import { protect } from '../middleware.js'

const router = express.Router()

router.get('/dashboard', protect, async (req, res) => {
  const batches = await Batch.find({ faculty: req.user.id }).lean()
  const simulations = await Simulation.find({ batchId: { $in: batches.map(b => b.id) } }).lean()
  res.json({ batches, pendingOSCE: 3, simulations, user: req.user })
})

router.get('/batch/:id/learners', async (req, res) => {
  const batch = await Batch.findOne({ id: req.params.id }).lean()
  if (!batch) return res.status(404).json({ message: 'Batch not found' })
  const users = await User.find({ id: { $in: batch.learners || [] } }).select('-password').lean()
  res.json({ batch, learners: users.map(u => ({ ...u, preTestScore: 70, postTestScore: 85, osceStatus: 'pending', attendance: '3/4', certStatus: 'none' })) })
})

router.get('/assessments', async (req, res) => res.json([]))
router.get('/learner/:id', async (req, res) => {
  const user = await User.findOne({ id: req.params.id }).select('-password').lean()
  const enrollments = await Enrollment.find({ learnerId: req.params.id }).lean()
  const certificates = await Certificate.find({ learnerId: req.params.id }).lean()
  res.json({ user, enrollments, certificates })
})

export default router
