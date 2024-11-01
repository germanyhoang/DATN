// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import {
//     HomeOutlined,
//     UnorderedListOutlined,
//     SnippetsOutlined,
//     GiftOutlined,
//     SettingOutlined,
//     MailOutlined,
//     HistoryOutlined,
//     ShoppingCartOutlined,
//     BellOutlined,
//     ContainerOutlined,
//     InteractionOutlined,
//     NotificationOutlined,
//     CommentOutlined
// } from '@ant-design/icons'

// type Props = {}

// const SidebarEmployer = (props: Props) => {
//     return (
//         <>
//             {/* Sidebar */}
//             <div className="col-6 col-xl-3">
//                 <ul className="nav flex-column" id="navbar">
//                     <li style={{ borderBottom: '1px solid #f3f3f3' }}>
//                         <a><img src="/src/assets/img/singin.jpg" style={{ margin: '0px 15px 0px 0' }} width="40px" alt="" />
//                             <b>Hoàng Trung Đức</b>
//                         </a>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/home'} className='d-flex align-items-center'>
//                             <HomeOutlined className='text-success' />
//                             <span className='ms-3'>Bảng Tin</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <CommentOutlined className='text-success' />
//                             <span className='ms-3'>Toppy AI - Đề xuất</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <NotificationOutlined className='text-success' />
//                             <span className='ms-3'>Chiến dịch tuyển dụng</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/home/posts'} className='d-flex align-items-center'>
//                             <UnorderedListOutlined className='text-success' />
//                             <span className='ms-3'>Quản lý bài viết</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/homne/manage-profile'} className='d-flex align-items-center'>
//                             <SnippetsOutlined className='text-success' />
//                             <span className='ms-3'>Quản lý hồ sơ</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <ContainerOutlined className='text-success' />
//                             <span className='ms-3'>Báo cáo tuyển dụng</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <InteractionOutlined className='text-success' />
//                             <span className='ms-3'>Dịch vụ của tôi</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <GiftOutlined className='text-success' />
//                             <span className='ms-3'>Mã ưu đãi</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <ShoppingCartOutlined className='text-success' />
//                             <span className='ms-3'>Theo dõi đơn hàng</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <HistoryOutlined className='text-success' />
//                             <span className='ms-3'>Lịch sử hoạt động</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <SettingOutlined className='text-success' />
//                             <span className='ms-3'>Cài đặt tài khoản</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <BellOutlined className='text-success' />
//                             <span className='ms-3'>Thông báo hệ thống</span>
//                         </NavLink>
//                     </li>
//                     <li className="nav-item">
//                         <NavLink to={'/'} className='d-flex align-items-center'>
//                             <MailOutlined className='text-success' />
//                             <span className='ms-3'>Hộp thư hỗ trợ</span>
//                         </NavLink>
//                     </li>
//                 </ul>
//             </div>
//         </>
//     )
// }

// export default SidebarEmployer