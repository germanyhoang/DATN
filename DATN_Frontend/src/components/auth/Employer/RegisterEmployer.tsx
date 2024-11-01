import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { NavLink, useNavigate } from 'react-router-dom';
import { useRegisterWithEmployerMutation } from '../../../service/auth_employer';
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';
import myImage from './anh.jpg';
import React from 'react';
import './RegisterEmployer.css'
const RegisterEmployer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>()
    const navigate = useNavigate()
    const [signup] = useRegisterWithEmployerMutation()
    const [type, setType] = useState(false)
    const showPassword = () => {
        setType(!type)
    }

    const signUp: SubmitHandler<any> = async (user: any) => {
        const register: any = await signup({
            ...user,
            isEmailVerified: false,
            isPhoneVerified: false,
            level_auth: 1
        })
        const { data: rs } = register
        if (rs?.success) {
            Swal.fire('Congratulations', 'Đăng ký thành công!', 'success').then(async () => {
                navigate('/login-epr')
            })

        } else {
            toast.warning(rs?.mes)
        }

    }
    return (
        <>
            <section>
                <div className='w-full flex'>      
                        <span className=''>
                            <img src={myImage} alt=""  style={{ height: "100vh"  }} />
                        </span>
                    <main className='w-[65%] flex flex-col justify-between mt-[20px]'>
                        <div className='w-[60%] mx-auto text-[#474747]'>
                            <NavLink to={"/"} className="custom-button">
                                <span>Quay lại</span>
                            </NavLink>
                            <h3 className='text-3xl font-[600] mt-20'>Đăng ký</h3>
                            <form onSubmit={handleSubmit(signUp)} className="flex flex-col">
                                <div className='flex flex-col mb-2'>
                                    <label className="text-dark fw-bold">Tên <span className='text-red-500'>*</span></label>
                                    <input {...register('name', {
                                        required: true,
                                        pattern: /^(?!.*\d)(?!.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/
                                    })}
                                        type="text"
                                        className={errors.name ? "form-control border-red-500 border-1 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                        name='name' />
                                    {errors.name && errors.name.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên.</span>}
                                    {errors.name && errors.name.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Tên không hợp lệ.</span>}
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-[600]'>Số điện thoại <span className='text-red-500'>*</span></label>
                                    <input {...register('phone', { required: true })}
                                        type="text"
                                        className={errors.phone ? "form-control border-1 border-red-500 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                        name='phone' />
                                    {errors.phone && errors.phone.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Số điện thoại.</span>}
                                </div>
                                <div className='flex flex-col mb-2'>
                                    <label className='font-[600]'>Địa chỉ email <span className='text-red-500'>*</span></label>
                                    <input {...register('email', {
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                                        type="email"
                                        className={errors.email ? "form-control border-1 border-red-500 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                        name='email' />
                                    {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email.</span>}
                                    {errors.email && errors.email.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ.</span>}
                                </div>
                                <div className='flex flex-col'>
                                    <label className='font-[600]'>Mật khẩu <span className='text-red-500'>*</span></label>
                                    <div className='relative flex items-center'>
                                        <input {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 50,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
                                        })}
                                            type={type ? 'text' : "password"}
                                            className={errors.password ? "form-control border-red-500 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='password'
                                            id='password' />
                                        <i className={type ? 'fa fa-eye absolute right-[10px] cursor-pointer' : 'fa fa-eye-slash absolute right-[10px] cursor-pointer'}
                                            onClick={showPassword}></i>
                                    </div>
                                    {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu.</span>}
                                    {errors.password && errors.password.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}

                                </div>

                                <div className='flex items-center justify-end my-5'>
                                    <button
                                        onClick={signUp}
                                        className='bg-[#FE7D55] hover:bg-[#FD6333] py-2 px-3 rounded text-white font-[500]'
                                    >
                                        Đăng ký
                                    </button>
                                </div>

                            </form>
                        </div>
                        <div className='w-100 flex items-center gap-2 bg-[#EDEDED] p-4'>
                            <p className='m-0'>Bạn đã có tài khoản?</p>
                            <NavLink to={'/login-epr'} className='font-[300] text-[#005AFF] hover:no-underline hover:text-[#FD6333]'>
                                Đăng nhập
                            </NavLink>
                        </div>
                    </main>
                </div>
            </section>

        </>
    )
}

export default RegisterEmployer