import React from 'react'
import { useForm } from 'react-hook-form'
import { useSendEmailEResetPassMutation } from '../../../service/auth_employer'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import myImage from "./anh.jpg"

const ForgotPassEpr = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [sendEmailEResetPass] = useSendEmailEResetPassMutation()
    const navigate = useNavigate()
    const sendEmail = async (user: any) => {
        const send: any = await sendEmailEResetPass(user)
        const { data: rs } = send
        if (rs?.success) {
            navigate('/notice-epr')
        } else {
            toast.warning(rs?.mes)
        }
    }
    return (
        <>
            <section>
                <div className='w-full flex'>
                    <span className=''>
                        <img src={myImage} alt="" style={{ height: "100vh"  }} />
                    </span>
                    <main className='w-[65%] flex flex-col justify-between mt-[100px]'>
                        <div className='w-[60%] mx-auto text-[#474747]'>
                            <div className='py-12'>
                                <h3 className='text-3xl font-[600]'>Quên mật khẩu</h3>
                                <p>Hãy tạo mật khẩu mới và tiếp tục sử dụng</p>
                            </div>
                            <form onSubmit={handleSubmit(sendEmail)} className="flex flex-col">
                                <div className='flex flex-col mb-2'>
                                    <label className='font-[600]'>Địa chỉ email <span className='text-red-500'>*</span></label>
                                    <input {...register('email',
                                        {
                                            required: true,
                                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        })}
                                        type="email"
                                        className={errors.email ? "form-control border-1 border-red-500 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                        name='email' />
                                    {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email.</span>}
                                    {errors.email && errors.email.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ.</span>}
                                </div>

                                <div className='flex items-center justify-end my-5'>
                                    <button className='bg-[#FE7D55] hover:bg-[#FD6333] py-[9px] px-[19px] rounded text-white font-[500]'>
                                        Xác nhận
                                    </button>
                                </div>

                            </form>
                        </div>
                        <div className='w-100 flex items-center gap-2 bg-[#EDEDED] p-[27px]'>
                            <p><span className='font-[700] text-[#333333]'>Bạn cần hỗ trợ?</span> Điện thoại: (84 28) 3925 8456 hoặc Email: jobsupport@jobforyou.com</p>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default ForgotPassEpr