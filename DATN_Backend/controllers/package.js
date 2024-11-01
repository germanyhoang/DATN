import Package from '../models/package'

//list packages
export const listPackages = async (req, res) => {
    const filter = { user_id: req.params.uid }
    try {
        const packAges = await Package.find(filter).exec();
        res.json(packAges);
    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm thấy gói nào"
        })
    }
}   

            

// API them package
export const createPackage = async (req, res) => {
    try {
        // Dữ liệu từ form client gửi lên
        const packAge = await new Package(req.body).save();
        res.json(packAge)    
    } catch (error) {
        res.status(400).json({
            message: "không thể tạo gói"
        })
    }
}

// API Lay package theo id
export const readPackage = async (req ,res) =>{
    const filter = { _id: req.params.id}
    try {
        const packAge = await Package.findOne(filter);
        res.json(packAge)
    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm thấy id hoặc không thể tìm thấy gói"
        })
    }
}

// API Xoa package
export const removePackage = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const packAge = await Package.findOneAndDelete(condition);
        res.status(200).json(
            {message: "Đã xóa gói!"}
        )
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa gói"
        })
    }
}

// API Tim san pham
export const searchPackage = async (req, res) => {
    const SearchString = req.query.q ? req.query.q : ""
    try {
        const result = await Package.find( { $text: { $search: SearchString } } ).exec()
        res.json(result)
    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm thấy bất kỳ gói nào!"
        })
    }
}

// API Cap nhat package
export const updatePackage = async (req, res) => {
    // lấy id sản phẩm được truyền lên
    const condition = { _id: req.params.id};
    // nội dung cập nhật
    const doc = req.body;
    // trả về nội dung đã cập nhật xong
    const option = { new: true};
    try {
        const packAge = await Package.findOneAndUpdate(condition, doc, option);
        res.json(packAge)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật gói"
        })
    }
}

//package renewal
//userId
// export const renewalPackage =async(req,res)=>{
   
// }