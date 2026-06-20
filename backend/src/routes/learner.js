import express from 'express'
import { protect } from '../middleware.js'
import CourseProgress from '../models/CourseProgress.js'
import Course from '../models/Course.js'
import Program from '../models/Program.js'
import Enrollment from '../models/Enrollment.js'
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

    // Calculate available courses (not enrolled yet)
    const enrolledCourseIds = progressRecords.map(cp => cp.courseId)
    const allCourses = await Course.find().lean()
    const availableCourses = []

    for (const course of allCourses) {
      if (!enrolledCourseIds.includes(course.id)) {
        const program = await Program.findOne({ id: course.programId }).lean()
        availableCourses.push({
          id: course.id,
          name: course.name,
          programCode: program?.code || 'MED',
          description: course.description || 'Medical Training Course Description'
        })
      }
    }

    res.json({
      courses: coursesMapped,
      availableCourses,
      simulations: await Simulation.find().lean(),
      certificates: await Certificate.find({ learnerId }).lean(),
      notifications: await Notification.find().lean(),
    })
  } catch (error) {
    console.error('Fetch dashboard error:', error)
    res.status(500).json({ message: 'Server error loading dashboard' })
  }
})

// POST /enroll - Enroll learner in a course
router.post('/enroll', protect, async (req, res) => {
  try {
    const { courseId } = req.body
    const learnerId = req.user.id

    const course = await Course.findOne({ id: courseId }).lean()
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Check if already enrolled
    const existingProgress = await CourseProgress.findOne({ learnerId, courseId })
    if (existingProgress) {
      return res.status(400).json({ message: 'Already enrolled in this course' })
    }

    // Create CourseProgress
    await CourseProgress.create({
      id: 'cp_' + courseId + '_' + learnerId,
      learnerId,
      courseId,
      progress: 0,
      preTestPassed: true, // Bypass or set preTestPassed to true initially
      postTestPassed: false,
      completedModules: [],
      unlockedModules: course.modules?.length > 0 ? [course.modules[0].id] : [],
      status: 'not_started'
    })

    // Create legacy Enrollment
    await Enrollment.create({
      id: 'e_' + courseId + '_' + learnerId,
      learnerId,
      courseId,
      progress: 0,
      status: 'in_progress',
      enrolledAt: new Date().toISOString()
    })

    res.json({ success: true, message: 'Enrolled successfully' })
  } catch (error) {
    console.error('Course enrollment error:', error)
    res.status(500).json({ message: 'Server error enrolling in course' })
  }
})

export default router