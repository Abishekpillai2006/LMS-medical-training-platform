import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import learnerRoutes from './routes/learner.js'
import courseRoutes from './routes/courses.js'
import assessmentRoutes from './routes/assessments.js'
import moduleRoutes from './routes/modules.js'
import adminRoutes from './routes/admin.js'
import facultyRoutes from './routes/faculty.js'
import aiRoutes from './routes/ai.js'

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))

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

const port = process.env.PORT || 8000

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`API running on http://localhost:${port}`)
    })
})