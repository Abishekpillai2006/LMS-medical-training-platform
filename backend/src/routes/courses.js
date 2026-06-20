import express from 'express'
import { protect } from '../middleware.js'
import Course from '../models/Course.js'
import CourseProgress from '../models/CourseProgress.js'
import Enrollment from '../models/Enrollment.js'
import Assessment from '../models/Assessment.js'

const router = express.Router()

// GET /api/courses - List all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().lean()
    res.json(courses)
  } catch (error) {
    console.error('Fetch courses error:', error)
    res.status(500).json({ message: 'Server error fetching courses' })
  }
})

// GET /api/courses/:id/modules - Get user-specific progress & modules lock status
router.get('/:id/modules', protect, async (req, res) => {
  try {
    const courseId = req.params.id
    const learnerId = req.user.id

    const course = await Course.findOne({ id: courseId }).lean()
    if (!course) {
      return res.status(404).json({ message: 'Course not found' })
    }

    // Get or initialize user's course progress
    let courseProgress = await CourseProgress.findOne({ learnerId, courseId })
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        id: 'cp_' + courseId + '_' + learnerId,
        learnerId,
        courseId,
        progress: 0,
        preTestPassed: true,
        postTestPassed: false,
        completedModules: [],
        unlockedModules: course.modules?.length > 0 ? [course.modules[0].id] : [],
        status: 'not_started'
      })
    }

    // Identify post-test assessment in database
    const postTest = await Assessment.findOne({ courseId, type: 'post-test' }).lean()

    // Ensure the first module is unlocked
    if (courseProgress.unlockedModules.length === 0 && course.modules?.length > 0) {
      courseProgress.unlockedModules.push(course.modules[0].id)
      await courseProgress.save()
    }

    // Map modules and determine locks/completions dynamically per user
    const modulesMapped = (course.modules || []).map((m, index) => {
      // Locked if not in unlockedModules list
      const isLocked = !courseProgress.unlockedModules.includes(m.id)
      return {
        ...m,
        completed: courseProgress.completedModules.includes(m.id),
        locked: isLocked
      }
    })

    res.json({
      id: course.id,
      programId: course.programId,
      name: course.name,
      description: course.description,
      progress: courseProgress.progress,
      preTestPassed: courseProgress.preTestPassed,
      postTestPassed: courseProgress.postTestPassed,
      preTestId: null,
      postTestId: postTest?.id || `${courseId}-posttest`,
      modules: modulesMapped
    })
  } catch (error) {
    console.error('Fetch modules error:', error)
    res.status(500).json({ message: 'Server error fetching modules' })
  }
})

// POST /api/courses/:id/modules/:moduleId/complete - Deprecated in favor of quiz grading,
// but kept for compatibility or fallback, updating CourseProgress and Enrollment
router.post('/:id/modules/:moduleId/complete', protect, async (req, res) => {
  try {
    const courseId = req.params.id
    const { moduleId } = req.params
    const learnerId = req.user.id

    const course = await Course.findOne({ id: courseId })
    if (!course) return res.status(404).json({ message: 'Course not found' })

    const mod = course.modules.find(m => m.id === moduleId)
    if (!mod) return res.status(404).json({ message: 'Module not found' })

    let courseProgress = await CourseProgress.findOne({ learnerId, courseId })
    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        id: 'cp_' + courseId + '_' + learnerId,
        learnerId,
        courseId,
        progress: 0,
        preTestPassed: true, // Auto-pass pre-test in complete fallback
        postTestPassed: false,
        completedModules: [moduleId],
        unlockedModules: [moduleId],
        status: 'in_progress'
      })
    } else {
      if (!courseProgress.completedModules.includes(moduleId)) {
        courseProgress.completedModules.push(moduleId)
      }
    }

    // Unlock next module
    const currentIndex = course.modules.findIndex(m => m.id === moduleId)
    if (currentIndex !== -1 && currentIndex < course.modules.length - 1) {
      const nextMod = course.modules[currentIndex + 1]
      if (!courseProgress.unlockedModules.includes(nextMod.id)) {
        courseProgress.unlockedModules.push(nextMod.id)
      }
    }

    const completed = courseProgress.completedModules.length
    const progressPercent = Math.round((completed / course.modules.length) * 100)
    courseProgress.progress = progressPercent
    if (progressPercent >= 100 && courseProgress.preTestPassed && courseProgress.postTestPassed) {
      courseProgress.status = 'completed'
    } else {
      courseProgress.status = 'in_progress'
    }
    await courseProgress.save()

    // Update legacy Enrollment progress
    await Enrollment.updateOne(
      { learnerId, courseId },
      { $set: { progress: progressPercent } }
    )

    res.json({ success: true, progress: progressPercent })
  } catch (error) {
    console.error('Complete module error:', error)
    res.status(500).json({ message: 'Server error completing module' })
  }
})

export default router