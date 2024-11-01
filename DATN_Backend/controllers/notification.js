import Notification from "../models/notification";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 }).exec();
        res.json(notifications);
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được"
        })
    }
}
export const getNotification = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const noti = await Notification.findOne(filter);
        res.json(noti)
    } catch (error) {
        res.status(400).json({
            message: "Không hiển thị được"
        })
    }
}
export const getNotificationEmail = async (req, res) => {
    const filter = { email: req.params.email };
    try {
        const noti = await Notification.find({ email: filter.email }).sort({ createdAt: -1 });
        if (noti) {
            res.json(noti);
        } else {
            res.status(404).json({
                message: "Không tìm thấy thông báo cho email này."
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

export const addNotification = async (req, res) => {
    try {
        const notification = await new Notification(req.body).save();
        setTimeout(async () => {
            await Notification.findByIdAndDelete(notification._id);
        }, 5 * 60 * 1000);

        res.json(notification);
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được"
        });
    }
}

export const editNotification = async (req, res) => {
    try {
        const { isRead } = req.body;
        const notification = await Notification.findByIdAndUpdate(
            { _id: req.params.id },
            { isRead }, 
            { new: true }
        ).exec();
        return res.status(200).json(notification);
    } catch (error) {
        console.error("Lỗi cập nhật thông báo:", error);
        return res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
    }
};
