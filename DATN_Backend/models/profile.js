import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone_props: {
        type: {
            phone: {
                type: String,
            },
            is_verified: {
                type: Boolean,
            }
        },
    },
    birth_day: {
        type: String,
    },
    gender: {
        type: String,
    },
    province: {
        type: String,
    },
    district: {
        type: String,
    },
    specific_address: {
        type: String,
    }

}, {
    timestamps: true,
})
export default mongoose.model('Profile', profileSchema)
// import mongoose, { Schema, ObjectId } from "mongoose";
// const profileSchema = new Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     phone: {
//         type: Number,
//         required: true
//     },
//     address: {
//         type: String,
//         required: true
//     },
//     CV: {
//         type: String,
//         required: true
//     },
// }, { timestamps: true});
// profileSchema.index({'$**':'text'})
// export default mongoose.model('Profile', profileSchema);