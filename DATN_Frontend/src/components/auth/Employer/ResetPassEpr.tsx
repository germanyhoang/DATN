import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useResetEPasswordMutation } from '../../../service/auth_employer'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import myImage from "./anh.jpg"

const ResetPassEpr = () => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const [resetEPassword] = useResetEPasswordMutation()
    const resetPass = async ({ password, repass }: any) => {
        if (password != repass) {
            return toast.warning('Mật khẩu không khớp!')
        }

        const reset: any = await resetEPassword({ token, password })
        const { data: rs } = reset
        if (rs?.success) {
            return Swal.fire('Congratulations', 'Đổi mật khẩu thành công!', 'success').then(() => {
                navigate('/login-epr')
            })
        } else {
            return toast.error(rs?.mes)
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
                                <h3 className='text-3xl font-[600]'>Thay đổi mật khẩu</h3>
                            </div>
                            <form onSubmit={handleSubmit(resetPass)} className="flex flex-col">
                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu mới</label>
                                    <input type="password"
                                        {...register('password',
                                            {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 50,
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                            }
                                        )}
                                        placeholder=''
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='password' />
                                    <p>Từ 6 đến 50 ký tự, 1 chữ hoa, 1 chữ thường.</p>
                                    {errors.password && errors.password.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu</span>}
                                    {errors.password && errors.password.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
                                </div>

                                <div className="form-group">
                                    <label className="text-dark">Mật khẩu xác nhận</label>
                                    <input type="password"
                                        {...register('repass',
                                            {
                                                required: true,
                                                minLength: 6,
                                                maxLength: 50,
                                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,50}$/
                                            }
                                        )}
                                        className="form-control border-1 border-[#c7c7c7] focus:shadow-none focus:border-[#005AFF]"
                                        name='repass' />
                                    {errors.repass && errors.repass.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mật khẩu xác nhận</span>}
                                    {errors.repass && errors.repass.type != 'required' && <span className='text-red-500 fw-bold mt-1'>Mật khẩu không hợp lệ.</span>}
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

export default ResetPassEpr