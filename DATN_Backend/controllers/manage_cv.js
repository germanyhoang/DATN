import Cv from '../models/manage_cv'
import multer from 'multer';
import { sendMail } from '../ultils/sendMail';
import UserNTV from '../models/auth_epe'
import { isValidObjectId, Types } from 'mongoose';
const upload = multer({ dest: './files' })

export const list = async (req, res) => {
    try {
        const cv = await Cv.find().exec();
        res.json(cv);
    } catch (error) {
        res.status(400).json({
            message: "Không có hồ sơ nào"
        })
    }
}


export const read = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const cv = await Cv.findOne(filter);
        res.json(cv)
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy hồ sơ"
        })
    }
}

export const getCvsByPostId = async (req, res) => {
    const filter = { post_applied: { $elemMatch: { postId: req.params.postId } } }
    console.log(filter);
    try {
        const cvs = await UserNTV.find({ post_applied: { $elemMatch: { postId: req.params.postId } } }).sort({ createdAt: -1 }).exec();
        console.log(cvs);
        res.status(200).json({
            cvs
        })
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy bài viết."
        })
    }
}
export const getCvByPostId = async (req, res) => {
    const filter = { post_id: Types.ObjectId(req.params.postId), email: req.params.email };
    console.log(filter);
    try {
        const cvs = await Cv.findOne(filter).exec();
        console.log(cvs);
        res.status(200).json({
            cvs
        })
    } catch (error) {
        res.status(400).json({
            message: "Không tìm thấy bài viết."
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id }
    try {
        const cv = await Cv.findOneAndDelete(condition);
        res.json(cv)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xoá"
        })
    }
}

export const duyet = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Cv.findOneAndUpdate(id, { $set: { 'status': true } }, { new: true });
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}
export const getPostByCV = async (req, res) => {
    const { id } = req.params
    try {
        const cv = await Cv.find({ user_id: id }).populate('post_id').exec()
        let post = []
        for (let i = 0; i < cv.length; i++) {
            if (cv[i].post_id) {
                post.push(cv[i].post_id)
            }
        }
        res.json({
            user_id: id,
            post
        })
    } catch (error) {
        res.status(400).json({
            message: "Không thể xoá"
        })
    }
}

export const tuchoi = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Cv.findOneAndUpdate(id, { $set: { 'status': false } }, { new: true });
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}
export const removeCvByUser = async (req, res) => {
    const { user_id, post_id } = req.query
    try {
        const cv = await Cv.findOneAndDelete({ user_id, post_id }).exec()
        res.json(cv)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xoá"
        })
    }
}


export const applyCv = async (req, res) => {
    const pdf = req.file.filename
    const html = 'Chúc mừng, <br/> Chúc mừng bạn vừa có ứng viên mới phù hợp ứng tuyển vào Tin của bạn. Bạn có thể xem lại trong phần Tin tuyển dụng mục Ứng viên. <br/> Trân trọng.'
    try {
        const cv = await new Cv({
            name: req.body.name,
            job_title: req.body.job_title,
            email: req.body.email,
            post_id: req.body.post_id,
            isNew: req.body.isNew,
            cv: pdf
        }).save()
        console.log(req.body.name);
        const res = await sendMail({
            email: req.body.emailEpr,
            html,
            subject: 'Thông báo ứng viên mới'
        })

        res.status(200).json({
            success: true,
            mes: "Ứng tuyển thành công.",
            cv
        })
    } catch (error) {
        res.json({
            success: false,
            mes: error.msg
        })
    }
}

export const setIsNew = async (req, res) => {
    const { cv_id } = req.body
    try {
        const cv = await Cv.findOneAndUpdate({_id: cv_id}, { isNew: false }, { new: true })

        res.status(200).json(cv)
    } catch (error) {
        res.json({
            message: "Có lỗi"
        })
    }
}

export const getProposeCandidates = async (req,res) => {
    const {level,work_location,main_career} = req.query;
    const condition = {
        job_search_status : true,
    };
    if(level) condition['level'] = level;
    if(work_location) condition['work_location'] =  { $regex: work_location, $options: "i" };
    if(main_career) condition['main_career'] = main_career;
    try {
        const data = await UserNTV.find(condition).populate('main_career').exec();
        return res.json(data)
    } catch (error) {
        return res.json(error)
    }
}

