import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hook'
import { useChangeAvatarMutation, useGetUserByEmailQuery } from '../../../service/auth'

import './Profile.scss'
import Infotmation from './Information/Infotmation'
import MyJob from './MyJob';
import MyApplied from "./MyApplied"
import AccountMng from './AccountMng';
import {
    AccountMngIcon,
    AvatarIcon,
    InformationIcon, 
    MyJobIcon
} from './icons'
import HeaderSearchhJob from '../../layouts/HeaderSearchhJob';
import { useUploadImage } from '../../../utils/hooks/Upload';
import { toast } from 'react-toastify';

const Profile: any = () => {
    const actionRef: any = useRef()

    const { email, isLoggedIn } = useAppSelector((res: any) => res.auth)
    const navigate = useNavigate()
    const { data: user } = useGetUserByEmailQuery(email)
    const [param, setParam] = useSearchParams()
    const [imgUrl, setImgUrl] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [currentUrl, setCurrentUrl] = useState<any>()
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const key = param.get('tab')
    const [changeAvatar] = useChangeAvatarMutation()

    useEffect(() => {
        actionRef.current?.scrollIntoView({behavior: "smooth"})
    }, [])

    const profilePages = [
        {id: 1, icon: <InformationIcon />, title: 'Hồ sơ của tôi', page: Infotmation, tab: 'information'},
        {id: 2, icon: <MyJobIcon />, title: 'Việc làm đã lưu', page: MyJob, tab: 'my-job'},
        {id: 2, icon: <MyJobIcon />, title: 'Việc làm đã ứng tuyển', page: MyApplied, tab: 'my-applied'},
        {id: 3, icon: <AccountMngIcon />, title: 'Quản lý tài khoản', page: AccountMng, tab: 'account-manage'},
    ]

    let Component = profilePages[0].page;
    if (key) {
        profilePages.map((profilePage: any) => {
            if (key === profilePage.tab) {
                Component = profilePage.page;
            }
        })
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

    const handleChangeAvatar = async () => {
        setLoading(true)
        const formData = new FormData()
        const fileUpload = currentUrl?.target.files[0]

        //Check image size
        if (fileUpload.size > maxSizeInBytes) {
            return toast.warn('Kích thước quá lớn.')
        }

        formData.append('file', fileUpload)
        formData.append('upload_preset', 'dmjlzwse')
        formData.append('cloud_name', 'dywccbjry')

        let newImage
        if (fileUpload !== undefined) {
            const image = await useUploadImage(formData)
            newImage = image.url
        } else {
            newImage = user?.image
        }

        await changeAvatar({
            email,
            newImage
        }).then((res: any) => {{
            const {data} = res
            if (data?.success) {
                setLoading(false)
                toast.success('Cập nhật thành công')
            }
        }}).catch((err: any) => {
            setLoading(false)
            console.log(err.message);
        })
    }

    if (isLoggedIn == false) {
        return navigate('/login')
    }

    return (
        <div ref={actionRef}>
            <div className='bg-white'>
                <HeaderSearchhJob className={'py-[16px]'} />
            </div>
            {
                isLoggedIn ? 
                <section className='bg-[#f7f8fa] min-h-[125vh]'>
                    {/* CONTENT */}
                    <section className='flex items-start w-[90%] mx-auto gap-3 py-3'>
                        <aside className='rounded w-25'>
                            <section className='border-1 rounded bg-[#4A80F8] p-3'>
                                <div className='flex items-center space-x-4'>
                                    <div className="avatar-wrapper">
                                        {
                                            !imgUrl && user?.image === undefined ?
                                            <AvatarIcon /> :
                                            <div 
                                                style={{backgroundImage: `url(${imgUrl ? imgUrl.preview : user?.image})`}}
                                                className='avatar-img'
                                            />
                                        }
                                        <div className='avatar-action'>
                                            <label htmlFor="avatar" className='avatar-btn'>
                                                <i className="fa-solid fa-pen"></i>
                                                <input 
                                                    type="file" 
                                                    style={{display: 'none'}}
                                                    id='avatar'
                                                    accept="image/*"
                                                    onChange={handleChangeInputFile}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className='text-[20px] font-[600] text-white'>{user?.name}</h3>
                                    </div>
                                    {
                                        imgUrl !== undefined && 
                                            <>
                                                {
                                                    loading ? 
                                                    <i className="loading-icon fa-solid fa-circle-notch text-[#fff]"></i> :
                                                    <button onClick={handleChangeAvatar}>
                                                        <i className="fa-solid fa-arrow-up-from-bracket text-[#fff]"></i>
                                                    </button>
                                                }
                                            </>
                                    }
                                </div>
                            </section>
                            {
                                profilePages.map((profilePage: any, index) => (
                                    <section className='border-1 bg-white mt-[10px]' key={index}>
                                        <button 
                                            onClick={() => setParam({tab: profilePage.tab})} 
                                            className={'flex items-center p-[17px] w-100 border rounded hover:bg-[#EBF2FF] text-[#333333]'}
                                            style={{
                                                backgroundColor: key === profilePage.tab ? '#EBF2FF' : ''
                                            }}
                                        >
                                            {profilePage.icon}
                                            <span className='text-[14px] pl-[10px]'>{profilePage.title}</span>
                                        </button>
                                    </section>
                                ))
                            }
                        </aside>
                        <main className='w-75'>
                            <Component imgUrl={imgUrl} user={user}/>
                        </main>
                    </section>
                </section > :
                <div className='my-10 min-h-[100vh]'>
                    <h1 className='text-center text-[30px] font-[700]'>Đăng nhập để tiếp tục.</h1>
                </div>
            }

        </div>
    )
}

export default Profile