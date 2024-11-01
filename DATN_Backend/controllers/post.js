import moment from "moment";
import Post from "../models/post"
import Service from '../models/employer/service'
import UserNTD from '../models/auth_epr';
import { sendMail } from '../ultils/sendMail';
//Get posts
export const getPosts = async (req, res) => {
    const {career,id} = req.query;
    const condition = {
        display_time : {$gte : moment()},

    }
    try {
        if(career){
            let posts = await Post.find(condition).sort({ createdAt: -1 }).limit(5).populate({ path: "user_id", select: ["name","_id"] }).exec()
            if(posts) posts = posts.filter(item => item._id.toString() !== id);
            return res.json(posts)
        }
        else{
            const posts = await Post.find(condition).sort([['priority', -1], ['createdAt', -1]]).populate('career').exec()
            return res.json(posts)
        }
    } catch (error) {
        res.status(400).json({
            message: "Không có dữ liệu"
        })
    }
}

export const getMyPosts = async (req, res) => {
    const { isSave, isDone } = req.body
    const condition = isSave && { isSave: true } || isDone && { isDone: true }

    try {
        const posts = await Post.find(condition).sort({ createdAt: -1 }).exec()

        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json({
            message: "Không có dữ liệu"
        })
    }
}

export const getPost = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const post = await Post.findOne(filter)
        res.json(post)
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}

//Get posts by user id
export const getPostsByUserId = async (req, res) => {
    const filter = { user_id: req.params.userId }
    try {
        const post = await Post.find(filter).sort({ createdAt: -1 }).populate('career').exec()
        res.json(post)
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}

export const getPostsDefUserId = async (req, res) => {
    const filter = { user_id: { $ne: req.params.userId } }
    try {
        const posts = await Post.find(filter).sort({ createdAt: -1 }).exec()
        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(404).json({
            message: "Không tim thấy!"
        })
    }
}

export const addPost = async (req, res) => {
    try {
        const service = await Service.findOne({userId : req.body.user_id , serviceId : req.body.service_id}).populate('serviceId').exec();
        const user = await UserNTD.findOne({_id :  req.body.user_id}).exec();
        if(user && moment(user.next_post_time).isAfter(moment())){
            return res.status(400).json({
                message : 'Bạn chưa thể đăng tin tuyển dụng',
            })
        }
        if(service && service.expireDay && moment(service.expireDay).isAfter(moment())){
            if(service.serviceId.package_type == "basic"){
                const startDay = moment().startOf('day')
                const endDay = moment().endOf('day')
                const condition = {
                    user_id : req.body.user_id,
                    createdAt : {$gte: startDay , $lt : endDay}
                }
                const post = await Post.countDocuments(condition);
                if(post >= service.serviceId.limit_post_day) {
                    return res.status(400).json({
                        message : "Bạn đã đăng tối đa giới hạn tin tuyển dụng trong ngày"
                    })
                }
                req.body['priority'] = 1;
            }
            if(service.serviceId.package_type == "standard") {
                req.body['priority'] = 2;
            }
            if(service.serviceId.package_type == "premium") {
                req.body['post_status'] = true;
                req.body['priority'] = 3;
            }
            req.body['display_time'] = moment().add(service.serviceId.display_time,'days');
            req.body['service_type'] = service.serviceId.package_type;
            await UserNTD.findOneAndUpdate({_id :  req.body.user_id},{next_post_time : moment()}).exec();
        }
        else if (service && !service.expireDay){
            req.body['display_time'] = moment().add(3,'days');
            req.body['service_type'] = "";
            req.body['priority'] = 0;
            await UserNTD.findOneAndUpdate({_id :  req.body.user_id},{next_post_time : moment().add(3,'days')}).exec();
        }
        else if (!service) {
            req.body['display_time'] = moment().add(3,'days');
            req.body['service_type'] = "";
            req.body['priority'] = 0;
            await UserNTD.findOneAndUpdate({_id :  req.body.user_id},{next_post_time : moment().add(3,'days')}).exec()
        }
            const post = await new Post({
                ...req.body,
                isSave: false,
                isDone: false,
            }).save();
            return res.json(post)
    } catch (error) {
        res.status(400).json(error)
    }
}

export const addMyPost = async (req, res) => {
    const { isSave, isDone } = req.body
    const filter = { _id: req.params.id }
    const conditionUpdate = isSave && { isSave: true } || isDone && { isDone: true }

    try {
        const post = await Post.findOneAndUpdate(
            filter, 
            conditionUpdate,
            { new: true }
        )

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(400).json({
            message: "Đã xảy ra lỗi"
        })
    }
}

export const removeMyPost = async (req, res) => {
    const { isSave, isDone } = req.body
    const filter = { _id: req.params.id }
    const conditionUpdate = isSave && { isSave: false } || isDone && { isDone: false }

    try {
        const post = await Post.findOneAndUpdate(
            filter, 
            conditionUpdate,
            { new: true }
        )

        res.status(200).json({
            success: true,
            post
        })
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa bài đăng"
        })
    }
}

export const editPost = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Post.findOneAndUpdate(id, req.body, { new: true });
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}

export const removePost = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Post.findOneAndDelete(id);
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể xóa"
        })
    }
}

export const duyet = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Post.findOneAndUpdate(id, { $set: { 'post_status': true } }, { new: true });
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}

export const tuchoi = async (req, res) => {
    const id = { _id: req.params.id }
    try {
        const post = await Post.findOneAndUpdate(id, { $set: { 'post_status': false } }, { new: true });
        res.json(post)
    } catch (error) {
        res.status(400).json({
            message: "Không thể cập nhật"
        })
    }
}

export const searchPostByName = async (req, res) => {
    const filter = { job_name: { $regex: req.query.q } }
    try {
        const newPosts = await Post.find(filter).limit(3).sort({ createdAt: -1 }).exec()
        res.status(200).json({
            posts: newPosts
        })
    } catch (error) {
        res.status(404).json({
            message: "Không tìm thấy"
        })
    }
}
export const searchPost = async (req, res) => {
    let { work_location, key, min_job_salary,max_job_salary,career,offer_salary,level, working_form,sort  } = req.query
    try {
        let minSalaryConditions;
        let maxSalaryConditions;
        let offerSalaryConditions = Boolean(offer_salary);
        if (min_job_salary && max_job_salary) {
            minSalaryConditions = {$lte : Number(max_job_salary)}
            maxSalaryConditions = {$gte : Number(min_job_salary)}
            offerSalaryConditions = false;
        }
        else if( min_job_salary && !max_job_salary) {
            minSalaryConditions = {$gte : Number(min_job_salary)}
            offerSalaryConditions = false;
        }
        const conditions = {
            job_name: { $regex: key, $options: "i" },
            work_location,
            offer_salary : offerSalaryConditions,
            min_job_salary: minSalaryConditions,
            max_job_salary: maxSalaryConditions,
            career,
            level,
            working_form,
            display_time : {$gte : moment()}
        }
        if(!key){
            delete conditions['job_name']
        } 
        for (const condition in conditions) {
            if (!conditions[condition]) {
                delete conditions[condition]
            }

        }
        const data = await Post.find(conditions).sort([['priority', -1], ['createdAt', sort]])
        .populate('career').exec()
        return res.json({
            data,
            message: `Có ${data.length} việc làm phù hợp ${key ? `"${key}"`: ""}`
        })

    } catch (error) {
        res.status(400).json({
            message: error.message,
        })
    }
}


// Giả sử req.params.career là ID hoặc tên ngành nghề
export const jobCountByCareer = async (req, res) => {
    try {
        const jobCounts = await Post.aggregate([
            { $match: { career: req.params.career } },
            { $group: { _id: '$career', count: { $sum: 1 }, postIds: { $push: '$_id' },  userIds: { $push: '$user_id' }, emailIds: {$push: '$email'}} },
        ]);
        res.json(jobCounts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};

// emailController.js

export const sendEmailToCareerAPI = async (req, res) => {
    try {
        const { email, subject, html } = req.body;

        if (!email || !subject || !html) {
            return res.status(400).json({ message: 'Thiếu tham số bắt buộc' });
        }

        // Gửi email
        const info = await sendMail({ email, subject, html });

        // Kiểm tra xem email có được gửi thành công hay không
        if (info.messageId) {
            return res.status(200).json({ message: 'Email đã được gửi thành công', info });
        } else {
            return res.status(500).json({ message: 'Không gửi được email', info });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};

export const countNewCandidates = async (req, res) => {
    const { post_id } = req.body;
    try {
        const post = await Post.findOneAndUpdate({_id: post_id}, { $inc: { newCandidates: 1 } }, {  new: true} )

        res.status(200).json(post)
    } catch (error) {
        res.json({
            message: 'Có lỗi'
        })
    }
}

export const resetNewCandidates = async (req, res) => {
    const { post_id } = req.body;
    try {
        const post = await Post.findOneAndUpdate({_id: post_id}, { newCandidates: 0 }, {  new: true} )

        res.status(200).json(post)
    } catch (error) {
        res.json({
            message: 'Có lỗi'
        })
    }
}
