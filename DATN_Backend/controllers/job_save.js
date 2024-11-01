import Jobsave from "../models/jobsave";
// import Jobsave from "../models/job_save";

export const remove = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const jobSave = await Jobsave.findOneAndDelete(condition);
        res.json(jobSave)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}
export const getJobSavesByUserId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const jobsave = await Jobsave.find(filter).sort({ createdAt: -1 }).exec()
        res.json(jobsave)
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}
export const addJobSave = async (req, res) => {
    try {
        const jobsave = await new Jobsave(req.body).save();
        res.json({
            success: true,
            jobsave
        })
    } catch (error) {
        res.status(400).json({
            message: "Đã xảy ra lỗi"
        })
    }
}