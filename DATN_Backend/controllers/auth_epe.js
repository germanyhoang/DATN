
import UserNTV from "../models/auth_epe";
import UserNTD from "../models/auth_epr";
import { sendMail } from "../ultils/sendMail";
import crypto, { createHmac } from 'crypto'
import jwt from "jsonwebtoken";

function createToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    };
    const secretKey = 'login_token';
    const token = jwt.sign(payload, secretKey);

    return token;
}

export const signupNTV = async (request, response) => {
    const { email } = request.body
    const exitsUser = await UserNTV.findOne({ email }).exec()
    if (exitsUser) {
        return response.json({
            success: false,
            mes: "Email đã được đăng ký. Vui lòng nhập email khác"
        })
    }

    const checkUser = await UserNTD.findOne({ email }).exec()
    if (checkUser) {
        return response.json({
            success: false,
            mes: "Email đã được đăng ký trên trang Nhà tuyển dụng"
        })
    }

    const user = await UserNTV({
        ...request.body,
        isEmailVerified: false,
        isPhoneVerified: false,
        level_auth: 1,
        role: 2
    }).save()
    return response.json({
        success: user ? true : false,
        mes: user ? 'Đăng ký thành công' : 'Đã xảy ra lỗi'
    })
}

export const sendEmailVerified = async (req, res) => {
    const { email } = req.body
    const user = await UserNTV.findOne({ email }).exec()
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
    const user = await UserNTV.findOne({ email }).exec()
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

export const signinNTV = async (request, response) => {
    const { email, password } = request.body
    const user = await UserNTV.findOne({ email }).exec()
    let accessToken

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

    if (user) {
        accessToken = createToken(user);
    }

    return response.json({
        accessToken,
        success: user ? true : false,
        user
    })
}

export const listUser = async (request, response) => {
    try {
        const user = await UserNTV.find().exec()
        return response.json(
            user
        )

    } catch (error) {
        return response.status(400).json({
            success: false,
            mes: "Không tìm thấy dữ liệu"
        })
    }
}

export const deleteUser = async (request, response) => {
    try {
        const user = await UserNTV.findOneAndDelete({ _id: request.params.id }).exec()
        return response.json({
            success: true,
            user
        });
    } catch (error) {
        return response.status(400).json({
            success: false,
            mes: "Không xóa được"
        })
    }
}

export const detailUser = async (request, response) => {
    try {
    const user = await UserNTV.findOne({ email: request.params.email }).exec()
        return response.json(
            user
        )
    } catch (error) {
        return response.status(404).json({
            success: false,
            mes: "Không tìm thấy người dùng"
        })
    }
}
export const updateUser = async (req, res) => {
    const { _id } = req.body;

    try {
        const user = await UserNTV.findOneAndUpdate(
            { _id },
            req.body,
            { new: true }
        );
        return res.json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            mes: "Không cập nhật được"
        });
    }
};

export const forgotPasswordEpe = async (req, res) => {
    const { email } = req.query
    const user = await UserNTV.findOne({ email })
    if (email && !user) return res.json({
        success: false,
        mes: `Không tìm thấy ${email}`
    })
    const resetToken = user.createPasswordChangeToken()
    await user.save()
    const html = `Xin vui lòng nhấn vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_CLIENT}/reset-pasword-epe/?token=${resetToken}>Click here</a>`

    const data = {
        email,
        html,
        subject: 'Quên mật khẩu'
    }

    const rs = await sendMail(data)
    return res.json({
        success: true,
        rs
    })
}
export const sendMaill = async (req, res) => {
    const { recipient_email, time, date, location, phone, content } = req.body

    const data = {
        email: recipient_email,
        html: ` <p>Trước hết,<p/> 
         <p>Chúng tôi rất cám ơn sự quan tâm bạn đã dành cho công ty của chúng tôi.Qua hồ sơ của bạn, chúng tôi nhận thấy bạn có những tiềm năng để trở thành một phần của công ty chúng tôi.<p/>
         <p>Chúng tôi rất hy vọng có thể trao đổi thêm với bạn trong một buổi phỏng vấn vào lúc ${time} ngày ${date} tại văn phòng công ty địa chỉ: ${location}. Đây là một bước cần thiết trong quá trình tuyển dụng để chúng tôi có thể hiểu hơn về bạn cũng như được chia sẻ với bạn nhiều hơn về câu chuyện của chúng tôi.<p/>
         <p/>
         <p>Bạn vui lòng trả lời lại email này để xác nhận khả năng tham gia buổi phỏng vấn. Nếu có bất kì điều gì bất tiện, bạn có thể liên hệ ngay qua email này hoặc qua số điện thoại ${phone}<p/>
         <p><p/>
         <p>Chúng tôi rất mong sớm được gặp và trò chuyện với bạn.<p/>
         <p>Trân trọng,<p/>
         <p>--------------------------------<p/>
         `,
        subject: 'Thư mời phỏng vấn'
    }
    const rs = await sendMail(data)
    return res.json({
        success: true,
        rs
    })
}
export const refuseSendMaill = async (req, res) => {
    const { recipient_email, html, subject } = req.body

    const data = {
        email,
        html: ` <p>Thân gửi,<p/> 
         <p>Chúng tôi đã nhận được hồ sơ ứng tuyển của bạn. Rất cám ơn vì sự quan tâm của bạn đối với vị trí việc làm của công ty chúng tôi.<p/>
         
         <p>Tuy nhiên, sau khi xem xét các hồ sơ, chúng tôi nhận thấy bạn chưa phù hợp để chọn vào vòng phỏng vấn.<p/>
         <p><p/>
         <p>Chúc bạn may mắn trong quá trình tìm việc sau đó và hi vọng sẽ có cơ hội được hợp tác với bạn trong tương lai. <p/>
         <p><p/>
         <p>Trân trọng,<p/>
         <p>--------------------------------<p/>
         `,
        subject: 'Thư từ chối phỏng vấn'
    }
    console.log(data)
    const rs = await sendMail(data)
    return res.json({
        success: true,
        rs
    })
}
export const resetPassword = async (req, res) => {
    const { password, token } = req.body
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await UserNTV.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) return res.json({
        success: false,
        mes: 'Mã xác nhận không hợp lệ'
    })

    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? 'Đã cập nhật mật khẩu' : 'Đã xảy ra lỗi'
    })

}

export const changePass = async (req, res) => {
    const { oldpass, newpass, email } = req.body
    const password = createHmac('sha256', '123456').update(oldpass).digest('hex')
    const user = await UserNTV.findOne({ email })
    if (user.password != password) return res.json({
        success: false,
        mes: 'Sai mật khẩu. Vui lòng thử lại'
    })
    user.password = newpass
    await user.save()
    return res.json({
        success: user ? true : false,
        mes: user ? 'Thay đổi thành công' : 'Đã xảy ra lỗi'
    })
}

export const changeAvatar = async (req, res) => {
    const { email, newImage } = req.body
    const user = await UserNTV.findOne({ email })
    user.image = newImage
    await user.save()
    return res.json({
        success: true,
        user
    })
}

export const saveCV = async (req, res) => {
    const { email, cvId } = req.body

    try {
        const user = await UserNTV.findOneAndUpdate(
            { email },
            { cv_id: cvId },
            { new: true }
        )

        res.status(200).json({
            mes: "Đã lưu mẫu CV"
        })
    } catch (error) {
        res.json({
            mes: error.message,
        })
    }

}

export const getUser = async (request, response) => {
    try {
        let user = await UserNTV.findOne({ _id: request.params.id }).populate("main_career").exec()
        return response.json(user)
    } catch (error) {
        return response.status(400).json({ message: "Không tìm thấy dữ liệu" })
    }
}

export const appliedJob = async (req, res) => {
  const { email, postId, postStatus } = req.body;

  try {
    const user = await UserNTV.findOne({ email });
    const newUser = await UserNTV.findOneAndUpdate(
      { email },
      {
        post_applied: [
          ...user.post_applied,
          {
            postId,
            postStatus,
          },
        ],
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      mes: "Ứng tuyển thành công",
      newUser,
    });
  } catch (error) {
    res.json({
      success: false,
      mes: error.message,
    });
  }
};

export const changeAplliedStatus = async (req, res) => {
  const { email, postId, postStatus } = req.body;

  try {
    const user = await UserNTV.findOne({ email }).lean();
    const newPostApllied = user.post_applied.map((item) =>
      item.postId === postId
        ? {
            ...item,
            postStatus,
          }
        : {
            ...item,
          }
    );

    const newUser = await UserNTV.findOneAndUpdate(
      { email },
      {
        post_applied: [...newPostApllied],
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.json({
      success: false,
      mes: error.message,
    });
  }
};

export const searhCompany = async (req, res) => {
    
    try {
        let {company_field, key} = req.query;
        const conditions = {
            company_name : { $regex: key, $options: "i"},
            company_field
        }
        for (const field in conditions) {
            if (!conditions[field]) {
                delete conditions[field]
            }
        }
        const data = await UserNTD.find(conditions);
        res.status(200).json(data);
    } catch (error) {
        console.error('Lỗi tìm kiếm công ty:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};