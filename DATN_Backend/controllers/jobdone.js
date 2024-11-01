import Jobdone from "../models/jobdone";
export const remove = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const jobDone = await Jobdone.findOneAndDelete(condition);
        res.json(jobDone)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}
export const getJobdoneByUserId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const jobdone = await Jobdone.find(filter).sort({ createdAt: -1 }).exec()
        res.json(jobdone)
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}
export const addJobdone = async (req, res) => {
    try {
        const jobdone = await new Jobdone(req.body).save();
        res.json(jobdone)
    } catch (error) {
        res.status(400).json({
            message: "Đã xảy ra lỗi"
        })
    }
}