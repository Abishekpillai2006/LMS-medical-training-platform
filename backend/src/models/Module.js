import mongoose from 'mongoose'

const lessonSchema = new mongoose.Schema(
    {
        title: String,
        duration: String,
        content: String,
        type: {
            type: String,
            default: 'reading'
        }
    },
    { _id: false }
)

const moduleSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: String,
        order: {
            type: Number,
            default: 1
        },
        lessons: [lessonSchema]
    },
    { timestamps: true }
)

export default mongoose.model('Module', moduleSchema)