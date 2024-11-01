import Candidate from "../../models/employer/candidate"

export const createCandidate = async (req, res) => {
    try {
        const candidate = await new Candidate(req.body).save()
        res.status(200).json({
            candidate
        })
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const getCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ createdAt: -1 }).exec()
        res.status(200).json(candidates)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const getCandidatesByUId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const candidates = await Candidate.find(filter).sort({ createdAt: -1 }).exec()
        res.status(200).json(candidates)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const getCandidate = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const candidate = await Candidate.findOne(condition)
        res.status(200).json(candidate)
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy."
        })
    }
}

export const removeCandidate = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const candidate = await Candidate.findOneAndDelete(condition)
        res.status(200).json(candidate)
    } catch (error) {
        res.status(400).json({
            message: "Không xóa được."
        })
    }
}