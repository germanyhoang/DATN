import Voucher from "../../models/admin/admin_voucher"

export const getVouchers = async (req, res) => {
    try {
        const vouchers = await Voucher.find().exec()
        res.json(vouchers)
    } catch (error) {
        res.status(400).json({
            message: "Không có dữ liệu"
        })
    }
}

export const getVoucher = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const voucher = await Voucher.findOne(filter)
        res.json(voucher)
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}

export const addVoucher = async (req, res) => {
    try {
        const voucher = await new Voucher(req.body).save();
        res.json(voucher)
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được"
        })
    }
}

export const editVoucher = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const voucher = await Voucher.findOneAndUpdate(id, req.body, { new: true });
        res.json(voucher)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}

export const removeVoucher = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const voucher = await Voucher.findOneAndDelete(id);
        res.json(voucher)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}

export const searchVoucher = async (req, res) => {
    const key = req.query.q ? req.query.q : ''
    try {
        const newVoucher = await Voucher.filter((item) => {
            return item.job_name.toLowerCase().indexOf(key.toLowerCase()) !== -1;
        })
        res.render('index', {
            vouchers: newVoucher
        }).json()
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}