import mongoose from 'mongoose'

export const Certificate = mongoose.model('Certificate', new mongoose.Schema({}, { strict: false }))
export const Batch = mongoose.model('Batch', new mongoose.Schema({}, { strict: false }))
export const Simulation = mongoose.model('Simulation', new mongoose.Schema({}, { strict: false }))
export const Notification = mongoose.model('Notification', new mongoose.Schema({}, { strict: false }))
