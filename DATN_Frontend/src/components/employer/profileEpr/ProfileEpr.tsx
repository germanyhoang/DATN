import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useState, useRef } from 'react'
import { useAppSelector } from '../../../app/hook'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  useGetUserEprByEmailQuery,
  useUpdateUserEprMutation
} from '../../../service/auth_employer'
import IUserNTD from '../../../interface/employer/user_epr'
import { toast } from 'react-toastify'
import { useUploadImage } from '../../../utils/hooks/Upload'

const ProfileEpr = (): any => {
  const { email, isLoggedIn } = useAppSelector((res: any) => res.authEmpr)
  const { data: userEpr } = useGetUserEprByEmailQuery<any>(email)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IUserNTD>()
  const [updateUser] = useUpdateUserEprMutation()
  const navigate = useNavigate()
  const [imgUrl, setImgUrl] = useState<any>()
  const [bannerUrl, setBannerUrl] = useState<any>()
  const [logoFile, setLogoFile] = useState<any>()
  const [bannerFile, setBannerFile] = useState<any>()
  const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

  useEffect(() => {
    reset(userEpr)
  }, [userEpr])

  useEffect(() => {
    return () => {
      imgUrl && URL.revokeObjectURL(imgUrl.preview)
      bannerUrl && URL.revokeObjectURL(bannerUrl.preview)
    }
  }, [imgUrl || bannerUrl])

  const handleChangeInputFile = ({ logo, banner }: any) => {
    const formData = new FormData()
    formData.append('upload_preset', 'dmjlzwse')
    formData.append('cloud_name', 'dywccbjry')

    const logoUpload = logo?.target.files[0]
    const bannerUpload = banner?.target.files[0]

    //Check image size
    if (logoUpload?.size > maxSizeInBytes || bannerUpload?.size > maxSizeInBytes) {
      return toast.warn('Kích thước quá lớn.')
    }

    if (!banner) {
      logoUpload.preview = URL.createObjectURL(logoUpload)
      formData.append('file', logoUpload)
      setImgUrl(logoUpload)
      setLogoFile(formData)
    } else {

      bannerUpload.preview = URL.createObjectURL(bannerUpload)
      formData.append('file', bannerUpload)
      setBannerUrl(bannerUpload)
      setBannerFile(formData)
    }


  }

  const handleUpdate: SubmitHandler<IUserNTD> = async (userEprForm: any) => {
    let imgPath
    let bannerPath

    if (!logoFile) {
      imgPath = userEpr?.image
    }

    if (!bannerFile) {
      bannerPath = userEpr?.company_banner
    }

    const image = await useUploadImage(logoFile)
    const banner = await useUploadImage(bannerFile)
    imgPath = image.url
    bannerPath = banner.url

    await updateUser({
      ...userEprForm,
      image: imgPath,
      company_banner: bannerPath
    }).then((res: any) => {{
      const {data} = res
      if (data?.success) {
        toast.success('Cập nhật thành công')
      }
    }})
  }

  if (!isLoggedIn) {
    return navigate('/login-epr')
  }

  return (
    <>
      {isLoggedIn ? <div className='bg-white min-h-screen flex items-start px-12 py-8 gap-14 text-[#474747]'>
        <aside className='w-[22%]'>
          <div className='w-full border-1 rounded-[5px]'>
            <ul className='flex flex-col text-[15px]'>
              <NavLink to={'/home/acc-epr-manage'}
                className='py-2 px-[24px] hover:px-[20px] border-b-[1px] font-[550] bg-[#F7FAFF] hover:bg-white text-[#333333] hover:text-[#333333] hover:border-l-[4px] hover:border-l-[#1C88E5] hover:rounded-tl-[5px]'>
                Quản lý tài khoản
              </NavLink>
              {/*  hover:border-b-0 hover:border-l-[4px] hover:border-[#1C88E5] hover:rounded-t-[5px] */}
              <ul className='flex flex-col'>
                <li className='py-2 px-[24px] hover:px-[20px] border-b-[1px] font-[550] bg-[#F7FAFF] hover:bg-white hover:border-l-[4px] hover:border-l-[#1C88E5]'>Thông tin công ty</li>
                <li className='py-1 px-4 bg-[#E5E5E5] font-[400]'>Thông tin chung</li>
                {/* <li className='py-1 px-4 hover:bg-[#E5E5E5] font-[400]'>Địa điểm làm việc</li> */}
              </ul>
            </ul>
          </div>
        </aside>
        <main className='w-[78%]'>
          <h2 className='text-[22px] tracking-normal py-1 pb-3 mb-3 border-b-[1px]'>Thông tin NTD</h2>
          <div>
            <form onSubmit={handleSubmit(handleUpdate)}>

              <div className='flex flex-col gap-x-10 w-full mb-2'>
                <label className='text-[15px] font-[550]'>Tên NTD<span className='text-[#ca5b54]'>*</span> </label>
                <input type="text"
                  {...register("name", {
                    required: true,
                    pattern: /^(?!.*\d)(?!.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/
                  })}
                  name='name'
                  className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                {errors.name && errors.name.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên.</span>}
                {errors.name && errors.name.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Tên không hợp lệ.</span>}
              </div>

              <div className='flex items-center gap-x-10 w-full mb-2'>
                <div className='flex flex-col w-[50%]'>
                  <label className='text-[15px] font-[550]'> Email<span className='text-[#ca5b54]'>*</span> </label>
                  <input type="email"
                    {...register("email", {
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}
                    name='email'
                    className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                  {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email</span>}
                  {errors.email && errors.email.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ</span>}
                </div>
                <div className='flex flex-col w-[50%]'>
                  <label className='text-[15px] font-[550]'> Điện thoại<span className='text-[#ca5b54]'>*</span> </label>
                  <input type="text"
                    {...register("phone", {
                      required: true,
                      minLength: 10,
                      pattern: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
                    })}
                    name='phone'
                    className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
                  {errors.phone && errors.phone.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Số điện thoại.</span>}
                  {errors.phone && errors.phone.type == 'minLength' && <span className='text-red-500 fw-bold mt-1'> Số điện thoại phải có ít nhất 10 ký tự.</span>}
                  {errors.phone && errors.phone.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Số điện thoại không hợp lệ.</span>}
                </div>
              </div>
              <div className='flex items-center gap-x-10 w-full mb-2'>
                <div className='flex flex-col w-[50%]'>
                  <label className='text-[15px] font-[550]'> Tên công ty<span className='text-[#ca5b54]'>*</span> </label>
                  <input type="text"
                    {...register("company_name", {
                      required: true
                    })}
                    name='company_name'
                    className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' 
                  />
                  {errors.company_name && errors.company_name.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên công ty.</span>}
                </div>
                <div className='flex flex-col w-[50%]'>
                  <label className='text-[15px] font-[550]'> Địa chỉ công ty </label>
                  <input type="text"
                    {...register("address")}
                    name='address'
                    className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' 
                  />
                </div>
              </div>
              <div className='flex flex-col gap-x-10 w-full mb-2'>
                <label className='text-[15px] font-[550]'>Lĩnh vực<span className='text-[#ca5b54]'>*</span> </label>
                <select 
                  {...register("company_field", {
                    required: true,
                  })} 
                  name='company_field'
                  defaultValue="" 
                  className='border-1 border-[#C9C9C9] rounded py-2 px-1 text-[14px]'
                >
                  <option value="" disabled hidden>Chọn lĩnh vực</option>
                  <option className='py-2' value="Vận tải và giao nhận">Vận tải và giao nhận</option>
                  <option className='py-2' value="Giáo dục / Đào tạo">Giáo dục / Đào tạo</option>
                  <option className='py-2' value="Năng lượng xanh / tái tạo">Năng lượng xanh / tái tạo</option>
                  <option className='py-2' value="Công nghệ và Fintech">Công nghệ và Fintech</option>
                  <option className='py-2' value="Y tế và dược phẩm">Y tế và dược phẩm</option>
                  <option className='py-2' value="Dịch vụ tài chính">Dịch vụ tài chính</option>
                  <option className='py-2' value="Thực phẩm và đồ uống">Thực phẩm và đồ uống</option>
                  <option className='py-2' value="Bán lẻ">Bán lẻ</option>
                  <option className='py-2' value="Xây dựng và vật liệu xây dựng">Xây dựng và vật liệu xây dựng</option>
                  <option className='py-2' value="Nông nghiệp">Nông nghiệp</option>
                  <option className='py-2' value="Khách sạn và giải trí">Khách sạn và giải trí</option>
                  <option className='py-2' value="Bất động sản">Bất động sản</option>
                  <option className='py-2' value="Dầu khí và tài nguyên thiên nhiên">Dầu khí và tài nguyên thiên nhiên</option>
                  <option className='py-2' value="Khác">Khác</option>
                </select>
                {errors.company_field && errors.company_field.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng chọn Lĩnh vực.</span>}
              </div>
              <div className='flex flex-col gap-x-10 w-full mb-2'>
                <label className='text-[15px] font-[550]'>Giới thiệu về NTD </label>
                <textarea
                  {...register("desc_epr")}
                  name='desc_epr'
                  rows={7}
                  className='border-1 border-[#C9C9C9] rounded py-1 px-2 focus:outline-none focus:border-blue-500 focus:bg-[#F7FAFF] hover:border-blue-500 hover:bg-[#F7FAFF]' />
              </div>

              <div className="mb-3">
                <label className="company-label">Logo công ty</label>
                <div className='company-wrapper'>
                  {
                    !imgUrl && userEpr?.image === undefined ? 
                    <label htmlFor="company-logo" className='company-logo'>
                      <span>
                        <i className="company-logo__icon fa-solid fa-arrow-up-from-bracket"></i>
                        Chọn file
                      </span>
                      <input style={{ display: 'none' }} type="file"
                          id='company-logo'
                          accept="image/*"
                          onChange={(e: any) => handleChangeInputFile({ logo: e})}
                        />
                    </label> :
                    <div className='company-photo'
                      style={{backgroundImage: `url(${imgUrl ? imgUrl.preview : userEpr?.image})`}}>
                        <div className="company-photo__action">
                          <label htmlFor="company-logo" className="company-photo__action-label">
                            <i className="fa-solid fa-pen"></i>
                          </label>
                          <span className='company-photo__action-desc'>Sửa logo</span>
                          <input style={{ display: 'none' }} type="file"
                            id='company-logo'
                            accept="image/*"
                            onChange={(e: any) => handleChangeInputFile({ logo: e})}
                          />
                        </div>
                    </div>
                  }
                </div>
              </div>
              
              <div className="mb-3">
                <label className="company-label">Banner công ty</label>
                <div className='company-wrapper' style={{ height: 260 }}>
                  {
                    !bannerUrl && userEpr?.company_banner === undefined ? 
                    <label htmlFor="company-banner" className='company-logo'>
                      <span>
                        <i className="company-logo__icon fa-solid fa-arrow-up-from-bracket"></i>
                        Chọn file
                      </span>
                      <input style={{ display: 'none' }} type="file"
                          id='company-banner'
                          accept="image/*"
                          onChange={(e) => handleChangeInputFile({ banner: e })}
                        />
                    </label> :
                    <div className='company-photo'
                      style={{
                        backgroundImage: `url(${bannerUrl ? bannerUrl.preview : userEpr?.company_banner})`,
                        backgroundPosition: 'center',
                        width: '80%',
                        height: '60%'
                      }}
                    >
                        <div className="company-photo__action">
                          <label htmlFor="company-banner" className="company-photo__action-label">
                            <i className="fa-solid fa-pen"></i>
                          </label>
                          <span className='company-photo__action-desc'>Sửa banner</span>
                          <input style={{ display: 'none' }} type="file"
                            id='company-banner'
                            accept="image/*"
                            onChange={(e) => handleChangeInputFile({ banner: e })}
                          />
                        </div>
                    </div>
                  }
                </div>
              </div>
              
              <div className='flex justify-end pt-2'>
                <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white py-1 px-10 text-[16px] rounded'>Lưu</button>
              </div>
            </form>
          </div>
        </main>
      </div> :
        <div className='my-10'>
          <h1 className='text-center text-[30px] font-[700]'>Đăng nhập để tiếp tục.</h1>
        </div>}

    </>
  )
}

export default ProfileEpr