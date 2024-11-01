import Service from "../../models/employer/service"
import moment from "moment";
import UserNTD from "../../models/auth_epr";
export const getServicesByUId = async (req, res) => {
    const id = { userId: req.params.uid }
    try {
        const services = await Service.find(id).sort({ createdAt: -1 }).populate(["userId","serviceId"]).exec()
        res.json(services)
    } catch (error) {
        res.status(400).json({
            message: "Không có dữ liệu"
        })
    }
}

export const addService = async (req, res) => {
    const {transactionNo,packageDay,userId,currentService,serviceId} = req.body;
    try {
    const service = await Service.findOne({userId,serviceId});
    
    if(service){
        if(service.transactionNo.includes(transactionNo)){
        return res.status(400).json({
            success: false,
            message : "Giao dịch đã tồn tại"
        })
    }
       const update = {
            // expireDay : moment(service.expireDay).add(packageDay,'days').format(),
            expireDay: moment(service.expireDay).isAfter(moment()) ? moment(service.expireDay).add(packageDay, 'days').format() : moment().add(packageDay, 'days').format(),
            transactionNo : [...service.transactionNo,transactionNo],
            currentService
        }
       const data = await Service.findOneAndUpdate({userId : req.body.userId},update,{new:true});
       await UserNTD.findOneAndUpdate({_id : data.userId } ).exec();
       return res.json(data)
    }
    else {
        const body = {
            transactionNo,
            expireDay : moment().add(packageDay,'days').format(),
            userId,
            currentService,
            serviceId,
        }
        const data = await new Service(body).save();
        await UserNTD.findOneAndUpdate({_id : data.userId },{ next_post_time : moment()}).exec();
        return res.json({
            data,
            success: true,
        })
    }
    } catch (error) {
        console.log(error);
       res.status(400).json(error);
    }
}

export const removeService = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const service = await Service.findOneAndDelete(id);
        res.json(service)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}
