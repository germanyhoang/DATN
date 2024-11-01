import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    voucher_code: {
        type: String
    },
    voucher_value: {
        type: Number
    },
    voucher_status: {
        type: Boolean,
    },
    expiration_date: {
        type: String
    },
    voucher_quantity: {
        type: Number
    }
}, {
    timestamps: true,
})

export default mongoose.model('Voucher', voucherSchema)