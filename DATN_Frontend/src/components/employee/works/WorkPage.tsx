import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { useEffect, useState } from 'react'
import { apiGetProvinces } from '../../../service/api';
import axios from "axios"
import { formatCurrency } from '../../../utils/hooks/FormatCurrrency'
import { toast } from "react-toastify";
import { useSearchParams, useNavigate, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import './work.css'
import HeaderSearchhJob from "../../layouts/HeaderSearchhJob";
import { useAddMyPostMutation, useRemoveMyPostMutation } from "../../../service/post";
import { useAddNotificationMutation } from "../../../service/notification";
import { message } from "antd";
import { useGetUsersEprQuery } from "../../../service/auth_employer";


const WorkPage = () => {

    const salaryOptions = [
        {
            title: "Tất cả mức lương",
            min_salary: null,
            max_salary: null
        },
        {
            title: "Thương lượng",
            offer_salary: 1,
        },
        {
            title: "Dưới 5 triệu",
            min_salary: 1,
            max_salary: 4999999
        },
        {
            title: "Từ 5 triệu đến 10 triệu",
            min_salary: 5000000,
            max_salary: 10000000
        },
        {
            title: "Từ 10 triệu đến 20 triệu",
            min_salary: 10000000,
            max_salary: 20000000
        },
        {
            title: "Từ 20 triệu  đến 25 triệu",
            min_salary: 20000000,
            max_salary: 25000000
        },
        {
            title: "Từ 25 triệu đến 30 triệu",
            min_salary: 25000000,
            max_salary: 30000000,
        },
        {
            title: "30 triệu trở lên",
            min_salary: 30000000,
        }
    ]
    const level = [
        "Thực tập sinh/Sinh viên",
        "Mới tốt nghiệp",
        "Nhân viên",
        "Trưởng phòng",
        "Giám đốc và cấp cao hơn",
    ];

    const typeOfWork = [
        "Toàn thời gian",
        "Bán thời gian",
        "Thực tập",
        "Việc làm online",
        "Nghề tự do",
        "Làm việc theo giờ linh hoạt",
        "Làm việc theo dự án",
        "Hợp đồng thời vụ",
        "Làm việc không chính thức (Freelance)",
        "Khác",
    ];

    const [data, setData] = useState([])
    const [provinces, setProvinces] = useState<any>([])
    const [searchMessage, setSearchMessage] = useState("")
    const [career, setCareer] = useState([])
    const [params] = useSearchParams()
    const searchParams = params.get('q');
    const careerParams = params.get('career');
    const { data: userEpr }: any = useGetUsersEprQuery('')
    const getLogo = (user_id: string) => {
        const data = userEpr?.find((user: any) => user._id === user_id)

        return data?.image
    }

    const navigate = useNavigate()
    const [filterParams, setFilterParams] = useState({
        key: searchParams,
        work_location: "",
        min_job_salary: "",
        max_job_salary: "",
        career: careerParams,
        working_form: "",
        level: "",
        sort: "-1",
        offer_salary: ""
    })
    useEffect(() => {
        const fetchProvinces = async () => {
            const { data: response }: any = await apiGetProvinces()
            setProvinces(response?.results);
        }
        fetchProvinces()
    }, [])
    useEffect(() => {
        loadData(filterParams);
        loadCareers()
    }, [])

    useEffect(() => {
        setFilterParams({ ...filterParams, key: searchParams });
    }, [searchParams])

    useEffect(() => {
        loadData(filterParams);
    }, [filterParams.work_location, filterParams.min_job_salary, filterParams.career, filterParams.key, filterParams.working_form, filterParams.level, filterParams.sort, careerParams]
    )
    const loadData = async (params: any = null) => {
        const { key, min_job_salary, max_job_salary, career, work_location, level, working_form, sort } = params
        if (key || min_job_salary || max_job_salary || career || work_location || level || working_form || sort) {
            setData([]);
            try {
                const { data } = await axios({
                    url: `http://localhost:4000/api/search`,
                    params
                })

                setData(data.data);
                setSearchMessage(data.message)
            }

            catch (err: any) {
                message.error(err.message)
            }
        }
        else {
            return await axios
                .get("http://localhost:4000/api/posts")
                .then((responsive) => setData(responsive.data))
                .catch((err: any) => message.error(err.message))
        }
    }
    const loadCareers = async () => {
        return await axios
            .get("http://localhost:4000/api/careers")
            .then((responsive) => setCareer(responsive.data))
            .catch((err: any) => message.error(err.message))
    }
    //savejob
    const { email } = useAppSelector((res: any) => res.auth)
    const [addMyPost] = useAddMyPostMutation()
    const [addNotification] = useAddNotificationMutation()
    const onHandleAdd: any = async (post: any) => {
    try{
        await addNotification({
            email,
            role: 2,
            notification_title: "Đã lưu vào Việc làm đã lưu",
            notification_content: post.job_content
        });
        await addMyPost({
            _id: post._id,
            isSave: true,
        });
        loadData(filterParams);
        } catch (err : any) {
            message.error(err.message);
        }
    }

    const [removeMyPost] = useRemoveMyPostMutation()
    const handleRemove = async (post: any) => {
        try{
        await addNotification({
            email,
            role: 2,
            notification_title: "Đã xoá khỏi Việc làm đã lưu",
            notification_content: post.job_content
          })      
        await removeMyPost({
            _id: post._id,
            isSave: true
          });
          loadData(filterParams);
        } catch (err : any) {
            message.error(err.message);
        }
    }

    const searchCareer = (e: any) => {
        setFilterParams({ ...filterParams, career: e.target.value })
        const search = searchParams ? searchParams : ""
        navigate(`/works?q=${search}&career=${e.target.value}`)
    }
    const getSearchKey = () => { }
    const setFilterSalary = (e: any) => {
        const data = salaryOptions[e.target.value];
        const formatSalary = (salary: number | null | undefined): string => {
            return salary !== null && salary !== undefined ? salary.toString() : '';
        };
        setFilterParams({
            ...filterParams,
            min_job_salary: formatSalary(data.min_salary),
            max_job_salary: formatSalary(data.max_salary),
            offer_salary: formatSalary(data.offer_salary)
        });

    }
    return (
        <>
            <div style={{ background: 'white' }} className='min-h-[100vh] mb-[24px]'>
                <HeaderSearchhJob className={'py-[16px]'} />
                <div className="bg-[#f8f9fa] pt-[12px]">
                    {/* CONTENT */}
                    <div className="p-[10px]" style={{ marginTop: '10px', backgroundColor: 'rgb(229, 238, 255)', margin: 'auto', width: '80%', borderRadius: '7px', display: 'flex' }}>
                        <select className="px-[4px] border rounded" value={filterParams.career || ""} name="cars" onChange={(e) => searchCareer(e)} id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', gap: '5px' }}>
                            <option value="">Tất Cả Nghề Nghiệp</option>
                            {career && career.map((item: any, index) => (
                                <option key={index} value={item._id}>{item.name}</option>
                            ))}
                        </select>
                        {/* luong */}
                        <select className="px-[4px] border rounded" onChange={(e) => setFilterSalary(e)} name="cars" id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', marginLeft: '10px', gap: '5px' }}>
                            {salaryOptions && salaryOptions.map((item: any, index) => (
                                <option key={index} value={index}>{item.title}</option>
                            ))}
                        </select>
                        <select className="px-[4px] border rounded" onChange={(e) => setFilterParams({ ...filterParams, work_location: e.target.value })} name="cars" id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', marginLeft: '10px', gap: '5px' }}>
                            <option value="">Khu vực</option>
                            {
                                provinces ? provinces?.map((province: any, index: number) =>
                                    <option key={index} value={province.province_name}>{province.province_name}</option>
                                ) : ''
                            }
                        </select>
                        <select className="px-[4px] border rounded" onChange={(e) => setFilterParams({ ...filterParams, level: e.target.value })} name="cars" id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', marginLeft: '10px', gap: '5px' }}>
                            <option value="">Tất cả cấp bậc</option>
                            {
                                level.map((item: any, index: number) =>
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                        <select className="px-[4px] border rounded" onChange={(e) => setFilterParams({ ...filterParams, working_form: e.target.value })} name="cars" id="cars" style={{ height: "40px", minWidth: '80px', borderRadius: '4px', outline: 'none', marginLeft: '10px', gap: '5px' }}>
                            <option value="">Tất cả loại hình</option>
                            {
                                typeOfWork.map((item: any, index: number) =>
                                    <option key={index} value={item}>{item}</option>
                                )
                            }
                        </select>
                    </div>
                    {/* works */}
                    <div className="content-works" style={{ margin: 'auto', marginTop: '20px', display: 'flex', width: '80%', justifyContent: 'space-between' }}>
                        <div className="list-works" style={{ flex: '1' }}>
                            {
                                searchParams ?
                                    searchMessage
                                    : <span> Trang chủ &gt; Việc làm &gt; Tất cả việc làm </span>
                            }
                            <div className="pt-2">
                                <span> Sắp xếp theo </span>
                                <span style={{ color: filterParams.sort == "-1" ? 'blue' : '' }} className="px-2 cursor-pointer" onClick={() => setFilterParams({ ...filterParams, sort: "-1" })}>Ngày đăng (mới nhất)</span>
                                <span style={{ color: filterParams.sort == "1" ? 'blue' : '' }} className="px-2 cursor-pointer" onClick={() => setFilterParams({ ...filterParams, sort: "1" })}>Ngày đăng (cũ nhất)</span>
                            </div>
                            {
                                data?.map((item: any, index: any) =>
                                    item.post_status &&
                                    <section
                                        key={index}
                                        className="flex items-start justify-between bg-[#f0f7ff] hover:bg-[#fff] w-100 p-[16px] mt-[12px] border-[1px] border-[#a0c1ff] rounded-[6px]"
                                    >
                                        <div className="flex items-center m-0 w-[84%]">
                                            <div className='mr-[16px]'>
                                                <a className="rounded-[6px]" style={{ background: 'white', justifyContent: 'center', display: 'flex' }}>
                                                    <img src={getLogo(item.user_id)} style={{ width: '120px', height: 'auto', margin: '20px 0px' }} />
                                                </a>
                                            </div>
                                            <div className="w-100">
                                                <NavLink
                                                    to={`/posts/${item._id}`}
                                                    className="work-text__name m-0 font-medium text-[#333] text-[16px] hover:text-[#ff7d55]"
                                                >
                                                    {item?.job_name}
                                                </NavLink>
                                                <p className="m-0">Hình Thức Làm Việc : {item.working_form}</p>
                                                <p className="m-0"> Số Lượng Cần Tuyển : {item.number_of_recruits}</p>
                                                {item && item.offer_salary
                                                    ? <p className="m-0"> <span style={{ color: 'red' }}>Thương lượng</span> | {item.work_location.join(",")}</p>
                                                    : <p className="m-0"> <span style={{ color: 'red' }}>{item.min_job_salary ? `${formatCurrency(item.min_job_salary)}` : "Lên đến"} {item.min_job_salary && item.max_job_salary ? '-' : ""} {item.max_job_salary ? `${formatCurrency(item.max_job_salary)}` : "trở lên"}</span> | {item.work_location.join(",")}</p>
                                                }

                                            </div>
                                        </div>
                                        {item && item.priority == 3 ?
                                            <div className='flex justify-end p-2 mt-[-8px] mb-[8px]'>
                                                <span className='text-[12px] px-2 rouned-xl text-white bg-red-500'>TOP</span>
                                            </div>
                                            : <></>
                                        }
                                        {item && item.priority == 2 ?
                                            <div className='flex justify-end p-2 mt-[-8px] mb-[8px]'>
                                                <span className='text-[12px] px-2 rouned-xl text-white bg-red-500'>HOT</span>
                                            </div>
                                            : <></>
                                        }
                                        <button className="text-[#5591ff] hover:bg-[#f0f7ff] p-[6px] rounded-full">
                                            {
                                                item && item.isSave ?
                                                    <AiFillHeart
                                                        onClick={() => handleRemove({
                                                            _id: item._id,
                                                            isSave: true
                                                        })}
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                                    :
                                                    <AiOutlineHeart
                                                        onClick={() => onHandleAdd(item)}
                                                        style={{ width: '20px', height: '20px' }}
                                                    />
                                            }
                                        </button>
                                    </section>
                                )
                            }
                        </div>
                        <div className='ml-[16px]' id="banner-list-job">
                            <div className="border rounded">
                                <p className='py-3 pl-3 fs-6' style={{ background: '#white', color: 'black' }}>Công Ty Hàng Đầu</p>
                                <div className='' style={{ paddingBottom: '0.9em' }} >
                                    <img className="no-image" src='https://tse3.mm.bing.net/th?id=OIP.cLyW0WdrOvk6Nq7ehtoRxwHaEK&pid=Api&P=0' />
                                    <p style={{ padding: '10px 0 0 ', textAlign: 'center', fontSize: '1em', fontWeight: 'bold' }}>Công Ty cổ phần MISA</p>
                                    <p style={{ textAlign: 'center', padding: '10px 0 0 ' }}>Trở thành Marketer chuyên nghiệp cùng MISA ngay hôm nay</p>
                                    <div style={{ textAlign: 'center', padding: '10px 0 0 ', fontSize: '0.9em', color: "blue" }}><a href='#'>9 vị trí đang ứng</a></div>
                                </div>
                            </div>
                            <img src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2F500x600_122855.png&w=1920&q=75" style={{ marginTop: '0.8em' }} />
                            <img src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2F500x600_122998.png&w=1920&q=75" style={{ marginTop: '0.8em' }} />
                            <img src="https://www.vietnamworks.com/_next/image?url=https%3A%2F%2Fimages.vietnamworks.com%2Flogo%2F3.%20500x600_123080.jpg&w=1920&q=75" style={{ marginTop: '0.8em' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default WorkPage