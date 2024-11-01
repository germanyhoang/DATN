import { useState } from "react"
import { SubmitHandler } from 'react-hook-form'
import {
    useGetUserByEmailQuery,
    useUpdateUserMutation
} from '../../../../service/auth'
import { toast } from 'react-toastify'
import IUserNTV from '../../../../interface/user'
import ModalInformation from './ModalInformation'
import {
    FormCareerGoal,
    FormEducation,
    FormInfor,
    FormMoreInfo,
    FormSkills,
    FormWorkExp
} from './FormInformation'
import { UserOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../../../app/hook'
import { AvatarIcon } from '../icons'
import InformationComponent from './InformationComponent'
import { NavLink } from "react-router-dom"
import { Switch } from "antd"

const forms = [
    { id: 1, component: FormInfor },
    { id: 2, component: FormCareerGoal },
    { id: 3, component: FormWorkExp },
    { id: 4, component: FormEducation },
    { id: 5, component: FormSkills },
    { id: 6, component: FormMoreInfo },
]

const Infotmation = ({ imgUrl }: any) => {
    let Component = forms[0].component
    const [formProps, setFormProps] = useState<any>()
    const { email } = useAppSelector((res: any) => res.auth)
    const { data: user } = useGetUserByEmailQuery(email)

    if (formProps) {
        forms.map((form: any) => {
            if (formProps?.id === form?.id) {
                Component = form.component
            }
        })
    }

    const [updateUser] = useUpdateUserMutation()
    const handleUpdate: SubmitHandler<IUserNTV> = async (userForm: any) => {
        const [key] = Object.keys(userForm);
        const currentData = user[key];
        const formData = userForm[key];

        const start_date = formData.timeId ? new Date(formData.timeId[0].$d).toLocaleDateString() : null
        const end_date = formData.timeId ? new Date(formData.timeId[1].$d).toLocaleDateString() : null
        // const monthCount: number = formData.timeId ? Math.floor(((formData.timeId[1])?.getMonth() - (formData.timeId[0].$d)?.getMonth()) / (24 * 3600 * 1000)) : 0
        // console.log(monthCount)

        if (!userForm.type) {
            return await updateUser({
                ...user,
                ...userForm,
            }).then((res: any) => {
                const { data } = res
                if (data?.success) {
                    toast.success('Cập nhật thành công')
                }
            })
        }

        return await updateUser({
            ...user,
            [key]: [
                ...currentData,
                {
                    id: currentData ? currentData.length + 1 : 1,
                    time: {
                        start_date,
                        end_date,
                    },
                    ...formData
                }
            ]
        }).then((res: any) => {
            const { data } = res
            if (data?.success) {
                toast.success('Cập nhật thành công')
            }
        })

    }
    const handleRemove = async ({ id, key }: any) => {
        const currentData = user[key];
        const newData = currentData.filter((item: any) => item.id !== id)
        return await updateUser({
            ...user,
            [key]: [
                ...newData,
            ]
        }).then((res: any) => {
            const { data } = res
            if (data?.success) {
                toast.success('Đã xóa thành công.')
            }
        })
    }
    const onChangeFindWorkStatus = async (checked: boolean) => {
      
       await updateUser({
        ...user,
        job_search_status : checked
       })
      };
    return (
        <>
            <div className="">
                <label htmlFor="modal-form-check"
                    className='flex flex-start w-100 border-1 rounded bg-white py-[20px] px-[24px]'
                    onClick={() => setFormProps({
                        title: "Thông tin cá nhân",
                        id: 1
                    })}
                >
                    <div className="avatar-info">
                        {
                            !imgUrl && user?.image === undefined ?
                                <AvatarIcon /> :
                                <div
                                    style={{ backgroundImage: `url(${imgUrl ? imgUrl?.preview : user?.image})` }}
                                    className='avatar-img-info'
                                />
                        }
                    </div>
                    <section className='ml-[24px]'>
                        <h4 className="infor-name">{user?.name}</h4>
                        <span className="pr-4">Bật trạng thái tìm việc</span>
                        <Switch value={user?.job_search_status} onChange={onChangeFindWorkStatus}/>
                        <section className="flex flex-wrap items-center w-100">
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-graduation-cap mr-[8px]"></i>
                                {user?.level ? user?.level : "Thêm vị trí ứng tuyển"}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-envelope mr-[8px]"></i>
                                {user?.email}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-phone mr-[8px]"></i>
                                {user?.phone}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-house mr-[8px]"></i>
                                {user?.specific_address + ', ' + user?.district + ', ' + user?.province}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-location mr-[8px]"></i>
                                {user?.work_location}
                            </span>
                        </section>
                    </section>
                </label>

                <section
                    className='w-100 border-1 rounded bg-white py-[20px] mt-[8px] px-[24px]'
                >
                    <h4 className="text-[22px]">Hồ sơ của tôi</h4>

                    <section className="flex items-start mt-[18px]">
                        <img
                            src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fwww.vietnamworks.com%2Fassets-wowcv%2Fimages%2Flist_templates%2Fcv_template_35.png&w=96&q=75"
                            alt=""
                        />
                        <section className="flex flex-column items-start ml-[16px] mt-[16px]">
                            <NavLink to={`/change-cv${user?.cv_id && `?templateId=` + user?.cv_id || ''}`} className='flex items-center text-[#005aff] hover:text-[#fe7d55] mb-[16px]'>
                                <i className="text-[22px] fa-solid fa-file-pdf"></i>
                                <span className="ml-[6px]">{user?.cv_id ? 'Thay đổi mẫu hồ sơ' : 'Tạo hồ sơ'}</span>
                            </NavLink>

                            
                        </section>

                    </section>
                </section>

                {/* Career Goal */}
                <InformationComponent
                    id={2}
                    title={"Mục tiêu nghề nghiệp"}
                    desc={"Giới thiệu bản thân và miêu tả mục tiêu nghề nghiệp của bạn"}
                    btn_value={"Thêm Mục Tiêu Nghề Nghiệp"}
                    onClick={({ title, id }: any) => setFormProps({ title, id })}
                    hidden={user?.career_goal}
                >
                    {user?.career_goal && <label htmlFor='modal-form-check'>{user?.career_goal}</label>}
                </InformationComponent>

                {/* Work Exp */}
                <InformationComponent
                    id={3}
                    title={"Kinh nghiệm làm việc"}
                    desc={"Mô tả kinh nghiệm làm việc của bạn càng chi tiết càng tốt, điều đó giúp bạn có cơ hội hiển thị nhiều hơn trong kết quả tìm kiếm"}
                    btn_value={"Thêm Kinh Nghiệm Làm Việc"}
                    onClick={({ title, id }: any) => setFormProps({ title, id })}
                >
                    {
                        user?.work_experience &&
                        user?.work_experience.map((item: any) => (
                            <section className="info-children flex items-start justify-between w-100 mt-[24px]" key={item.id}>
                                <section className="flex items-center">
                                    {/* <img width={80} height={80} src="https://images.vietnamworks.com/img/company-default-logo.svg" className="work-exp__img" /> */}
                                    <section className="ml-[16px]">
                                        <h4 className="text-[16px] mb-0">{item.position}</h4>
                                        <p className="text-[14px] mb-0">{item.company}</p>
                                        <p className="text-[14px]">
                                            {
                                                item?.timeId ?
                                                    <span>{item?.time?.start_date} - {item?.time?.end_date}</span>
                                                    : <span>Ví dụ: 09/2023 - 12/2024</span>
                                            }
                                        </p>
                                    </section>
                                </section>
                                <button className="info-children__btn" onClick={() => handleRemove({
                                    id: item.id,
                                    key: "work_experience"
                                })}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </section>
                        ))
                    }
                </InformationComponent>

                {/* Education */}
                <InformationComponent
                    id={4}
                    title={"Học vấn"}
                    desc={"Mô tả toàn bộ quá trình học vấn của bạn, cũng như các bằng cấp bạn đã được và các khóa huấn luyện bạn đã tham gia"}
                    btn_value={"Thêm Học vấn"}
                    onClick={({ title, id }: any) => setFormProps({ title, id })}
                >
                    {
                        user?.education &&
                        user?.education.map((item: any) => (
                            <section className="info-children flex items-start justify-between w-100 mt-[24px]" key={item.id}>
                                <section className="flex items-center">
                                    <section className="h-[80px] w-[80px] bg-[#f8f8f8] text-center flex flex-column p-[8px]">
                                        <span className="text-[14px] text-[#ff7d55] leading-[20px] mb-[4px] pt-[8px] pb-[2px] ">Trường</span>
                                        <span className="text-[12px]">Thời gian</span>
                                    </section>
                                    <section className="ml-[16px]">
                                        <h4 className="text-[16px] mb-0">{item.major}</h4>
                                        <p className="text-[14px] mb-0">{item.school} - {item.edu_level}</p>
                                        <p className="text-[14px]">
                                            {
                                                item?.timeId ?
                                                    <span>{item?.time?.start_date} - {item?.time?.end_date}</span>
                                                    : <span>Ví dụ: 09/2008 - 12/2014</span>
                                            }
                                        </p>
                                    </section>
                                </section>
                                <button className="info-children__btn" onClick={() => handleRemove({
                                    id: item.id,
                                    key: "education"
                                })}>
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </section>
                        ))
                    }
                </InformationComponent>

                {/* Skill */}
                <InformationComponent
                    id={5}
                    title={"Kỹ năng"}
                    desc={"Trong phần này, bạn nên liệt kê các kỹ năng phù hợp với vị trí hoặc lĩnh vực nghề nghiệp mà bạn quan tâm."}
                    btn_value={"Thêm Kỹ Năng"}
                    onClick={({ title, id }: any) => setFormProps({ title, id })}
                    hidden={user?.skills.length !== 0}
                >
                    <section className="flex items-center flex-wrap">
                        {
                            user?.skills &&
                            user?.skills.map((item: any) => (
                                <section key={item.id} className="bg-[#fbfbfb] border-[1px] border-[#ddd] rounded-[6px] text-[14px] flex items-center justify-center min-w-[100px] mr-[8px] px-[10px] py-[7px]">
                                    <span>{item?.skill_name}</span>
                                    <i className="ml-[8px] fa-solid fa-check"></i>
                                </section>
                            ))
                        }
                    </section>
                </InformationComponent>

                {/* More Infomation */}
                <InformationComponent
                    id={6}
                    title={"Thông tin thêm"}
                    desc={"Điền thông tin thêm nếu có"}
                    btn_value={"Thêm Thông Tin"}
                    onClick={({ title, id }: any) => setFormProps({ title, id })}
                    hidden={user?.more_info}
                >
                    {user?.more_info && <label htmlFor='modal-form-check'>{user?.more_info}</label>}
                </InformationComponent>
            </div>
            <ModalInformation title={formProps?.title}>
                <Component onSubmit={handleUpdate} handleRemove={handleRemove} />
            </ModalInformation>
        </>
    )
}
export default Infotmation