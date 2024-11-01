import mongoose from "mongoose";

const serviceAdmSchema = mongoose.Schema({
    emailUser: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
    serviceStatus: {
        type: Boolean,
        required: true,
    }
},
    {
        timestamps: true
    })

export default mongoose.model('serviceAdm', serviceAdmSchema)