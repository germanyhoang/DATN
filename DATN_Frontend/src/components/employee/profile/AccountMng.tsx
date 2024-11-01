import { useState, useRef } from 'react'
import { Modal } from 'antd'
import { useAppSelector } from '../../../app/hook'
import { useForm } from 'react-hook-form'
import { 
    useChangePasswordMutation, 
    useSendEmailVerifiedMutation, 
    useActiveEmailMutation, 
    useGetUserByEmailQuery 
} from '../../../service/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import React from 'react'

const AccountMng = () => {
    const { email } = useAppSelector((rs: any) => rs.auth)
    const { data: user } = useGetUserByEmailQuery(email)
    const [loading, setLoading] = useState<boolean>(false)
    const [verifiedEmail] = useSendEmailVerifiedMutation()
    const sendEmail = async (email :any) => {
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
        setOpenVerifyEmail(true)
    }
    const [activeEmail] = useActiveEmailMutation()
    const tokenRef: any = useRef()
    const handleActiveE: any = async ({current}: any) => {
        const {value: token} = current

        if (!token) {
            return toast.warning('Vui lòng nhập mã xác thực!')
        }

        const active: any = await activeEmail({ email, token })
        const { data: rs } = active
        if (rs?.success) {
            return Swal.fire('Chúc mừng', 'Xác thực thành công', 'success')
        }
    }
    const [openVerifyEmail, setOpenVerifyEmail] = useState(false);
    const [openChangePass, setOpenChangePass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [changePassword] = useChangePasswordMutation()
    const handleChangePass = async ({ oldpass, newpass, confirmpass }: any) => {
        if (newpass != confirmpass) {
            return toast.warning('Mật khẩu không khớp')
        }

        const change = await changePassword({ email, oldpass, newpass })
        const { data: rs } = change
        if (rs?.success) {
            return Swal.fire('Congratulation', 'Đổi mật khẩu thành công', 'success').then(() => {
                window.location.reload()
            })
        } else {
            return toast.error(rs?.mes)
        }
    }
    return (
        <>
            <section className='border-1 rounded bg-white'>
                <h4 className='text-[#333333] text-[16px] py-3 px-4 font-[700]'>Quản lý tài khoản</h4>
            </section>
            <section className='border-1 rounded bg-white py-4 mt-[8px]'>
                <div className='px-4 flex-col justify-around'>
                    <div className='mb-4'>
                        <div className='text-[#333333] text-[15px] font-[700]'>Email đăng nhập & mật khẩu</div>
                        <div className='flex items-center'>
                            Email truy cập hiện tại: 
                            <div className='w-[62%] font-[700] flex items-center gap-1 ml-[6px]'>
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
                                                open={openVerifyEmail}
                                                onCancel={() => setOpenVerifyEmail(false)}
                                                okButtonProps={{ hidden: true }}
                                                cancelButtonProps={{ hidden: true }}
                                                width={700}
                                            >
                                                <h3 className='text-xl text-[#333333] border-b-[1px] pb-2 mb-2'>Xác thực Email</h3>
                                                <div>
                                                    <div className="div-group">
                                                        <label className="text-dark">Mã xác nhận</label>
                                                        <input type="text"
                                                            ref={tokenRef}
                                                            className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                                            name='token' />
                                                    </div>
                                                    <div className='flex justify-end gap-x-3 mt-[16px]'>
                                                        <button className='bg-[#F4F4F7] hover:bg-[#E9E9F2] py-1 px-2 rounded'
                                                            type='button'
                                                            onClick={() => setOpenVerifyEmail(false)} >
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

                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <button className='text-[#005AFF] hover:text-[#FD6333]'
                            onClick={() => setOpenChangePass(true)} >
                            Thay đổi mật khẩu
                        </button>
                        <Modal
                            style={{ top: 147 }}
                            open={openChangePass}
                            onCancel={() => setOpenChangePass(false)}
                            okButtonProps={{ hidden: true }}
                            cancelButtonProps={{ hidden: true }}
                            width={700}
                        >
                            <h3 className='text-xl text-[#333333] border-b-[1px] pb-2 mb-2'>Thay đổi mật khẩu</h3>
                            <form onSubmit={handleSubmit(handleChangePass)}>
                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu hiện tại</label>
                                    <input type="password"
                                        {...register('oldpass', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 50,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                        })}
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='oldpass' />
                                    {errors.oldpass && errors.oldpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                    {errors.oldpass && errors.oldpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                </div>

                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu mới</label>
                                    <input type="password"
                                        {...register('newpass', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 50,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                        })}
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='newpass' />
                                    {errors.newpass && errors.newpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu mới</span>}
                                    {errors.newpass && errors.newpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu mới không hợp lệ.</span>}
                                </div>

                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu xác nhận</label>
                                    <input type="password"
                                        {...register('confirmpass', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 50,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                        })}
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='confirmpass' />
                                    {errors.confirmpass && errors.confirmpass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu xác nhận</span>}
                                    {errors.confirmpass && errors.confirmpass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu xác nhận không hợp lệ.</span>}
                                </div>
                                <div className='flex justify-end gap-x-3'>
                                    <button className='bg-[#F4F4F7] hover:bg-[#E9E9F2] py-1 px-2 rounded'
                                        type='button'
                                        onClick={() => setOpenChangePass(false)} >
                                        Hủy
                                    </button>
                                    <button className='bg-[#FE7D55] hover:bg-[#FD6333] py-1 px-2 text-white rounded'
                                    >
                                        Thay đổi
                                    </button>
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
            </section>
            <section>
                
            </section>
        </>
    )
}

export default AccountMng