import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  options: [{ type: String, required: true }],
  correct: { type: Number, required: true } // Index of correct option (0-based)
}, { _id: false })

const moduleQuizSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, // Unique quiz ID
  courseId: { type: String, required: true },
  moduleId: { type: String, required: true, unique: true }, // One quiz per module
  questions: [questionSchema]
}, { timestamps: true })

export default mongoose.model('ModuleQuiz', moduleQuizSchema)
