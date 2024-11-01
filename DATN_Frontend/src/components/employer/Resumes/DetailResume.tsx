import { NavLink, useParams } from "react-router-dom";
import { useGetUserByIDQuery } from "../../../service/auth";
import InformationComponent from "../../employee/profile/Information/InformationComponent";

const DetailResume = (props: any) => {
    const {id} = useParams()
    const { data: user } = useGetUserByIDQuery(id)
    // console.log(user);
    
    return (
        <div className="px-[200px]">
           <section className='my-4 ml-[24px]'>
                        <h4 className="">Tên ứng viên : {user?.name}</h4>
                        <section className="flex flex-wrap items-center w-100">
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-briefcase mr-[8px]"></i>
                                {user?.career ? user?.career?.name: "Chưa có"}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-graduation-cap mr-[8px]"></i>
                                {user?.level ? user?.level : "Chưa có"}
                            </span>
                            <a href={`mailto:${user?.email}`} className='w-[50%]'>
                                <i className="fa-solid fa-envelope mr-[8px]"></i>
                                {user?.email}
                            </a>
                            <a href={`tel:${user?.phone}`} className='w-[50%]'>
                                <i className="fa-solid fa-phone mr-[8px]"></i>
                                {user?.phone}
                            </a>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-house mr-[8px]"></i>
                                {user?.specific_address + ', ' + user?.district + ', ' + user?.province}
                            </span>
                            <span className='w-[50%]'>
                                <i className="fa-solid fa-location mr-[8px]"></i>
                                {user?.work_location ?? "Chưa có"}
                            </span>
                        </section>
                    </section>
                    
                <InformationComponent
                    id={2}
                    title={"Mục tiêu nghề nghiệp"}
                    hidden={true}
                >
                    {user?.career_goal && <label htmlFor='modal-form-check'>{user?.career_goal}</label>}
                </InformationComponent>
                <InformationComponent
                    id={3}
                    hidden={true}
                    title={"Kinh nghiệm làm việc"}
                >
                    {
                        user?.work_experience && 
                        user?.work_experience.map((item: any) => (
                            <section className="info-children flex items-start justify-between w-100 mt-[24px]" key={item.id}>
                                <section className="flex items-center">
                                    <img width={80} height={80} src="https://images.vietnamworks.com/img/company-default-logo.svg" className="work-exp__img" />
                                    <section className="ml-[16px]">
                                        <h4 className="text-[16px] mb-0">{item.position}</h4>
                                        <p className="text-[14px] mb-0">{item.company}</p>
                                        <p className="text-[14px]">
                                            {
                                                item?.timeId ? 
                                                <span>{item?.time?.start_date} - {item?.time?.end_date}</span>
                                                : <span>Ví dụ: 09/2008 - 12/2014</span>
                                            }
                                        </p>
                                    </section>
                                </section>
                            </section>
                        ))
                    }
                </InformationComponent>
                <InformationComponent
                    id={4}
                    title={"Học vấn"}
                    hidden={true}
                >
                    {
                        user?.education && 
                        user?.education.map((item: any) => (
                            <section className="info-children flex items-start justify-between w-100 mt-[24px]" key={item.id}>
                                <section className="flex items-center">
                                    <section className="h-[60px] w-[60px] bg-[#f8f8f8] text-center flex flex-column p-[8px]">
                                        <span className="text-[25px] text-[#ff7d55] leading-[20px] mb-[4px]">0</span>
                                        <span className="text-[12px]">Tháng</span>
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
                            </section>
                        ))
                    }
                </InformationComponent>
                
                {/* Skill */}
                <InformationComponent
                    id={5}
                    title={"Kỹ năng"}
                    hidden={true}
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
                    hidden={true}
                >
                    {user?.more_info && <label htmlFor='modal-form-check'>{user?.more_info}</label>}
                </InformationComponent>
        </div>
    )
}

export default DetailResume;