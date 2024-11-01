// import React, { useEffect, useState } from 'react'
// import { BookOutlined } from '@ant-design/icons'
// import { Button, Form, Input, Select, message } from 'antd';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useCreateServiceMutation } from '../../../service/employer/service';
// import { useAppSelector } from '../../../app/hook';
// import { useGetUserEprByEmailQuery, useUpdateUserEprMutation } from '../../../service/auth_employer';
// import { useAddAdmServiceMutation } from '../../../service/admin/service';

// const ServiceAdd = (): any => {
//     const [form] = Form.useForm();
//     const navigate = useNavigate()
//     const [addService] = useCreateServiceMutation()
//     const { email, isLoggedIn } = useAppSelector((rs) => rs.auth)
//     const { data: user } = useGetUserEprByEmailQuery<any>(email)
//     const [addAdmService] = useAddAdmServiceMutation()
//     const onHandleAdd: any = (service: any) => {
//         try {
//             addService({
//                 ...service,
//                 user_id: user?._id
//             })
//             addAdmService({
//                 emailUser: email,
//                 servicePrice: 1750000,
//                 serviceStatus: true
//             })
//             message.success('Tạo service thành công.')
//             navigate('/home/services')
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     if (!isLoggedIn) {
//         return navigate('/login-epr')
//     }

//     return (
//         <>
//             <div className='mt-4 w-100'>
//                 <h1 className='mb-3 text-center text-3xl font-bold text-[#44454A]'>Tạo gói mới</h1>
//                 <Form onFinish={onHandleAdd} form={form} name="add" layout="vertical">
//                     <div className='max-w-[700px] mx-auto'>
//                         <div className='d-flex align-items-top'>
//                             <div className='w-100 ms-3'>
//                                 <div className='fs-4 fw-'>Tên dịch vụ</div>
//                                 <Form.Item name="name" label="Tên công tên dịch vụ"
//                                     rules={[
//                                         { required: true, message: "Please input your job name." },
//                                     ]}>
//                                     <Input placeholder='VD: Nạp lần đầu' />
//                                 </Form.Item>
//                             </div>
//                         </div>
//                         <div className='d-flex align-items-top'>
//                             <div className='w-100 ms-3'>
//                                 <div className='fs-4'>Giá tiền</div>
//                                 <Form.Item name="price" label="Giá"
//                                     rules={[
//                                         { required: true, message: 'Please input your job description.' }
//                                     ]}>
//                                     <Input.TextArea rows={1} placeholder='Nhập giá' />
//                                 </Form.Item>
//                                 <Form.Item name="day" label="Thời gian"
//                                     rules={[

//                                     ]}>
//                                     <Input.TextArea rows={1} placeholder='Nhập thời gian' />
//                                 </Form.Item>
//                                 <Form.Item name="description" label="Mô tả"
//                                     rules={[

//                                     ]}>
//                                     <Input.TextArea rows={1} placeholder='Nhập mô tả' />
//                                 </Form.Item>
//                             </div>
//                         </div>

//                     </div>
//                     <div className='text-center sticky bottom-0 bg-gray-100 border-t-2 py-3'>
//                         <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white text-[16px] py-2 px-8 rounded' type="submit">
//                             Đăng
//                         </button>
//                         <NavLink to={'/home/services'}>
//                             <button
//                                 className='text-[#838383] hover:text-[#FE7D55] border-1 border-[#686868] hover:border-[#FE7D55] ms-4 py-2 px-8 rounded' type="button">
//                                 Trở về
//                             </button>
//                         </NavLink>
//                     </div>
//                 </Form>
//             </div>
//         </>
//     )
// }

// export default ServiceAdd