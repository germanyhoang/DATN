import mongoose from "mongoose";
import { createHmac } from "crypto"
const authSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    level_auth: {
        type: Number
    }
}, {
    timestamps: true,
})
authSchema.methods = {
    authenticate(password) {
        try {
            return this.password == this.encrytPassword(password)
        } catch (error) {
            console.log(error);
        }
    },
    encrytPassword(password) {
        if (!password) return
        try {
            return createHmac('sha256', '123456').update(password).digest('hex')
        } catch (error) {
            console.log(error);
        }
    }
}
authSchema.pre("save", function (next) {
    try {
        this.password = this.encrytPassword(this.password)
        next()
    } catch (error) {
        console.log(error);
    }
})
export default mongoose.model('Auth', authSchema)