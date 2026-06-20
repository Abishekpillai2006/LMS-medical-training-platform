import mongoose from 'mongoose'

const programSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  code: String,
  name: String,
  description: String,
  duration: String,
  price: Number,
  modules: Number,
  completionRate: Number,
  color: String
}, { timestamps: true })

export default mongoose.model('Program', programSchema)
