import User from "../models/auth_epr";
import UserNTV from "../models/auth_epe";
import { sendMail } from "../ultils/sendMail";
import crypto, { createHmac } from 'crypto'
import jwt from "jsonwebtoken";
import Service from '../models/employer/service'
import moment from "moment";
import { log } from "console";
function createToken (user) {
    //Tạo payload chứa thông tin người dùng
    const payload = {
        id: user._id,
        email: user.email
    }
    const secretKey = 'login_token';

    const token = jwt.sign(payload, secretKey);

    return token;
}

export const signupNTD = async (request, response) => {
    const { email } = request.body
    const exitsUser = await User.findOne({ email }).exec()
    if (exitsUser) {
        return response.json({
            success: false,
            mes: "Email đã được đăng ký. Vui lòng nhập email khác"
        })
    }
    const checkUser = await UserNTV.findOne({ email }).exec()
    if (checkUser) {
        return response.json({
            success: false,
            mes: "Email đã được đăng ký trên trang Người tìm việc"
        })
    }

    const user = await User({ ...request.body, role: 1 }).save()
    response.json({
        success: user ? true : false,
        user
    })
}

export const sendEmailVerified = async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email }).exec()
    const token = crypto.randomBytes(8).toString('hex')
    const tokenExpires = Date.now() + 5 * 60 * 1000

    user.verifiedToken = token
    user.tokenExpires = tokenExpires
    await user.save()

    const html = `Xin vui lòng nhấn vào link dưới đây để hoàn tất quá trình đăng ký. <br/> Mã xác nhận: <b style="font-size: 15px">${token}</b>. <br/> Link có hiệu lực trong 5 phút`
    await sendMail({ email, html, subject: 'Xác thực email' })
    return res.json({
        success: true,
        mes: 'Mã xác thực đã được gửi về email của bạn. Vui lòng kiểm tra email'
    })
}

export const finalActive = async (req, res) => {
    const { token, email } = req.body
    const user = await User.findOne({ email }).exec()
    if (user.verifiedToken !== token || user.tokenExpires < Date.now()) {
        return res.json({
            success: false,
            mes: 'Mã xác nhận không hợp lệ'
        })
    }
    user.verifiedToken = undefined
    user.tokenExpires = undefined
    user.isEmailVerified = true
    await user.save()
    return res.json({
        success: true,
        user
    })
}

export const signinNTD = async (request, response) => {
    const { email, password } = request.body
    let accessToken
    const user = await User.findOne({ email }).exec()
    if (email && !user) {
        return response.json({
            success: false,
            mes: "Tài khoản hoặc mật khẩu không đúng."
        })
    }
    if (email && user && !user.authenticate(password)) {
return response.json({
            success: false,
            mes: "Tài khoản hoặc mật khẩu không đúng."
        })
    }

    if(user) accessToken = createToken(user)

    return response.json({
        success: user ? true : false,
        accessToken,
        user
    })
}

export const listUser = async (request, response) => {
    try {
        const user = await User.find().exec()
        return response.json(
            user
        )

    } catch (error) {
        return response.status(400).json({
            success: false,
            message: "không tìm thấy dữ liệu" 
        })
    }
}

export const deleteUser = async (request, response) => {
    try {
        const user = await User.findOneAndDelete({ _id: request.params.id }).exec()
        return response.json(user);
    } catch (error) {
        return response.status(400).json({ message: "Không xóa duoc" })
    }
}

export const detailUser = async (request, response) => {
    try {
        let user = await User.findOne({ email: request.params.email }).exec()
        // console.log(user)
        if(user) {
            const service = await Service.find({userId : user._id}).populate('serviceId').exec();
            console.log(service);
            let isActivePackage = false;
            let serviceType = "";
            service.forEach(element =>{
                if(element.serviceId.package_type == "basic"){
                    serviceType = "basic"
                }
                if(element.serviceId.package_type == "standard"){
                    serviceType = "standard"
                }
                if(element.serviceId.package_type == "premium"){
                    serviceType = "premium"
                }
            })
            if(moment(service.expireDay).isAfter(moment())){
              isActivePackage = true
            }
            const userData = {...user._doc,isActivePackage,serviceType};
            return response.json(userData)
        }
        else {
            return response.json(user)
        }
    } catch (error) {
        return response.status(400).json({ message: "Không tìm thấy dữ liệu" })
    }
}

export const getUser = async (request, response) => {
    try {
        let user = await User.findOne({ _id: request.params.id }).exec()
        return response.json(user)
    } catch (error) {
        return response.status(400).json({ message: "Không tìm thấy dữ liệu" })
    }
}

export const updateUserEpr = async (req, res) => {
    const { _id } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { _id },
            req.body,
            { new: true }
        );
        return res.json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(400).json({ message: "Không sửa được" });
    }
};

export const forgotPasswordEpr = async (req, res) => {
    const { email } = req.query
    const user = await User.findOne({ email })
    if (email && !user) return res.json({
        success: false,
        mes: `Không tìm thấy ${email}`
    })
    const resetToken = user.createPasswordChangeToken()
    await user.save()
    const html = `Xin vui lòng nhấn vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/reset-pasword-epr/?token=${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: "Quên mật khẩu"
    }

    const rs = await sendMail(data)
    return res.json({
        success: true,
        rs
    })
}

export const resetPassword = async (req, res) => {
    const { password, token } = req.body
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) return res.json({
        success: false,
        mes: 'Mã xác nhận không hợp lệ'
    })

    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.json({
        success: user ? true : false,
        mes: user ? 'Đã cập nhật mật khẩu' : 'Đã xảy ra lỗi'
    })

}

export const changePassEpr = async (req, res) => {
    const { oldpass, newpass, email } = req.body
    const password = createHmac('sha256', '123456').update(oldpass).digest('hex')
    const user = await User.findOne({ email })
    if (user.password != password) return res.json({
        success: false,
        mes: 'Sai mật khẩu. Vui lòng thử lại'
    })

    user.password = newpass
    await user.save()
    return res.json({
        success: user ? true : false,
        mes: user ? 'Đã thay đổi mật khẩu' : 'Đã xảy ra lỗi'
    })
}