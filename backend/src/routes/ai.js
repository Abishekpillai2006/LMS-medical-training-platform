import express from 'express'
const router = express.Router()
router.post('/feedback', async (req, res) => {
  res.json({ feedback: 'Demo AI feedback: learner is progressing well. Revise weak modules, practise OSCE steps, and retake assessment if needed.' })
})
export default router
