import mongoose from "mongoose";
const profileEprSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phone_props: {
        phone: {
            type: String,
        },
        is_verified: {
            type: Boolean,
        }
    },
    gender: {
        type: String,
    },
    birth_day: {
        type: String,

    },
    address: {
        type: String,
    },
    desc_epr: {
        type: String,
    },
    image: {
        type: String
    }
}, {
    timestamps: true,
})
export default mongoose.model('ProfileEpr', profileEprSchema)