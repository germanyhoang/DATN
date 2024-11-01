import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    useActiveEmailMutation,
    useChangePassEprMutation,
    useGetUserEprByEmailQuery,
    useSendEmailVerifiedMutation
} from '../../../service/auth_employer'
import { useAppSelector } from '../../../app/hook'
import Swal from 'sweetalert2'
import { Modal } from 'antd'
import "./ProfileEpr.css";
import React from 'react'

const AccEprMng = (): any => {
    const [loading, setLoading] = useState<boolean>(false)
    const [open, setOpen] = useState(false)
    const [openC, setOpenC] = useState(false)
    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const { data: user } = useGetUserEprByEmailQuery<any>(email)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [changePassEpr] = useChangePassEprMutation()

    const handleChangePass = async ({ oldpass, newpass, confirmpass }: any) => {
        if (newpass != confirmpass) {
            return toast.warning('Mật khẩu không khớp')
        }

        const change: any = await changePassEpr({ email, oldpass, newpass })
        const { data: rs } = change
        if (rs?.success) {
            return Swal.fire('Congratulation', 'Đổi mật khẩu thành công', 'success').then(() => {
                window.location.reload()
            })
        } else {
            return toast.error(rs?.mes)
        }
    }

    const navigate = useNavigate()
    const [verifiedEmail] = useSendEmailVerifiedMutation()
    const sendEmail = async (email: string) => {
        setLoading(true);
        await verifiedEmail({ email })
            .then((result: any) => {
                setLoading(false);
                const { data: rs } = result;
                toast.success(rs?.mes);
            }).catch((err: any) => {
                setLoading(false);
                console.log(err.message);
            });
        setOpen(true)
    }

    const [activeEmail] = useActiveEmailMutation()
    const tokenRef: any = useRef()
    const handleActiveE = async ({current}: any) => {
        const {value: token} = current

        if (!token) {
            return toast.warning('Vui lòng nhập mã xác thực!')
        }

        const active: any = await activeEmail({ email, token })
        const { data: rs } = active
        if (rs?.success) {
            Swal.fire('Thông báo', 'Xác thực thành công', 'success')
        }
    }

    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
            <div className='bg-white min-h-screen flex items-start px-12 py-8 gap-14 text-[#474747]'>
                <aside className='w-[22%]'>
                    <div className='w-full border-1 rounded-[5px]'>
                        <ul className='flex flex-col text-[15px]'>
                            <li className='py-2 px-[20px] border-b-[1px] border-l-[4px] border-l-[#1C88E5] rounded-tl-[5px] font-[550] bg-[#F7FAFF]'>Quản lý tài khoản</li>
                            <ul className='flex flex-col'>
                                <li className='py-2 px-[24px] hover:px-[20px] border-b-[1px] font-[550] bg-[#F7FAFF] hover:bg-white hover:border-l-[4px] hover:border-l-[#1C88E5]'>
                                    Thông tin cá nhân
                                </li>
                                <NavLink to={'/home/profile-epr'}
                                    className='py-1 px-4 hover:bg-[#E5E5E5] font-[400] text-[#333333] hover:text-[#333333]'>
                                    Thông tin chung
                                </NavLink>
                                {/* <li className='py-1 px-4 hover:bg-[#E5E5E5] font-[400]'>Địa điểm làm việc</li> */}
                            </ul>
                        </ul>
                    </div>
                </aside>
                <main className='w-[78%]'>
                    <h2 className='text-[22px] tracking-normal py-1 pb-3 mb-3 border-b-[1px] text-[#333333]'>Quản lý tài khoản</h2>
                    <div>
                        <div className='text-[18px] tracking-normal font-[500]'>Thông tin chung</div>
                        <div className='border-1 shadow-sm rounded py-3 px-4 mt-1 '>
                            <div className='flex flex-col gap-y-2 pb-4 border-b-2'>
                                <div className='flex items-center'>
                                    <label className='w-[200px] font-[550]'>Địa chỉ email</label>
                                    <span className='flex items-center gap-x-2'>
                                        {user?.email}
                                        {
                                            user?.isEmailVerified ?
                                                <span><i className='fas fa-check-circle text-green-500'></i></span>
                                                :
                                                <div>
                                                    {
                                                        loading ? <i className="loading-icon fa-solid fa-circle-notch"></i>
                                                            :
                                                            <button onClick={() => sendEmail(email)} className='font-[100] text-[#005AFF] hover:text-[#FD6333] flex items-center justify-content-center' >
                                                                Xác thực
                                                            </button>
                                                    }
                                                    <Modal
                                                        style={{ top: 147 }}
                                                        open={open}
                                                        onCancel={() => setOpen(false)}
                                                        okButtonProps={{ hidden: true }}
                                                        cancelButtonProps={{ hidden: true }}
                                                        width={700}
                                                    >
                                                        <h3 className='text-xl text-[#333333] border-b-[1px] pb-2 mb-2'>Xác thực Email</h3>
                                                        <div>
                                                            <div className="form-group">
                                                                <label className="text-dark">Mã xác nhận</label>
                                                                <input type="text"
                                                                    ref={tokenRef}
                                                                    className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                                                    name='token' />
                                                            </div>
                                                            <div className='flex justify-end gap-x-3'>
                                                                <button className='bg-[#F4F4F7] hover:bg-[#E9E9F2] py-1 px-2 rounded'
                                                                    type='button'
                                                                    onClick={() => setOpen(false)} >
                                                                    Hủy
                                                                </button>
                                                                <button 
                                                                    onClick={() => handleActiveE(tokenRef)}
                                                                    type='button'
                                                                    className='bg-[#FE7D55] hover:bg-[#FD6333] py-1 px-2 text-white rounded'
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Modal>
                                                </div>

                                        }
                                    </span>
                                </div>
                                <div>
                                    <label className='w-[200px] font-[550]'>Họ và tên</label>
                                    <span>{user?.name}</span>
                                </div>
                                <div>
                                    <label className='w-[200px] font-[550]'>Số điện thoại</label>
                                    <span>{user?.phone}</span>
                                </div>
                            </div>
                            <div className='pt-2'>
                                <button onClick={() => setOpenC(!openC)} className='text-[#1C88E5] hover:text-[#FD6333]'>Thay đổi mật khẩu</button>
                                <form 
                                    onSubmit={handleSubmit(handleChangePass)} 
                                    className='w-[500px] mt-2'
                                    >
                                        <div className='flex flex-col gap-x-10 mb-2'>
                                            <label className='text-[15px] font-[550]'>Mật khẩu hiện tại</label>
                                            <input type="password"
                                                {...register('oldpass', {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 50,
                                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                                })}
                                                placeholder='Nhập mật khẩu hiện tại'
                                                name='oldpass'
                                                className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                                            {errors.oldpass && errors.oldpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                            {errors.oldpass && errors.oldpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                        </div>
                                        <div className='flex flex-col gap-x-10 mb-2'>
                                            <label className='text-[15px] font-[550]'>Mật khẩu mới</label>
                                            <input type="password"
                                                {...register('newpass', {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 50,
                                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                                })}
                                                placeholder='Nhập mật khẩu mới'
                                                name='newpass'
                                                className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                                            {errors.newpass && errors.newpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu mới</span>}
                                            {errors.newpass && errors.newpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                        </div>
                                        <div className='flex flex-col gap-x-10 mb-2'>
                                            <label className='text-[15px] font-[550]'>Nhập lại mật khẩu mới</label>
                                            <input type="password"
                                                {...register('confirmpass', {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 50,
                                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                                })}
                                                placeholder='Nhập lại mật khẩu mới'
                                                name='confirmpass'
                                                className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                                            {errors.confirmpass && errors.confirmpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng xác nhận Mật khẩu mới</span>}
                                            {errors.confirmpass && errors.confirmpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                        </div>
                                        
                                        <div className='flex justify-end gap-x-3'>
                                            {/* <button onClick={() => setOpenC(false)} className='hover:border-[#FD6333] hover:text-[#FD6333] border-1 border-[#979797] text-[#979797] py-1 px-8 text-[16px] rounded'>Hủy</button> */}
                                            <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white py-1 px-6 text-[16px] rounded'>
                                                Thay đổi
                                            </button>
                                        </div>
                                    </form>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </>
    )
}

export default AccEprMng