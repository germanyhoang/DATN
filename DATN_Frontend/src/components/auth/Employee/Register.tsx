import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useSignupMutation } from '../../../service/auth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom';
import myImage from '../../../assets/img/logo.jpg';
import './AuthEpe.css'


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<any>()
    const navigate = useNavigate()
    const [signup] = useSignupMutation()
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(false)
    const showPassword = () => {
        setType(!type)
    }

    const signUp: SubmitHandler<any> = async (user: any) => {
        setLoading(true)
        const register: any = await signup({ ...user })
        const { data: res } = register
        if (res?.success) {
            setLoading(false)
            Swal.fire('Congratulations', 'Đăng ký thành công!', 'success').then(async () => {
                navigate('/login')
            })
        } else {
            setLoading(false)
            toast.warning(res?.mes)
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
                    transform: 'translateX(-50%)'
                }}>
                    {/* Nested Row within Card Body */}
                    <div className="">
                        <div className="w-[600px] mx-auto min-h-[70vh] shadow">
                            <div className="p-5">
                                <div className="text-center pb-4">
                                    <h1 className="h4 text-gray-900 text-[2.3rem]">
                                        Đăng ký thành viên!
                                    </h1>

                                </div>
                                <form onSubmit={handleSubmit(signUp)}>
                                    <div className="form-group">
                                        <label className="text-dark fw-bold">Tên</label>
                                        <input {...register('name', {
                                            required: true,
                                            pattern: /^(?!.*\d)(?!.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/
                                        })}
                                            type="text"
                                            className={errors.name ? "form-control border-red-500 focus:ring-red-500 border-1 focus:shadow-none" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='name' />
                                        {errors.name && errors.name.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên.</span>}
                                        {errors.name && errors.name.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Tên không hợp lệ.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-dark fw-bold">Số điện thoại</label>
                                        {/* <PhoneInput country={"vn"} /> */}
                                        <input {...register('phone', {
                                            required: true,
                                            minLength: 10,
                                            pattern: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
                                        })}
                                            type="text"
                                            className={errors.phone ? "form-control border-red-500 border-1" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='phone' />
                                        {errors.phone && errors.phone.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Số điện thoại.</span>}
                                        {errors.phone && errors.phone.type == 'minLength' && <span className='text-red-500 fw-bold mt-1'> Số điện thoại phải có ít nhất 10 ký tự.</span>}
                                        {errors.phone && errors.phone.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Số điện thoại không hợp lệ.</span>}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-dark fw-bold">Email</label>
                                        <input {...register('email',
                                            {
                                                required: true,
                                                pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            })}
                                            type="email"
                                            placeholder='Sử dụng email có thật để xác thực.'
                                            className={errors.email ? "form-control border-red-500 border-1" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                            name='email' />
                                        {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email</span>}
                                        {errors.email && errors.email.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ</span>}
                                        {/* {error != null && !errors.email ? <span className='text-red-500 fw-bold mt-1'>{error}</span> : ''} */}
                                    </div>
                                    <div className="form-group">
                                        <label className="text-dark fw-bold">Mật khẩu</label>
                                        <div className='relative flex items-center'>
                                            <input {...register('password',
                                                {
                                                    required: true,
                                                    minLength: 6,
                                                    maxLength: 50,
                                                    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                                })}
                                                type={type ? 'text' : "password"}
                                                placeholder='Từ 6 đến 50 ký tự, 1 chữ hoa, 1 chữ thường.'
                                                className={errors.password ? "form-control border-red-500 border-1" : "form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"}
                                                name="password" />
                                            <i className={type ? 'fa fa-eye absolute right-[10px] cursor-pointer' : 'fa fa-eye-slash absolute right-[10px] cursor-pointer'}
                                                onClick={showPassword}></i>
                                        </div>
                                        {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                        {errors.password && errors.password.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}

                                    </div>

                                    <div className="my-[30px]">
                                        <p className="text-dark">Bằng cách nhấn vào nút "Đăng ký", tôi đồng ý với <span className="text-primary">Điều khoản dịch
                                            vụ</span> và <span className="text-primary">Chính sách bảo mật </span> của chúng tôi.
                                        </p>
                                    </div>
                                    <div>
                                        <button onClick={signUp} className="bg-[#FE7D55] hover:bg-[#FD6333] btn-block flex items-center justify-center py-3 gap-2 rounded text-white">
                                            {
                                                loading ?
                                                    <i className="loading-icon fa-solid fa-circle-notch"></i>
                                                    : 'Đăng ký'
                                            }

                                        </button>
                                    </div>
                                </form>

                                <div className="text-dark my-4 flex items-center gap-2 justify-center">
                                    Bạn đã có tài khoản?
                                    <span>
                                        <NavLink to={'/login'} className='font-[700] text-[#005AFF] hover:no-underline hover:text-[#FD6333]'>
                                            Đăng nhập
                                        </NavLink>
                                    </span>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-lg-7 d-none d-lg-block bg-gray-200" /> */}
                    </div>
                </div>
            </div >
        </>
    )
}

export default Register