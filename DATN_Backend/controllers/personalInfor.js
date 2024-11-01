import PERSONALINFOR from "../models/personalInfor";

export const getPersonalInfors = async (req, res) => {
    try {
        const infors = await PERSONALINFOR.find().exec();
        res.json(infors);
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được"
        })
    }
}
export const getPersonalInfor = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const infor = await PERSONALINFOR.findOne(filter);
        res.json(infor)
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được"
        })
    }
}
export const editPersonalInfor = async (req, res) => {
    try {
        const infor = await PERSONALINFOR.findByIdAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        ).exec();
        return res.status(200).json(infor);
    } catch (error) {
        console.log("Lỗi không cập nhật được");
    }
}