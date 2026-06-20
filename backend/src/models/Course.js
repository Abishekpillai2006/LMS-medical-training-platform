import mongoose from 'mongoose'

const moduleSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: { type: String, enum: ['video', 'pdf', 'interactive'], default: 'pdf' },
  duration: String,
  completed: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
  contentUrl: String,
  studyContent: String,
  keyPoints: [String]
}, { _id: false })

const courseSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  programId: String,
  name: String,
  description: String,
  modules: [moduleSchema],
  progress: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Course', courseSchema)
