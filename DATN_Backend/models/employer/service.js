import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
    currentService : {
        type : String,
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'UserNTD',
        required:true
    },
    transactionNo : {
        type : Array,
        default : [],
    },
    expireDay : {
        type : String,
        required :true,
    },
    serviceId : {
        type : mongoose.Types.ObjectId,
        ref : "packageAdm",
        required : true,
    }
}, { timestamps: true });
export default mongoose.model('Service', serviceSchema);