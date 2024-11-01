import mongoose, { Schema, ObjectId } from "mongoose";
const AppliedJobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    post_id: {
        type: String,
        required: true,
    }
}, { timestamps: true });
export default mongoose.model('AppliedJobSchema', AppliedJobSchema);