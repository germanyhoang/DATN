import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    feedback_email: {
        type: String,
    },
    feedback_question: {
        type: String,
        required: true,
    },
    feedback_status: {
        type: Boolean
    }
}, {
    timestamps: true,
})

export default mongoose.model('feedback', feedbackSchema)