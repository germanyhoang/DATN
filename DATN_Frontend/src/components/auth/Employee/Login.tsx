import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, NavLink } from 'react-router-dom'
import { useSigninMutation } from '../../../service/auth'
import { useAppDispatch } from '../../../app/hook'
import { loginAuth } from '../../../app/actions/auth'
import { toast } from 'react-toastify'
import myImage from '../../../assets/img/logo.jpg';

import './AuthEpe.css'

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [signin] = useSigninMutation()
    const [type, setType] = useState(false)
    const [loading, setLoading] = useState(false)
    const showPassword = () => {
        setType(!type)
    }

    const signIn = async (user: any) => {
        setLoading(true);
        const login = await signin(user);
        const { data: res }: any = login;

        if (res?.success) {
            if (res.user.isBlock) {
                setLoading(false);
                toast.warning("Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.");
            } else {
                setLoading(false);
                dispatch(loginAuth(res));
                navigate('/');
            }
        } else {
            setLoading(false);
            toast.warning(res?.mes);
        }
    }
    return (
        <>
            <div className="border-0 text-dark relative">
                <div className='bg-gradient-to-r from-[#FF703C] to-[#0053EB] min-h-[30vh] z-[-1000] text-white font-[500] pl-10'>
                    <NavLink to='/'>
                        <img width={150} height={150} src={myImage} alt="" />
                    </NavLink>
                </div>
                <div className="absolute top-[40%] left-[50%] bg-white" style={{
                    transform: 'translate(-50%)'
                }}>
                    <div className="w-[600px] min-h-[70vh] shadow">
                        <div className="p-5">
                            <div className="text-center pb-4">
                                <h1 className="h4 text-gray-900 text-[2.3rem]">
                                    Đăng nhập để tiếp tục
                                </h1>

                            </div>
                            <form onSubmit={handleSubmit(signIn)}>
                                <div className="form-group">
                                    <label className="text-dark fw-bold">Email</label>
                                    <input {...register('email', {
                                        required: true,
                                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                    })}
                                        type="email"
                                        className={errors.email ? "form-control border-1 border-red-500" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                        name='email' />
                                    {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email.</span>}
                                    {errors.email && errors.email.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ.</span>}
                                </div>
                                <div className="form-group">
                                    <label className="text-dark fw-bold">Mật khẩu</label>
                                    <div className='relative flex items-center'>
                                        <input {...register('password', {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 50,
                                            pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                        })}
                                            type={type ? 'text' : "password"}
                                            className={errors.password ? "form-control border-red-500" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='password'
                                            id='password' />
                                        <i className={type ? 'fa fa-eye absolute right-[10px] cursor-pointer' : 'fa fa-eye-slash absolute right-[10px] cursor-pointer'}
                                            onClick={showPassword}></i>
                                    </div>


                                    {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                    {errors.password && errors.password.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                </div>
                                <div className="form-group">
                                    <div className='flex items-center justify-end'>
                                        <div className="">
                                            <NavLink to={'/forgot-pasword-epe'} className="">
                                                Quên mật khẩu?
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>

                                <button className="bg-[#FE7D55] hover:bg-[#FD6333] btn-block flex items-center justify-center py-3 gap-2 rounded text-white">
                                    {
                                        loading ?
                                            <i className="loading-icon fa-solid fa-circle-notch"></i>
                                            : 'Đăng nhập'
                                    }

                                </button>

                            </form>


                            <div className="text-dark my-4 flex gap-2 items-center justify-center">
                                Bạn chưa có tài khoản?
                                <span>
                                    <NavLink to={'/signup'} className='font-[700] text-[#005AFF] hover:no-underline hover:text-[#FD6333]'>
                                        Đăng ký ngay
                                    </NavLink>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login