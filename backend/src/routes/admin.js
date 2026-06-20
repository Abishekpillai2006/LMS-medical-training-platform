import express from 'express'
import Program from '../models/Program.js'
import Course from '../models/Course.js'
import User from '../models/User.js'
import { Batch, Simulation } from '../models/SimpleModels.js'

const router = express.Router()

router.get('/dashboard', async (req, res) => {
  const programs = await Program.find().lean()
  res.json({
    stats: { totalLearners: 143, activePrograms: programs.length, certsIssuedThisMonth: 28, expiringIn30Days: 15 },
    programs,
    reports: {
      completionRates: programs.map(p => ({ program: p.code, enrolled: 20, completed: Math.round((p.completionRate || 50) / 5), rate: p.completionRate || 50 })),
      monthlyEnrollments: [{ month: 'Jun', enrollments: 28 }],
      instructorUtilization: [],
      certCompliance: { valid: 145, expiring: 28, expired: 34 }
    }
  })
})

router.get('/courses', async (req, res) => res.json(await Program.find().lean()))
router.post('/courses', async (req, res) => res.status(201).json(await Program.create({ id: `p${Date.now()}`, ...req.body })))
router.get('/users', async (req, res) => res.json(await User.find().select('-password').lean()))
router.get('/faculty', async (req, res) => res.json(await User.find({ role: 'faculty' }).select('-password').lean()))
router.get('/batches', async (req, res) => res.json(await Batch.find().lean()))
router.post('/batches', async (req, res) => res.status(201).json(await Batch.create({ id: `b${Date.now()}`, ...req.body })))
router.get('/simulations', async (req, res) => res.json(await Simulation.find().lean()))
router.post('/simulations', async (req, res) => res.status(201).json(await Simulation.create({ id: `s${Date.now()}`, ...req.body })))

export default router
