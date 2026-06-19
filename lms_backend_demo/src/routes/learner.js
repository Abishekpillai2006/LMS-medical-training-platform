import express from 'express'
import Enrollment from '../models/Enrollment.js'
import Course from '../models/Course.js'
import { Certificate, Simulation, Notification } from '../models/SimpleModels.js'

const router = express.Router()

router.get('/dashboard', async (req, res) => {
  const learnerId = 'u1'

  const enrollments = await Enrollment.find({ learnerId }).lean()
  const courses = await Promise.all(
    enrollments.map(async (e) => {
      const course = await Course.findOne({ id: e.courseId }).lean()
      return {
        id: e.id,
        courseId: e.courseId,
        courseName: course?.name,
        programCode: course?.programId === 'p4' ? 'NALS' : 'PALS',
        progress: e.progress || 0,
        nextModule: e.nextModule,
        status: e.status || 'in_progress',
      }
    })
  )

  res.json({
    courses,
    simulations: await Simulation.find().lean(),
    certificates: await Certificate.find({ learnerId }).lean(),
    notifications: await Notification.find().lean(),
  })
})

export default router