import mongoose from 'mongoose'

const reviewItemSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  selected: { type: Number },
  correct: { type: Number, required: true },
  isCorrect: { type: Boolean, required: true }
}, { _id: false })

const moduleQuizResultSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  learnerId: { type: String, required: true },
  courseId: { type: String, required: true },
  moduleId: { type: String, required: true },
  score: { type: Number, required: true }, // percentage
  passed: { type: Boolean, required: true },
  attempts: { type: Number, default: 1 },
  answers: { type: Map, of: Number, default: {} }, // questionId -> selectedIndex
  review: [reviewItemSchema]
}, { timestamps: true })

export default mongoose.model('ModuleQuizResult', moduleQuizResultSchema)
