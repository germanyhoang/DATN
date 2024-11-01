import { useState, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { useAppSelector } from "../../../../app/hook"
import { useGetUserByEmailQuery } from "../../../../service/auth"
import { apiGetDistricts, apiGetProvinces } from "../../../../service/api"
import useDateFormat from "../../../../utils/hooks/FormatDate"
import { DatePicker, Space } from "antd"
import axios from "axios"

const { RangePicker } = DatePicker;
const getUser = () => {
    const { email }: any = useAppSelector((res: any) => res.auth)
    const { data: user }: any = useGetUserByEmailQuery(email)

    return user
}

export const FormInfor = ({onSubmit}: any) => {
    const [career, setCareer] = useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<any>()
    const { email } = useAppSelector((res: any) => res.auth)
    const { data: user } = useGetUserByEmailQuery(email)
    const [provinces, setProvinces] = useState<any>([])
    const [districts, setDistricts] = useState<any>([])
    const loadCareers = async () => {
        return await axios
          .get("http://localhost:4000/api/careers")
          .then((responsive) => setCareer(responsive.data))
          .catch((error) => console.error());
      };
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const { data: response }: any = await apiGetProvinces();
                setProvinces(response?.results); // Lưu danh sách tỉnh/thành phố
            } catch (error) {
                console.error('Không thể lấy danh sách tỉnh/thành phố:', error);
            }
        };
        reset(user)
        fetchProvinces()
        loadCareers();
    }, [user])

    const changeSelect = async (event: any) => {
        const selectedProvinceName = event.target.value;
        const selectedProvince = provinces.find((province: any) => province.province_name === selectedProvinceName);
        if (selectedProvince) {
            try {
                const { data: response }: any = await apiGetDistricts(selectedProvince.province_id);
                setDistricts(response?.results); // Lưu danh sách quận/huyện
            } catch (error) {
                console.error('Không thể lấy danh sách quận/huyện:', error);
            }
        } else {
            setDistricts([]); // Nếu không có tỉnh/thành phố nào được chọn, clear danh sách quận/huyện
        }
    };
    const level = [
        "Thực tập sinh/Sinh viên",
        "Mới tốt nghiệp",
        "Nhân viên",
        "Trưởng phòng",
        "Giám đốc và cấp cao hơn",
      ];
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-50 flex flex-col'>
                        <label>Họ và tên <span className='text-red-500'>*</span></label>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("name", {
                                required: true,
                                pattern: /^(?!.*\d)(?!.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/
                            })} />
                        {errors.name && errors.name.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên.</span>}
                        {errors.name && errors.name.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Tên không hợp lệ.</span>}
                    </div>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Số điện thoại <span className='text-red-500'>*</span></div>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("phone", {
                                required: true,
                                minLength: 10,
                                pattern: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/
                            })} />
                        {errors.phone && errors.phone.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Số điện thoại.</span>}
                        {errors.phone && errors.phone.type == 'minLength' && <span className='text-red-500 fw-bold mt-1'> Số điện thoại phải có ít nhất 10 ký tự.</span>}
                        {errors.phone && errors.phone.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Số điện thoại không hợp lệ.</span>}
                    </div>
                </div>
            </div>
            <div className='py-2'>
                <div className='mx-3'>
                    <div className='mb-[8px]'>Email <span className='text-red-500'>*</span></div>
                    <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                        {...register("email", {
                            required: true,
                            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                        })} />
                    {errors.email && errors.email.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Email</span>}
                    {errors.email && errors.email.type == 'pattern' && <span className='text-red-500 fw-bold mt-1'>Email không hợp lệ</span>}
                </div>
            </div>
            <div className='py-2'>
            <div className='flex items-center mx-3 gap-x-2'>
            <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Chuyên ngành</div>
                        <select  {...register('main_career')}  className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option value={0}>--Chọn chuyên ngành--</option>
                            {
                                career ? career?.map((item: any) =>
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ) : ''
                            }
                        </select>
                    </div>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Cấp bậc ứng tuyển</div>
                        <select  {...register('level')} defaultValue={user?.level}  className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option value={0}>--Chọn cấp bậc--</option>
                            {
                                level && level?.map((item: any) =>
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ) 
                            }
                        </select>
                    </div> 
                    
                
            </div>
                
            </div>
        
                
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Giới tính</div>
                        <select  {...register('gender')} defaultValue={user?.gender}  className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option defaultChecked={true}>--Chọn Giới tính--</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                    </div>
                    <div className='w-50 flex flex-col'>
                        <label>Tuổi</label>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register('age')} />
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <div className='flex items-center gap-x-2 mx-3'>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Tỉnh/Thành phố</div>
                        <select  {...register('province')} defaultValue={user?.province}  onChange={changeSelect} className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option value={0}>--Chọn Tỉnh/Thành phố--</option>
                                {provinces?.map((province: any) =>
                                    <option key={province.province_id} value={province.province_name}>
                                        {province.province_name}
                                    </option>
                                )
                            };
                        </select>
                    </div>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Quận/Huyện</div>
                        <select {...register('district')} defaultValue={user?.district}  className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option value={0}>--Chọn Quận/Huyện--</option>
                                {districts?.map((district: any) =>
                                    <option key={district.district_id} value={district.district_name}>
                                        {district.district_name}
                                    </option>
                                )}
                        </select>
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <div className='mx-3'>
                    <div className='flex flex-col'>
                        <div className='mb-[8px]'>Địa chỉ cụ thể</div>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register('specific_address')} />
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <div className='mx-3'>
                    <div className='flex flex-col'>
                        <div className='mb-[8px]'>Địa điểm làm việc</div>
                        <select  {...register('work_location')}  defaultValue={user?.work_location}  className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'>
                            <option value={0}>--Chọn Tỉnh/Thành phố--</option>
                            {
                                provinces ? provinces?.map((province: any) =>
                                    <option key={province.province_id} value={province.province_name}>
                                        {province.province_name}
                                    </option>
                                ) : ''
                            }
                        </select>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}

export const FormCareerGoal = ({ onSubmit}: any) => {
    const { register, handleSubmit, reset } = useForm<any>()
    const user = getUser()

    useEffect(() => {
        reset(user)
    }, [user])

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-3'>
                <textarea
                    className="border-[1px] border-[#D9D9D9] p-[8px] w-100 focus:outline-none" cols={30} rows={5}
                    placeholder={'Điền Mục tiêu nghề nghiệp nếu có'}
                    maxLength={5000}
                    {...register('career_goal')}
                ></textarea>
                <span>
                    <span>Không vượt quá 5000 chữ</span>
                </span>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}

export const FormWorkExp = ({ onSubmit }: any) => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<any>()
    const date: any = new Date()
    const dayNow = useDateFormat(date)

    return (
        <form
            onSubmit={handleSubmit(((work_experience: any) => onSubmit({
                work_experience,
                type: "form_work_exp"
            })))
            }>
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-50 flex flex-col'>
                        <label>Chức danh <span className='text-red-500'>*</span></label>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("position", {
                                required: true,
                            })} />
                        {errors.position && errors.position.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Chức danh.</span>}
                    </div>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Công ty <span className='text-red-500'>*</span></div>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("company", {
                                required: true,
                            })} />
                        {errors.company && errors.company.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Tên công ty.</span>}
                    </div>
                </div>
            </div>
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-100'>
                        <div className='mb-[8px]'>Thời gian</div>
                        <Space
                            direction="horizontal"
                            size={12}
                            style={{ width: '100%', display: 'block' }}
                        >

                            <Controller
                                name="timeId"
                                control={control}
                                render={({ field }) => (
                                    <RangePicker
                                        style={{ width: '100%', height: '36px' }}
                                        format="MM/DD/YYYY"
                                        onChange={(e: any) => {
                                            field.onChange(e)
                                        }}
                                        placeholder={['Bắt đầu', 'Kết thúc']}
                                    />
                                )}
                            />
                        </Space>
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <div className='mx-3'>
                    <div className='flex flex-col'>
                        <div className='mb-[8px]'>Mô tả <span className='text-red-500'>*</span></div>
                        <textarea
                            className="border-1 border-[#D9D9D9] p-[8px] w-100 rounded focus:outline-none" cols={30} rows={5}
                            placeholder={'Mô tả kinh nghiệm làm việc'}
                            {...register('desc_exp', {
                                required: true,
                            })}
                        ></textarea>
                        {errors.desc && errors.desc.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Mô tả.</span>}
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}

export const FormEducation = ({ onSubmit, propId }: any) => {
    const { register, handleSubmit, formState: { errors }, reset, control } = useForm<any>()

    if (propId) {
        const { education } = getUser()

        useEffect(() => {
            reset(education[propId - 1])
        }, [education])
    }

    return (
        <form
            onSubmit={handleSubmit(((education: any) => onSubmit({
                education,
                type: "form_education"
            })))}>
            <div className='py-2'>
                <div className='mx-3'>
                    <div className='mb-[8px]'>Chuyên ngành <span className='text-red-500'>*</span></div>
                    <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                        {...register("main_career", {
                            required: true,
                        })} />
                    {errors.main_career && errors.main_career.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Chuyên ngành</span>}
                </div>
            </div>
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-50 flex flex-col'>
                        <label>Trường <span className='text-red-500'>*</span></label>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("school", {
                                required: true,
                            })} />
                        {errors.school && errors.school.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng nhập Trường.</span>}
                    </div>
                    <div className='w-50 flex flex-col'>
                        <div className='mb-[8px]'>Bằng cấp <span className='text-red-500'>*</span></div>
                        <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                            {...register("edu_level", {
                                required: true,
                            })} />
                        {errors.edu_level && errors.edu_level.type == 'required' && <span className='text-red-500 fw-bold mt-1'>Vui lòng chọn Bằng cấp.</span>}
                    </div>
                </div>
            </div>
            <div className='py-2'>
                <div className='flex items-center mx-3 gap-x-2'>
                    <div className='w-100'>
                        <div className='mb-[8px]'>Thời gian</div>
                        <Space
                            direction="horizontal"
                            size={12}
                            style={{ width: '100%', display: 'block' }}
                        >

                            <Controller
                                name="timeId"
                                control={control}
                                render={({ field }) => (
                                    <RangePicker
                                        style={{ width: '100%', height: '36px' }}
                                        format="MM/DD/YYYY"
                                        onChange={(e: any) => {
                                            field.onChange(e)
                                        }}
                                        placeholder={['Bắt đầu', 'Kết thúc']}
                                    />
                                )}
                            />
                        </Space>
                    </div>
                </div>
            </div>
            <div className='py-3'>
                <div className='mx-3'>
                    <div className='flex flex-col'>
                        <div className='mb-[8px]'>Hoạt động</div>
                        <textarea
                            className="border-1 border-[#D9D9D9] p-[8px] w-100 rounded focus:outline-none" cols={30} rows={5}
                            placeholder={'Các hoạt động từng tham gia'}
                            {...register('act')}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}

export const FormSkills = ({ onSubmit, handleRemove }: any) => {
    const user = getUser();
    const { register, handleSubmit } = useForm<any>()
    return (
        <form
            onSubmit={handleSubmit(((skills: any) => onSubmit({
                skills,
                type: "form_skills"
            })))}>
            <div className='py-3'>
                <div className='mb-[8px]'>Tên kỹ năng</div>
                <input className='w-full border-1 border-[#D9D9D9] rounded focus:outline-none focus:border-[#005AFF] px-1 h-9'
                    {...register("skill_name")}
                />
            </div>
            <div>
                <section className="flex items-center flex-wrap">
                    {
                        user?.skills &&
                        user?.skills.map((item: any) => (
                            <section key={item.id} className="skills-item">
                                <span>{item?.skill_name}</span>
                                <i className="skills-item__icon fa-solid fa-check"></i>
                                <i onClick={() => handleRemove({
                                    id: item.id,
                                    key: "skills"
                                })} className="skills-item__remove fa-regular fa-circle-xmark"
                                ></i>
                            </section>
                        ))
                    }
                </section>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}

export const FormMoreInfo = ({ onSubmit }: any) => {
    const { register, handleSubmit, reset } = useForm<any>()
    const user = getUser()

    useEffect(() => {
        reset(user)
    }, [user])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='py-3'>
                <textarea
                    className="border-[1px] border-[#D9D9D9] p-[8px] w-100 focus:outline-none" cols={30} rows={5}
                    placeholder={'Điền thông tin thêm nếu có'}
                    maxLength={5000}
                    {...register("more_info")}
                ></textarea>
            </div>
            <div className='flex items-center justify-end gap-x-2 mt-2'>
                <button className='bg-[#ff7d55] text-white font-[700] rounded-[6px] min-w-[80px] py-[8px]'>Lưu</button>
            </div>
        </form>
    )
}