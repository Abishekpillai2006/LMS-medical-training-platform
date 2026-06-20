import mongoose from 'mongoose'

const userProgressSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  learnerId: { type: String, unique: true, required: true },
  completedCoursesCount: { type: Number, default: 0 },
  certificatesCount: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('UserProgress', userProgressSchema)
