import mongoose from "mongoose";
import crypto, { createHmac } from "crypto"
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
    },
    phone: {
        type: String,
        required: true,
    },
    isPhoneVerified: {
        type: Boolean,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    address: {
        type: String,
    },
    desc_epr: {
        type: String,
    },
    passwordResetToken: {
        type: String,
    },
    passwordChangeAt: {
        type: String,
    },
    passwordResetExpires: {
        type: String,
    },
    verifiedToken: {
        type: String,
    },
    tokenExpires: {
        type: String,
    },
    role: {
        type: String
    },
    isBlock: {
        type: Boolean
    },
    service : {
        type: mongoose.Types.ObjectId,
        ref : 'Service'
    },
    next_post_time : {
        type : Date,
    },
    company_name: {
        type: String,
    },
    company_banner: {
        type: String,
    },
    company_size: {
        type: String,
    },
    company_field: {
        type: String,
    }
}, {
    timestamps: true,
})
userSchema.methods = {
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
    },
    createPasswordChangeToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}
userSchema.pre("save", function (next) {
    try {
        // chỉ mã hóa mật khẩu nếu nó đã thay đổi
        if (this.isModified("password")) {
            this.password = this.encrytPassword(this.password);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});
export default mongoose.model('UserNTD', userSchema)