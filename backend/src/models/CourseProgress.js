import mongoose from 'mongoose'

const courseProgressSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  learnerId: { type: String, required: true },
  courseId: { type: String, required: true },
  progress: { type: Number, default: 0 }, // 0 to 100
  preTestPassed: { type: Boolean, default: true },
  postTestPassed: { type: Boolean, default: false },
  completedModules: [{ type: String }], // Array of completed module IDs
  unlockedModules: [{ type: String }], // Array of unlocked module IDs
  status: { 
    type: String, 
    enum: ['not_started', 'in_progress', 'completed'], 
    default: 'not_started' 
  }
}, { timestamps: true })

// Compound index to ensure uniqueness per learner and course
courseProgressSchema.index({ learnerId: 1, courseId: 1 }, { unique: true })

export default mongoose.model('CourseProgress', courseProgressSchema)
