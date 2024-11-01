import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
const postSchema = new mongoose.Schema({
    job_name: {
        type: String,
        required: true,
    },
    job_description: {
        type: String,
        required: true,
    },
    min_job_salary: {
        type: Number,
    },
    max_job_salary: {
        type : Number,
    },
    offer_salary : {
        type : Boolean
    },
    working_form: {
        type: String,
        required: true,
    },
    number_of_recruits: {
        type: Number,
        required: true,
    },
    requirements: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    work_location: {
        type: Array,
        required: true,
    },
    post_status: {
        type: Boolean,
    },
    user_id: {
        type: ObjectId,
        ref : "UserNTD"
    },
    career: {
        type: ObjectId,
        ref: "Career"
    },
    logo: {
        type: String,
    },
    priority : {
        type : Number,
    },
    isSave : {
        type : Boolean,
    },
    isDone : {
        type : Boolean,
    },
    isRead : {
        type : Boolean,
    },
    newCandidates: {
        type : Number,
    },
    email: {
        type: String,
        ref : "UserNTD"
    },
    level : {
        type : String,
    },
    period: {
        type: Date,
    },
    display_time : {
        type : Date,
    },
    package_type : {
        type : String,
    }
}, {
    timestamps: true,
})

export default mongoose.model('Post', postSchema)