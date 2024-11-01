import Service from "../../models/admin/service"

export const getServicesAdm = async (req, res) => {
    const service = await Service.find().sort({ createdAt: -1 }).exec()
    res.json(service)
}

export const addServiceAdm = async (req, res) => {
    const service = await new Service(req.body).save()
    res.json({
        success: true,
        service
    })
}