import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    order_name: {
        type: String,
        required: true,
    },
    order_status: {
        type: Boolean,
        required: true,
    },
    order_price: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    package_id: {
        type: mongoose.Types.ObjectId,
        ref:'packageAdm',
        required: true,
    },
}, { timestamps: true });
export default mongoose.model('Order', orderSchema);