import mongoose from 'mongoose'

const enrollmentSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  learnerId: String,
  courseId: String,
  progress: Number,
  nextModule: String,
  enrolledAt: String,
  status: String
}, { timestamps: true })

export default mongoose.model('Enrollment', enrollmentSchema)
