import express from 'express'
import { protect } from '../middleware.js'
import ModuleQuiz from '../models/ModuleQuiz.js'
import ModuleQuizResult from '../models/ModuleQuizResult.js'
import CourseProgress from '../models/CourseProgress.js'
import Enrollment from '../models/Enrollment.js'
import Course from '../models/Course.js'

const router = express.Router()

// GET /api/modules/:moduleId/quiz - Fetch quiz questions safely (omits correct answer indices)
router.get('/:moduleId/quiz', protect, async (req, res) => {
  try {
    const { moduleId } = req.params
    const quiz = await ModuleQuiz.findOne({ moduleId }).lean()
    
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this module' })
    }

    // Strip out correct answers to prevent inspection on frontend
    const safeQuestions = quiz.questions.map(q => ({
      id: q.id,
      text: q.text,
      options: q.options
    }))

    res.json({
      id: quiz.id,
      courseId: quiz.courseId,
      moduleId: quiz.moduleId,
      questions: safeQuestions
    })
  } catch (error) {
    console.error('Fetch quiz error:', error)
    res.status(500).json({ message: 'Server error fetching quiz' })
  }
})

// POST /api/modules/:moduleId/submit - Submit answers and grade quiz, unlock next module on pass
router.post('/:moduleId/submit', protect, async (req, res) => {
  try {
    const { moduleId } = req.params
    const answers = req.body.answers || {} // object mapping questionId -> selectedIndex
    const learnerId = req.user.id

    const quiz = await ModuleQuiz.findOne({ moduleId })
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this module' })
    }

    let correctCount = 0
    const review = quiz.questions.map(q => {
      const selected = answers[q.id]
      const isCorrect = selected === q.correct
      if (isCorrect) correctCount++

      return {
        questionId: q.id,
        selected: selected !== undefined ? Number(selected) : null,
        correct: q.correct,
        isCorrect
      }
    })

    const total = quiz.questions.length
    const score = Math.round((correctCount / total) * 100)
    const passed = score >= 80 // Pass score is 80%

    // Save or update Quiz attempt
    let quizResult = await ModuleQuizResult.findOne({ learnerId, moduleId })
    if (quizResult) {
      quizResult.score = score
      quizResult.passed = passed
      quizResult.attempts += 1
      quizResult.answers = answers
      quizResult.review = review
      await quizResult.save()
    } else {
      quizResult = await ModuleQuizResult.create({
        id: 'mqr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        learnerId,
        courseId: quiz.courseId,
        moduleId,
        score,
        passed,
        attempts: 1,
        answers,
        review
      })
    }

    // Unlock next module if passed
    let unlockedNext = false
    let courseProgress = await CourseProgress.findOne({ learnerId, courseId: quiz.courseId })
    
    if (passed && courseProgress) {
      // Add current module to completed if not already there
      if (!courseProgress.completedModules.includes(moduleId)) {
        courseProgress.completedModules.push(moduleId)
      }

      // Find course to check next module in sequence
      const course = await Course.findOne({ id: quiz.courseId }).lean()
      if (course && course.modules) {
        const currentIndex = course.modules.findIndex(m => m.id === moduleId)
        
        if (currentIndex !== -1 && currentIndex < course.modules.length - 1) {
          const nextModule = course.modules[currentIndex + 1]
          if (!courseProgress.unlockedModules.includes(nextModule.id)) {
            courseProgress.unlockedModules.push(nextModule.id)
            unlockedNext = true
          }
        }
        
        // Recalculate progress: base it on completed modules / total modules * 100
        const completedCount = courseProgress.completedModules.length
        const totalModules = course.modules.length
        const progressPercent = Math.round((completedCount / totalModules) * 100)
        
        courseProgress.progress = progressPercent
        
        if (progressPercent >= 100 && courseProgress.preTestPassed && courseProgress.postTestPassed) {
          courseProgress.status = 'completed'
        } else {
          courseProgress.status = 'in_progress'
        }

        await courseProgress.save()

        // Also update legacy Enrollment progress
        await Enrollment.updateOne(
          { learnerId, courseId: quiz.courseId },
          { $set: { progress: progressPercent } }
        )
      }
    }

    res.json({
      score,
      passed,
      correct: correctCount,
      total,
      review,
      attempts: quizResult.attempts,
      unlockedNext
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error submitting quiz' })
  }
})

export default router
