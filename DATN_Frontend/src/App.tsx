import "./App.css"
import ProfileList from "./components/Recruitment/Manage Profile/ProfileList"
import { Routes, Route } from "react-router-dom"
import LayoutClient from "./components/layouts/LayoutClient"
import HomeClient from "./components/employee/home/HomeClient"
import Login from "./components/auth/Employee/Login"
import OTPAuth from "./components/auth/OTPAuth"
import Home from "./components/employer/home/HomeEmployer"
import WorkPage from "./components/employee/works/WorkPage"
import Profile from "./components/employee/profile/Profile"
import LayoutAdmin from "./components/layouts/LayoutAdmin"
import PostDetailEp from "./components/employee/post/PostDetail"

import Register from "./components/auth/Employee/Register"
import RegisterEmployer from "./components/auth/Employer/RegisterEmployer"
import LoginEmployer from "./components/auth/Employer/LoginEmployer"
import PackageList from "./components/employer/package/PackageList"
import OrderList from "./components/employer/package/OrderList"
import OrderDetail from "./components/employer/package/OrderDetail"
import OrderNotice from "./components/employer/package/OrderNotice"
import Cart from "./components/employer/package/Cart"
import ResetPassEpe from "./components/auth/Employee/ResetPassEpe"
import ForgotPasswordNotice from "./components/auth/Employee/ForgotPasswordNotice"
import ForgotPassEpr from "./components/auth/Employer/ForgotPassEpr"
import ResetPassEpr from "./components/auth/Employer/ResetPassEpr"
import ForgotPassNotice from "./components/auth/Employer/ForgotPassNotice"
import AccEprMng from "./components/employer/profileEpr/AccEprMng"
import 'react-toastify/dist/ReactToastify.css';
import ServiceList from "./components/employer/My Service/ServiceList"
import ProfileEpr from "./components/employer/profileEpr/ProfileEpr"
import Company from "./components/pages/Company"
import Report from "./components/employer/report/Report"
// import Candidate from "./components/employer/Candidate/candidate"
// import HomeEmployer from './components/home/HomeEmployer'
// import Jobdone from './components/pages/Jobdone'
// import Job from './components/pages/Job'

import "./App.css"
// import PersonalInfor from './components/pages/PersonalInfor'
import LayoutEmployer from "./components/layouts/LayoutEmployer"
import ForgotPassEpe from "./components/auth/Employee/ForgotPassEpe"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import LoginAdmin from "./components/auth/Admin/LoginAdmin"
import Interview from "./components/pages/Interview"
// import ManageJob from "./components/pages/ManageJob"
// import RecruitmentDetails from "./components/pages/RecruitmentDetails"
import ManageProfileDetail from "./components/Recruitment/Manage Profile/ManageProfileDetail"
import VNPayCheckout from "./components/employer/package/VNPayCheckout"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import ChangeCV from "./components/CvPage/ChangeCV"
import CvDemo from "./components/CvDemo/CvDemo"
import PostList from "./components/employer/Posts/PostList"
import PostAdd from "./components/employer/Posts/PostAdd"
import PostEdit from "./components/employer/Posts/PostEdit"
import PostDetail from "./components/employer/Posts/PostDetail"
import HomeAdmin from "./components/Admin/home/HomeAdmin"
import EmployeeManage from "./components/Admin/home/EmployeeManage"
import EmployerManage from "./components/Admin/home/EmployerManage"
import VoucherList from "./components/Admin/Voucher/VoucherList"
import VoucherAdd from "./components/Admin/Voucher/VoucherAdd"
import VoucherEdit from "./components/Admin/Voucher/VoucherEdit"
import PostAdmin from "./components/Admin/Post/PostAdmin"
import CareerList from "./components/Admin/Career/CareerList"
import CareerAdd from "./components/Admin/Career/CareerAdd"
import FeedbackList from "./components/Admin/Feedback/FeedbackList"
import OrderManagement from "./components/Admin/Order/OrderManagement"
import BannerForm from "./components/Admin/Banner/BannerAdd"
import CareerEdit from "./components/Admin/Career/CareerEdit"
// import SendMail from "./components/employer/SendMail/SendMail"
import CompanyDetail from "./components/pages/CompanyDetail"
import SearchResumes from "./components/employer/Resumes/SearchResumes"
import DetailResume from "./components/employer/Resumes/DetailResume"
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener('storage', function (event) {
      if (event.key === 'checkout') {
        window.location.href = "/home/services"
        localStorage.removeItem("checkout");
      }
    });
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='otp' element={<OTPAuth />} />

        {/* CV DEMO */}
        <Route path="cv-preview" element={<CvDemo />} />
        
        {/* AUTH EMPLOYEE */}
        <Route path='signup' element={
          <Register />
        } />
        <Route path='login' element={
          <Login />
        } />
        <Route path='forgot-pasword-epe' element={<ForgotPassEpe />} />
        <Route path='reset-pasword-epe' element={<ResetPassEpe />} />
        <Route path='notice' element={<ForgotPasswordNotice />} />

        {/* AUTH EMPLOYER */}
        <Route path='signup-epr' element={
          <RegisterEmployer />
        } />
        <Route path='login-epr' element={
          <LoginEmployer />
        } />
        <Route path='forgot-pasword-epr' element={<ForgotPassEpr />} />
        <Route path='reset-pasword-epr' element={<ResetPassEpr />} />
        <Route path='notice-epr' element={<ForgotPassNotice />} />

        {/* Auth ADMIN */}
        <Route path='login-admin' element={
          <LoginAdmin />
        } />
        {/* EMPLOYEE */}
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomeClient />} />
          <Route path="works" element={<WorkPage />} />
          <Route path="change-cv" element={<ChangeCV />} />
          <Route path="interview" element={<Interview />} />
          {/* <Route path="managejob" element={<ManageJob />} /> */}
          {/* <Route path="jobempolyee" element={<Job />} /> */}
          {/* <Route path="recruitmentdetails" element={<RecruitmentDetails />} /> */}
          <Route path="profile" element={<Profile />} />
          <Route path="company" element={<Company />} />
          <Route path="company/:id" element={<CompanyDetail />} />
          <Route path='posts/:id' element={<PostDetailEp />} />
        </Route>

        {/* EMPLOYER */}
        <Route path='/home' element={<LayoutEmployer />}>
          <Route index element={<Home />} />
          {/* <Route path="sendmail" element={<SendMail />} /> */}
          <Route path='profile-epr' element={<ProfileEpr />} />
          <Route path='acc-epr-manage' element={<AccEprMng />} />
          <Route path='posts' element={<PostList />} />
          <Route path='services' element={<ServiceList />} />
          <Route path='posts/add' element={<PostAdd />} />
          <Route path='posts/:id/edit' element={<PostEdit />} />
          <Route path='posts/:id' element={<PostDetail />} />
          {/* <Route path='candidates' element={<Candidate />} /> */}
          <Route path='packages' element={<PackageList />} />
          <Route path='orders' element={<OrderList />} />
          <Route path='orders/:id/detail' element={<OrderDetail />} />
          <Route path='notice' element={<OrderNotice />} />
          <Route path='cart' element={<Cart />} />
          <Route path='manage-cv' element={<ProfileList />} />
          <Route path='manage-profile/:id' element={<ManageProfileDetail />} />
          <Route path='vnpay-checkout' element={<VNPayCheckout />} />
          <Route path='search-resume' element={<SearchResumes />} />
          <Route path="resumes/:id" element={<DetailResume/>}/>
        </Route>

        {/* ADMIN */}
        <Route path='/admin' element={
          <LayoutAdmin />
        }>
          <Route index element={<HomeAdmin />} />
          <Route path="dashboard" element={<HomeAdmin />} />
          <Route path="users-management/employee" element={<EmployeeManage />} />
          <Route path="users-management/employer" element={<EmployerManage />} />
          <Route path='vouchers' element={<VoucherList />} />
          <Route path='vouchers/add' element={<VoucherAdd />} />
          <Route path='vouchers/:id/edit' element={<VoucherEdit />} />
          <Route path='posts' element={<PostAdmin />} />
          <Route path='careers' element={<CareerList />} />
          <Route path='careers/add' element={<CareerAdd />} />
          <Route path='careers/edit/:id' element={<CareerEdit />} />
          <Route path='feedbacks' element={<FeedbackList />} />
          <Route path='order-management' element={<OrderManagement />} />
          <Route path='banner' element={<BannerForm />} />
        </Route>



        <Route path='/employs' element={<LayoutEmployer />}>
          {/* <Route index element={<HomeEmployer />} /> */}
        </Route>
        <Route path='/jobdones' element={<LayoutClient />}>
          {/* <Route index element={<Jobdone />} /> */}
        </Route>
        <Route path='/personalInfors' element={<LayoutClient />}>
          {/* <Route index element={<PersonalInfor />} />
          <Route path="/personalInfors/:id" element={<PersonalInfor />} /> */}

        </Route>
        <Route path='*' element={<h1>404 | NOT FOUND</h1>} />
        <Route path="/report" element={<Report />}></Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div >
  )
}

export default App
