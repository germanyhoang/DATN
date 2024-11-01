// b1: include thư viện http
import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv'
dotenv.config()

import Home from "./routes/home";
import productsRouter from "./routes/product";
import mongoose from "mongoose";
import feedbacksRouter from "./routes/feedback";
import profileRouter from "./routes/profile";
import profileEprRouter from "./routes/profile_employer";
import voucherRouter from "./routes/admin/admin_voucher";
import cvRouter from './routes/manage_cv'
import jobsaveRouter from './routes/job_save'
import jobdonesRouter from './routes/jobdone'
import authNTVRoute from './routes/auth_epe'
import authNTDRoute from './routes/auth_epr'
import authRoute from './routes/admin/auth'
import personalInforsRouter from "./routes/personalInfor";
import postRoute from './routes/post'
import packageRoute from './routes/package'
import adPackageRoute from './routes/admin/package'
import banner from './routes/admin/banner'
import career from "./routes/admin/career";
import orderRoute from './routes/employer/order'
import serviceRoute from './routes/employer/service'
import chartLine from "./routes/admin/chartLine"
import serviceAdmRoute from "./routes/admin/service"
import notificationRoute from './routes/notification'
import candidateRoute from "./routes/employer/candidate"
const app = express()
app.use(cors())
app.use(cookieParser())
mongoose.connect('mongodb://0.0.0.0/DATN')
    .then(() => console.log("Kết nối db thành công"))
    .catch((error) => console.log(error.message));

app.use(express.json())

// CV Preview
app.use('/files', express.static('files/cvs'));

app.use(Home);
app.use("/api", productsRouter);
// app.use("/api", jobdonesRouter);
app.use("/api", feedbacksRouter);
app.use("/api", jobsaveRouter);
app.use("/api", jobdonesRouter);
app.use("/api", profileRouter);
app.use("/api", profileEprRouter);
app.use("/api", voucherRouter);
app.use("/api", cvRouter);
app.use("/api", authNTVRoute)
app.use("/api", authNTDRoute)
app.use("/api", personalInforsRouter);
app.use("/api", authRoute)
app.use("/api", postRoute)
app.use("/api", packageRoute)
app.use("/api", adPackageRoute)
app.use("/api", career)
app.use("/api", orderRoute)
app.use("/api", serviceRoute)
app.use("/api", chartLine)
app.use("/api", serviceAdmRoute)
app.use("/api", candidateRoute)
app.use("/api", notificationRoute)
app.use("/api", banner)

app.listen(process.env.PORT, () => {
    console.log("Server is running port", process.env.PORT);
})