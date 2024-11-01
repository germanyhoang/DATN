import Profile from '../models/profile.js'

export const list = async (req, res) => {
    try {
        const profiles = await Profile.find().exec();
        res.json(profiles);
    } catch (error) {
        res.status(400).json({
            message: "Không có hồ sơ nào"
        })
    }
}


export const read = async (req, res) => {
    const filter = { email: req.params.email }
    try {
        const profile = await Profile.findOne(filter);
        res.json(profile)
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy hồ sơ"
        })
    }
}

export const updateUser = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const user = await Profile.findOneAndUpdate(
            id,
            req.body,
            { new: true }
        ).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Không sửa được" });
    }
};

export const add = async (req, res) => {
    try {
        const profile = await new Profile(req.body).save()
        res.status(200).json({
            profile
        })
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được."
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const profile = await Profile.findOneAndDelete(condition);
        res.json(profile)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xoá"
        })
    }
}
