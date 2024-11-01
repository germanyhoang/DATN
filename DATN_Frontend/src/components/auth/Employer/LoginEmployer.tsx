import { useState } from 'react'
import {
    signInWithEmailAndPassword
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useLoginWithEmployerMutation } from '../../../service/auth_employer'
import { useAppDispatch } from '../../../app/hook'
import { toast } from 'react-toastify'
import { loginAuthEpr } from '../../../app/actions/authEpr'
import React from 'react'
import myImage from "./anh.jpg"
const LoginEmployer = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>()
    const navigate = useNavigate()
    const [signin] = useLoginWithEmployerMutation()
    const [type, setType] = useState(false)
    const dispatch: any = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const showPassword = () => {
        setType(!type)
    }

    const signIn = async (user: any) => {
        setLoading(true);
        const login: any = await signin(user);
        const { data: res } = login;

        if (res?.success) {
            if (res.user.isBlock) {
                setLoading(false);
                toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
            } else {
                setLoading(false);
                dispatch(loginAuthEpr(res));
                navigate('/home');
            }
        } else {
            setLoading(false);
            toast.warning(res.mes);
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
                        <NavLink to={"/"} className="custom-button">
                                <span>Quay lại</span>
                            </NavLink>
                            <h3 className='text-3xl font-[600] py-12'>Đăng nhập</h3>
                            <form onSubmit={handleSubmit(signIn)} className="flex flex-col">
                                <div className='flex flex-col mb-2'>
                                    <label className='font-[600]'>Tài khoản đăng nhập <span className='text-red-500'>*</span></label>
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
                                <div className='flex flex-col'>
                                    <label className='font-[600]'>Mật khẩu <span className='text-red-500'>*</span></label>
                                    <div className='relative flex items-center'>
                                        <input {...register('password', { required: true, minLength: 6 })}
                                            type={type ? 'text' : "password"}
                                            className={errors.password ? "form-control border-red-500 focus:border-red-500 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='password'
                                            id='password' />
                                        <i className={type ? 'fa fa-eye absolute right-[10px] cursor-pointer' : 'fa fa-eye-slash absolute right-[10px] cursor-pointer'}
                                            onClick={showPassword}></i>
                                    </div>
                                    {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                    {errors.password && errors.password.type == 'minLength' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu chứa từ 6 ký tự trở lên.</span>}

                                </div>

                                <div className='flex items-center justify-between my-5'>
                                    <NavLink to={'/forgot-pasword-epr'} className='text-[#005AFF] hover:no-underline hover:text-[#FD6333]'>
                                        Quên mật khẩu
                                    </NavLink>

                                    <button
                                        onClick={signIn}
                                        className='bg-[#FE7D55] hover:bg-[#FD6333] py-2 px-3 rounded text-white font-[500]'
                                    >
                                        Đăng nhập
                                    </button>
                                </div>

                            </form>
                        </div>
                        <div className='w-100 flex items-center gap-2 bg-[#EDEDED] p-4'>
                            <p className='m-0'>Bạn chưa có tài khoản?</p>
                            <NavLink to={'/signup-epr'} className='font-[300] text-[#005AFF] hover:no-underline hover:text-[#FD6333]'>
                                Đăng ký
                            </NavLink>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}

export default LoginEmployer