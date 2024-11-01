import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hook'
import { useUploadImage } from '../../../utils/hooks/Upload';
import { toast } from 'react-toastify';
import { useChangeBannerMutation, useGetBannersQuery } from '../../../service/admin/banner';
import IBanner from '../../../interface/admin/banner';
import { SubmitHandler, useForm } from 'react-hook-form';

const BannerForm = () => {
    const { _id, isLoggedIn } = useAppSelector((res: any) => res.banner)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IBanner>()
    const [changeAvatar] = useChangeBannerMutation()
    const { data: banners } = useGetBannersQuery()
    const navigate = useNavigate()
    const [imgUrl, setImgUrl] = useState<any>()
    const [currentUrl, setCurrentUrl] = useState<any>()
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    let bannerImg
    if (banners) {
        bannerImg = banners[0].imageUrl
        
    }
    useEffect(() => {
        return () => {
            imgUrl && URL.revokeObjectURL(imgUrl.preview)
        }
    }, [imgUrl])

    const handleChangeInputFile = (e: any) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        setImgUrl(file)
        setCurrentUrl(e)
    }
   
 
    const handleUpdate: SubmitHandler<IBanner> = async (changeAvatarForm: IBanner) => {
        const formData = new FormData()
        const fileUpload = currentUrl?.target.files[0]

        //Check image size
        if (fileUpload.size > maxSizeInBytes) {
            return toast.warn('Kích thước quá lớn.')
        }

        formData.append('file', fileUpload)
        formData.append('upload_preset', 'dmjlzwse')
        formData.append('cloud_name', 'dywccbjry')

        let imgPath
        if (fileUpload !== undefined) {
            const image = await useUploadImage(formData)
            imgPath = image.url
        }else {
            if (banners) {
                
                imgPath = banners[0].imageUrl
            }
        }
    

        await changeAvatar({
            ...changeAvatarForm,
            image: imgPath
          }).then((res: any) => {{
            const {data} = res
            if (data?.success) {
              toast.success('Cập nhật thành công')
            }
          }})
        }
      



    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
            <section className='rounded p-3' style={{ marginTop: "100px" }}>
                <div className="mb-3">
                    <label className="company-label">Ảnh banner</label>
                    <div className='company-wrapper' style={{ height: "400px" }}>
                        {
                            <div className='company-photo'
                                style={{
                                    backgroundImage: `url(${imgUrl ? imgUrl.preview : bannerImg})`,
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                <div className="company-photo__action">
                                    <label htmlFor="company-logo" className="company-photo__action-label">
                                        <i className="fa-solid fa-pen"></i>
                                    </label>
                                    <span className='company-photo__action-desc'>Sửa banner</span>
                                    <input style={{ display: 'none' }} type="file"
                                        id='company-logo'
                                        accept="image/*"
                                        onChange={handleChangeInputFile}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='flex justify-end pt-2'>
                    <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white py-1 px-10 text-[16px] rounded'>Lưu</button>
                </div>
            </section>

        </form>




    )
};

export default BannerForm;