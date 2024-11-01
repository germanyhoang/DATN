import UserNTV from "../../models/auth_epe";
import UserNTD from "../../models/auth_epr";
import Career from "../../models/admin/career";
import Post from "../../models/post";
import Package from '../../models/package'

export const TotalUser = async (req, res) => {
    try {
        const userNTV = await UserNTV.find();
        const userNTD = await UserNTD.find();
        const Careers = await Career.find();
        const posts = await Post.find();
        const packageData = await Package.find();
        const totalCareers = Careers.length;
        const totalNTV = userNTV.length;
        const totalNTD = userNTD.length;
        const totalUser = totalNTV + totalNTD;
        const totalPosts = posts.length;
        const TotalPackage = packageData.length;
        // Lấy thời gian đầu tuần trước
        const theLastWeek = new Date();
        theLastWeek.setDate(theLastWeek.getDate() - 7);

        // Lấy thời gian cuối tuần trước
        const theWeekBeforeLast = new Date(theLastWeek);
        theWeekBeforeLast.setDate(theWeekBeforeLast.getDate() - 14);
        // Lấy các bản ghi từ 7 ngày trước đến nay
        const UserLastWeekTotalNTV = await UserNTV.find({
            createdAt: { $gte: theLastWeek }
        });
        // Lấy các bản ghi từ 14 ngày trước đến 7 ngày trước
        const UserWeekBeforeLastTotalNTV = await UserNTV.find({
            createdAt: { $lt: theWeekBeforeLast, $lt: theLastWeek }
        });

        //NTD
        const UserLastWeekTotalNTD = await UserNTD.find({
            createdAt: { $gte: theLastWeek }
        });
        // Lấy các bản ghi từ 14 ngày trước đến 7 ngày trước
        const UserWeekBeforeLastTotalNTD = await UserNTD.find({
            createdAt: { $lt: theWeekBeforeLast, $lt: theLastWeek }
        });

        //NTD
        const PostLastWeekTotalpost = await Post.find({
            createdAt: { $gte: theLastWeek }
        });
        // Lấy các bản ghi từ 14 ngày trước đến 7 ngày trước
        const PostWeekBeforeLastTotalpost = await Post.find({
            createdAt: { $lt: theWeekBeforeLast, $lt: theLastWeek }
        });
        //ENDNTD
        const userLastWeekTotalNTD = UserLastWeekTotalNTD.length;
        const userWeekBeforeLastTotalNTD = UserWeekBeforeLastTotalNTD.length;
        const userLastWeekTotalNTV = UserLastWeekTotalNTV.length;
        const userWeekBeforeLastTotalNTV = UserWeekBeforeLastTotalNTV.length;
        const postLastWeekTotalpost = PostLastWeekTotalpost.length;
        const postWeekBeforeLastTotalPosts = PostWeekBeforeLastTotalpost.length;
        res.status(200).json({
            totalUser: { totalUser, userLastWeekTotal: (userLastWeekTotalNTV + userLastWeekTotalNTD), userWeekBeforeLastTotal: (userWeekBeforeLastTotalNTV + userWeekBeforeLastTotalNTD) },
            totalNTV: { totalNTV, userLastWeekTotalNTV, userWeekBeforeLastTotalNTV },
            totalNTD: { totalNTD, userLastWeekTotalNTD, userWeekBeforeLastTotalNTD },
            totalPosts: { totalPosts, postLastWeekTotalpost, postWeekBeforeLastTotalPosts },
            totalCareers,
            TotalPackage,
            packageData
        });
    } catch (error) {
        res.status(400).json({ message: "không thể lấy dữ liệu" });
    }
};
