import ProfileEpr from '../models/profile_employer'

export const getProfiles = async (req, res) => {
    try {
        const profilesEpr = await ProfileEpr.find().sort({ createdAt: -1 }).exec()
        res.status(200).json(
            profilesEpr
        )
    } catch (error) {
        res.status(400).json({
            message: 'Không có dữ liệu'
        })
    }
}

export const getProfile = async (req, res) => {
    const filter = { email: req.params.email }
    try {
        const profilesEpr = await ProfileEpr.findOne(filter)
        res.status(200).json(
            profilesEpr
        )
    } catch (error) {
        res.status(400).json({
            message: 'Không có dữ liệu'
        })
    }
}

export const addProfile = async (req, res) => {
    try {
        const profileEpr = await new ProfileEpr(req.body).save()
        res.status(200).json(
            profileEpr
        )
    } catch (error) {
        res.status(400).json({
            message: 'Không thể thêm'
        })
    }
}

export const updateProfile = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const user = await ProfileEpr.findOneAndUpdate(
            id,
            req.body,
            { new: true }
        ).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Không sửa được" });
    }
};

