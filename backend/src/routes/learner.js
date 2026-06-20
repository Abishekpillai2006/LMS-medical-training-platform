import express from 'express'
import { protect } from '../middleware.js'
import CourseProgress from '../models/CourseProgress.js'
import Course from '../models/Course.js'
import Program from '../models/Program.js'
import { Certificate, Simulation, Notification } from '../models/SimpleModels.js'

const router = express.Router()

router.get('/dashboard', protect, async (req, res) => {
  try {
    const learnerId = req.user.id

    const progressRecords = await CourseProgress.find({ learnerId }).lean()
    const coursesMapped = await Promise.all(
      progressRecords.map(async (cp) => {
        const course = await Course.findOne({ id: cp.courseId }).lean()
        const program = await Program.findOne({ id: course?.programId }).lean()
        
        let nextModuleTitle = 'Not Started'
        if (course && course.modules) {
          const nextMod = course.modules.find(m => !cp.completedModules.includes(m.id))
          if (nextMod) {
            nextModuleTitle = nextMod.title
          } else if (!cp.postTestPassed) {
            nextModuleTitle = 'Post-Test'
          } else {
            nextModuleTitle = 'Completed'
          }
        }

        return {
          id: cp.id,
          courseId: cp.courseId,
          courseName: course?.name || 'Medical Training Course',
          programCode: program?.code || 'MED',
          progress: cp.progress || 0,
          nextModule: nextModuleTitle,
          status: cp.status || 'not_started',
          preTestPassed: cp.preTestPassed,
          postTestPassed: cp.postTestPassed
        }
      })
    )

    res.json({
      courses: coursesMapped,
      simulations: await Simulation.find().lean(),
      certificates: await Certificate.find({ learnerId }).lean(),
      notifications: await Notification.find().lean(),
    })
  } catch (error) {
    console.error('Fetch dashboard error:', error)
    res.status(500).json({ message: 'Server error loading dashboard' })
  }
})

export default router