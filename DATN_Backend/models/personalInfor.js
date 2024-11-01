import mongoose from "mongoose";

const personalInforSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    numberphone: {
        type: Number,
        required: true,
    },
    date: {   
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    nation: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('personalInfor', personalInforSchema)