import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    package_name: {
        type: String,
        required: true,
    },
    package_code: {
        type: String,
        required: true,
    },
    package_desc: {
        type: String,
        required: true,
    },
    package_price: {
        type: Number,
        required: true
    },
    package_day: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model('package', packageSchema)