import Auth from "../../models/admin/auth";
import UserNTV from "../../models/auth_epe";
import UserNTD from "../../models/auth_epr";
export const signup = async (request, response) => {
    const { name, password } = request.body
    try {
        const exitsUser = await Auth.findOne({ name }).exec()
        if (exitsUser) {
            return response.status(400).json({
                message: "User đã tồn tại"
            })
        }
        const user = await Auth({ name, password, level_auth: 999 }).save()
        response.json({
            user: {
                _id: user._id,
                name: user.name,
                password: user.password,
                level_auth: 999
            }

        })
    } catch (error) {
        console.log(error);
    }
}
export const signin = async (request, response) => {
    const { name, password } = request.body
    const user = await Auth.findOne({ name }).exec()
    if (!user) {
        return response.status(400).json({
            message: "Tài khoản admin không tồn tại"
        })
    }
    if (!user.authenticate(password)) {
        return response.status(400).json({
            message: "Mật khẩu không chính xác"
        })
    }
    response.json({
        user: {
            _id: user._id,
            name: user.name,
            level_auth: user.level_auth
        }
    })
}

export const listUser = async (request, response) => {
    try {
        const user = await Auth.find().exec()
        response.json(user)

    } catch (error) {
        response.status(400).json({ message: "Không tìm thấy dữ liệu" })
    }
}
export const searchUserById = async (request, response) => {
    const userId  = request.params.id;
    //http://localhost:4000/api/users/id
    try { 
        const userNTV = await UserNTV.findOne({ _id: userId });
        if (userNTV) {
            return response.json({ user: userNTV });
        }
        const userNTD = await UserNTD.findOne({ _id: userId });
        if (userNTD) {
            return response.json({ user: userNTD });
        }

        response.status(404).json({ message: "Không tìm thấy người dùng" });
    } catch (error) {
        response.status(500).json({ message: "Lỗi server" });
    }
};
export const deleteUser = async (request, response) => {
    try {
        const user = await Auth.findOneAndDelete({ _id: request.params.id }).exec()
        response.json(user);
    } catch (error) {
        response.status(400).json({ message: "Không xóa duoc" })
    }
}

export const detailUser = async (request, response) => {
    try {
        const user = await Auth.findOne({ email: request.params.email }).exec()
        response.json(user)
    } catch (error) {
        response.status(400).json({ message: "Không tìm thấy dữ liệu" })
    }
}

export const updateUser = async (req, res) => {
    const { _id, name, phone, level_auth, email, password } = req.body;
    try {
        const user = await Auth.findOneAndUpdate(
            { _id },
            { name, phone, level_auth, email, password },
            { new: true }
        ).exec();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: "Không sửa được" });
    }
};

// export const BlockUser = async (req, res) => {
//     const { _id, level_auth } = req.body;
//     try {
//         const user = await Auth.findOneAndUpdate(
//             { _id },
//             { level_auth },
//             { new: true }
//         ).exec();
//         res.json('đã block thằng này');
//     } catch (error) {
//         res.status(400).json({ message: "Không Block được" ,error});
//     }
// };

export const BlockUser = async (req, res) => {
    const { email } = req.body;
    const userNTD = await UserNTD.findOne({ email });
    const userNTV = await UserNTV.findOne({ email });
    if (userNTD) {
        userNTD.isBlock = true;
        await userNTD.save();
    }
    if (userNTV) {
        userNTV.isBlock = true;
        await userNTV.save();
    }
    return res.json({
        success: userNTD || userNTV ? true : false,
        res: userNTD && userNTD
    });
}

export const UnlockUser = async (req, res) => {
    const { email } = req.body;
    const userNTD = await UserNTD.findOne({ email });
    const userNTV = await UserNTV.findOne({ email });
    if (userNTD) {
        userNTD.isBlock = false;
        await userNTD.save();
    }
    if (userNTV) {
        userNTV.isBlock = false;
        await userNTV.save();
    }
    return res.json({
        success: userNTD || userNTV ? true : false,
        res: userNTD && userNTD
    });
}
