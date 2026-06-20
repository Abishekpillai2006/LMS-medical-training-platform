import mongoose from 'mongoose'

const questionSchema = new mongoose.Schema({
  id: String,
  text: String,
  options: [String],
  correct: Number
}, { _id: false })

const assessmentSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  courseId: String,
  type: String,
  title: String,
  timeLimit: Number,
  questions: [questionSchema]
}, { timestamps: true })

export default mongoose.model('Assessment', assessmentSchema)
