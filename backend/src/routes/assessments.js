import express from 'express'
import { protect } from '../middleware.js'
import Result from '../models/Results.js'
import Assessment from '../models/Assessment.js'
import CourseProgress from '../models/CourseProgress.js'
import Course from '../models/Course.js'
import { Certificate } from '../models/SimpleModels.js'

const router = express.Router()

// GET /api/assessments - Fetch all assessments
router.get('/', protect, async (req, res) => {
  try {
    const assessments = await Assessment.find().lean()
    res.json(assessments)
  } catch (error) {
    console.error('Fetch assessments error:', error)
    res.status(500).json({ message: 'Server error fetching assessments' })
  }
})

// GET /api/assessments/:id - Fetch a single assessment
router.get('/:id', protect, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ id: req.params.id }).lean()
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' })

    delete assessment._id
    delete assessment.__v

    res.json(assessment)
  } catch (error) {
    console.error('Fetch assessment by id error:', error)
    res.status(500).json({ message: 'Server error fetching assessment' })
  }
})

// POST /api/assessments/:id/submit - Grade and record pretest/posttest submissions
router.post('/:id/submit', protect, async (req, res) => {
  try {
    const assessment = await Assessment.findOne({ id: req.params.id }).lean()
    if (!assessment) return res.status(404).json({ message: 'Assessment not found' })

    const answers = req.body.answers || {}
    let correct = 0

    const review = assessment.questions.map(q => {
      const selected = answers[q.id]
      const isCorrect = selected === q.correct

      if (isCorrect) correct++

      return {
        questionId: q.id,
        selected: selected !== undefined ? Number(selected) : null,
        correct: q.correct,
        isCorrect
      }
    })

    const total = assessment.questions.length
    const score = Math.round((correct / total) * 100)
    const passed = score >= 70 // Pass mark for pre/post-test is 70%

    const learnerId = req.user.id
    const courseId = assessment.courseId

    // Record the result
    await Result.create({
      learnerId,
      assessmentId: assessment.id,
      courseId,
      score,
      correct,
      total,
      passed,
      answers,
      review,
    })

    // Apply course progression triggers
    let courseProgress = await CourseProgress.findOne({ learnerId, courseId })
    const course = await Course.findOne({ id: courseId }).lean()

    if (!courseProgress) {
      courseProgress = await CourseProgress.create({
        id: 'cp_' + courseId + '_' + learnerId,
        learnerId,
        courseId,
        progress: 0,
        preTestPassed: false,
        postTestPassed: false,
        completedModules: [],
        unlockedModules: [],
        status: 'not_started'
      })
    }

    if (assessment.type === 'pre-test' && passed) {
      courseProgress.preTestPassed = true
      
      // Unlock Module 1
      if (course && course.modules && course.modules.length > 0) {
        const firstModuleId = course.modules[0].id
        if (!courseProgress.unlockedModules.includes(firstModuleId)) {
          courseProgress.unlockedModules.push(firstModuleId)
        }
      }
      courseProgress.status = 'in_progress'
      await courseProgress.save()
    }

    if (assessment.type === 'post-test' && passed) {
      courseProgress.postTestPassed = true
      
      // Mark as completed if all modules are done
      if (course && courseProgress.completedModules.length >= course.modules.length) {
        courseProgress.status = 'completed'
      }
      await courseProgress.save()

      // Generate a Certificate for the learner
      await Certificate.create({
        id: 'cert_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        learnerId,
        courseId,
        programName: course?.name || 'Advanced Emergency Medicine',
        status: 'valid',
        issueDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // Valid for 2 years
      })
    }

    res.json({
      score,
      passed,
      correct,
      total,
      review
    })
  } catch (error) {
    console.error('Submit assessment error:', error)
    res.status(500).json({ message: 'Server error submitting assessment' })
  }
})

export default router