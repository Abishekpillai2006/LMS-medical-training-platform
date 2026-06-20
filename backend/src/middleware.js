import jwt from 'jsonwebtoken'
import User from './models/User.js'

export async function protect(req, res, next) {
  const auth = req.headers.authorization || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findOne({ id: decoded.id }).lean()
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
