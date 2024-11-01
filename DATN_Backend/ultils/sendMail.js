import nodemailer from "nodemailer";

export const sendMail = async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // 587
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Job For You" <no-reply@jobforyou.com>', // Tên / Email người gửi
        to: email, // Danh sách người nhận
        subject: subject, // Tiêu đề
        html: html, // Nội dung 
    });

    return info
}
