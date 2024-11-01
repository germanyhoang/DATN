import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
    },
    notificationImage: {
        type: String,
    },
    notification_url :{
        type: String,
    },
    role: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 3;
            },
            message: 'Role must be a number between 1 and 3.',
        },
    },
    notification_title: {
        type: String,
        required: true,
    },
    notification_content: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
})
export default mongoose.model('notification', notificationSchema)