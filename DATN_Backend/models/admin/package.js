import mongoose from "mongoose";

const packageAdmSchema = new mongoose.Schema({
    package_name: {
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
    package_type : {
        type : String,
        required : true,
    },
    limit_post_day : {
        type : Number,
        reqired : true,
    },
    display_time : {
        type : Number,
        required : true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('packageAdm', packageAdmSchema)