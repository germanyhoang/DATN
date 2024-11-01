import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    other:{
        type: String,
    },
    image:{
        type:String
    }
}, {
    timestamps: true,
})

export default mongoose.model('Career', careerSchema)