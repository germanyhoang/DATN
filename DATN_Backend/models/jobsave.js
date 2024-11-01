import mongoose from "mongoose";
const jobsaveSchema = new mongoose.Schema({
    job_name: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
    job_salary: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
    },
    work_location: {
        type: String,
    },
    working_form: {
        type: String,
        required: true,
    },
    jobsaves:{
        type: String,
    }
}, {
    timestamps: true,
})
export default mongoose.model('jobsave', jobsaveSchema)