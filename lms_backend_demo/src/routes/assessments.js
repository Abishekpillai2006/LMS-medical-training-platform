import express from 'express'
import Result from '../models/Results.js'
import Assessment from '../models/Assessment.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const assessments = await Assessment.find().lean()
  res.json(assessments)
})

router.get('/:id', async (req, res) => {
  const assessment = await Assessment.findOne({ id: req.params.id }).lean()
  if (!assessment) return res.status(404).json({ message: 'Assessment not found' })

  delete assessment._id
  delete assessment.__v

  res.json(assessment)
})

router.post('/:id/submit', async (req, res) => {
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
      selected,
      correct: q.correct,
      isCorrect
    }
  })

  const total = assessment.questions.length
  const score = Math.round((correct / total) * 100)

  await Result.create({
    learnerId: req.body.learnerId || 'u1',
    assessmentId: assessment.id,
    courseId: assessment.courseId,
    score,
    correct,
    total,
    passed: score >= 70,
    answers,
    review,
  })

  res.json({
    score,
    passed: score >= 70,
    correct,
    total,
    review
  })
})

export default router