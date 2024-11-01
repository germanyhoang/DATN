import PackageAdm from '../../models/admin/package'
//list packages
export const list = async (req, res) => {
    try {
        const packAges = await PackageAdm.find().exec();
        res.json(packAges);
    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm thấy gói nào"
        })
    }
}   

            

// API them package
export const create = async (req, res) => {
    const {package_type} = req.body;
    try {
        if(package_type == 'basic'){
            req.body['limit_post_day'] = 3;
            req.body['display_time'] = 5;
        }
        if(package_type == 'standard'){
            req.body['limit_post_day'] = 0;
            req.body['display_time'] = 7;
        }
        if(package_type == 'premium'){
            req.body['limit_post_day'] = 0;
            req.body['display_time'] = 14;
        }
        // Dữ liệu từ form client gửi lên
        const packAge = await new PackageAdm(req.body).save();
        res.json(packAge)    
    } catch (error) {
        res.status(400).json({
            message: "Đã xảy ra lỗi"
        })
    }
}

// API Lay package theo id
export const read = async (req ,res) =>{
    const filter = { _id: req.params.id}
    try {
        const packAge = await PackageAdm.findOne(filter);
        res.json(packAge)
    } catch (error) {
        res.status(400).json({
            message: "Không thể tìm thấy id hoặc không thể tìm thấy gói"
        })
    }
}

// API Xoa package
export const remove = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const packAge = await PackageAdm.findOneAndDelete(condition);
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
        const result = await PackageAdm.find( { $text: { $search: SearchString } } ).exec()
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
        const packAge = await PackageAdm.findOneAndUpdate(condition, doc, option);
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