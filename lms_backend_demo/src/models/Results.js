import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema(
    {
        learnerId: {
            type: String,
            required: true,
        },
        assessmentId: {
            type: String,
            required: true,
        },
        courseId: {
            type: String,
            required: true,
        },
        score: Number,
        correct: Number,
        total: Number,
        passed: Boolean,
        answers: {
            type: Object,
            default: {},
        },
        review: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
)

export default mongoose.model('Result', resultSchema)