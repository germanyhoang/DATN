import FEEDBACK from "../models/feedback";

export const getFeedBacks = async (req, res) => {
    try {
        const feedbacks = await FEEDBACK.find().exec();
        res.json(feedbacks);
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được nhận xét"
        })
    }
}
export const getFeedBack = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const feedback = await FEEDBACK.findOne(filter);
        res.json(feedback)
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được"
        })
    }
}
export const getFeedbackByUId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const feedbacks = await FEEDBACK.find(filter).sort({ createdAt: -1 }).exec()
        res.status(200).json(feedbacks)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}
export const addFeedBack = async (req, res) => {
    try {
        const feedback = await new FEEDBACK(req.body).save();
        res.json(feedback)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được nhận xét"
        })
    }
}
export const removeFeedback = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const feedback = await FEEDBACK.findOneAndDelete(condition);
        res.json(feedback)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}
export const approveFeedback = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const feedback = await FEEDBACK.findOneAndUpdate(id, { $set: { 'feedback_status': true } }, { new: true });
        res.json(feedback)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}

export const refuseFeedback = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const feedback = await FEEDBACK.findOneAndUpdate(id, { $set: { 'feedback_status': false } }, { new: true });
        res.json(feedback)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}