import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['learner', 'faculty', 'admin'], default: 'learner' },
  phoneNumber: String,
  hospital: String,
  department: String,
  avatar: String
}, { timestamps: true })

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

export default mongoose.model('User', userSchema)
