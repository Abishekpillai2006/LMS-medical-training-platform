import 'dotenv/config' // Hot-reload trigger comment
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import learnerRoutes from './routes/learner.js'
import courseRoutes from './routes/courses.js'
import assessmentRoutes from './routes/assessments.js'
import moduleRoutes from './routes/modules.js'
import adminRoutes from './routes/admin.js'
import facultyRoutes from './routes/faculty.js'
import aiRoutes from './routes/ai.js'
import osceRoutes from './routes/osce.js'

const app = express()

app.use(helmet())
app.disable('x-powered-by')

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
})

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL 
      : [
          process.env.FRONTEND_URL || 'http://localhost:5173',
          'http://localhost:5173',
          'http://localhost:5174'
      ],
    credentials: true
}))

app.use('/api/', apiLimiter)

app.use(express.json({ limit: '2mb' }))

app.get('/', (req, res) => {
    res.json({ message: 'LMS Medical Training API running' })
})

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Backend connected successfully'
    })
})

app.use('/api/auth', authRoutes)
app.use('/api/learner', learnerRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/assessments', assessmentRoutes)
app.use('/api/modules', moduleRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/faculty', facultyRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/osce', osceRoutes)

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`API running on http://localhost:${port}`)
    })
})