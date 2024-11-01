import { useState, useEffect } from 'react'
import { Form, Input, InputNumber, message, Select,Checkbox, Space} from 'antd'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useGetPostQuery, useEditPostMutation } from '../../../service/post';
import { apiGetProvinces } from '../../../service/api'
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer'
import { useAppSelector } from '../../../app/hook';
import { useGetCareersQuery } from '../../../service/admin'

const PostEdit = (): any => {
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: career, error, isLoading } = useGetCareersQuery()
    const [form] = Form.useForm();    
    const { data: post } = useGetPostQuery(id as string);
    form.setFieldsValue(post);
    const [editPost] = useEditPostMutation()
    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const data: any = useGetUserEprByEmailQuery(email)
    const user: any = data.currentData
    const [provinces, setProvinces] = useState<any>([])
    useEffect(() => {
        const fetchProvinces = async () => {
            const { data: response }: any = await apiGetProvinces()
            setProvinces(response?.results);
        }
        fetchProvinces()
    }, [])

    const onHandleEdit = (postForm: any) => {
        try {
            editPost({
                ...postForm,
                user_id: user?._id,
                email: user?.email,
                post_status: null,
                _id: id
            })
            message.success('Sửa thành công.')
            navigate('/home/posts')
        } catch (error) {

        }
    }

    const onChange = (e: any) => {
        form.setFieldsValue({
            min_job_salary : 0,
            max_job_salary : 0,
            offer_salary : e.target.checked
        })    
      };    
    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
        <div className='mt-4 w-100'>
            <div
                className='relative pb-[32px] mb-[24px]'
            >
                <h1 className='post-add_title text-center text-3xl font-bold text-[#44454A]'>Đăng tin</h1>
            </div>
            <Form 
                 onFinish={onHandleEdit}
                form={form} 
                layout="vertical"
            >
                <div className='max-w-[70%] mx-auto'>
                    <div className='d-flex align-items-top'>
                        <div className='w-100 ms-3'>
                            <div className='fs-4 font-[600]'>Việc cần tuyển</div>
                            <Form.Item name="job_name" label="Tên công việc cần tuyển"
                                rules={[
                                    { required: true, message: "Vui lòng nhập thông tin công việc" },
                                ]}>
                                <Input 
                                    placeholder='VD: Dịch vụ dọn dẹp' 
                                    size='large' 
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='d-flex align-items-top'>
                        <div className='w-100 ms-3'>
                            <div className='fs-4 font-[600]'>Thông tin về yêu cầu tuyển dụng</div>
                            <Form.Item name="job_description" label="Mô tả công việc"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập thông tin công việc' },
                                    { min: 10, message: 'Vui lòng nhập ít nhất 10 ký tự' }
                                ]}>
                                <Input.TextArea rows={7} placeholder='Nhập mô tả công việc' />
                            </Form.Item>
                            <Form.Item name="requirements" label="Yêu cầu tuyển dụng"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập thông tin công việc' },
                                    { min: 10, message: 'Vui lòng nhập ít nhất 10 ký tự' }
                                ]}>
                                <Input.TextArea rows={7} placeholder='Nhập yêu cầu tuyển dụng' />
                            </Form.Item>
                            <Space.Compact 
                                block
                                size="large"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Form.Item 
                                    name="working_form" 
                                    label="Hình thức làm việc"
                                    rules={[{ required: true, message: 'Please choose working form.' }]}
                                    initialValue={'0'}
                                    style={{
                                        width: '100%',
                                    }}
                                >
                                    <Select 
                                        size='large'
                                    >
                                        <Select.Option value="0">- Chọn hình thức làm việc -</Select.Option>
                                            <Select.Option value="Tất cả loại hình">Tất cả loại hình</Select.Option>
                                            <Select.Option value="Toàn thời gian">Toàn thời gian</Select.Option>
                                            <Select.Option value="Bán thời gian">Bán thời gian</Select.Option>
                                            <Select.Option value="Thực tập">Thực tập</Select.Option>
                                            <Select.Option value="Việc làm online">Việc làm online</Select.Option>
                                            <Select.Option value="Nghề tự do">Nghề tự do</Select.Option>
                                            <Select.Option value="Làm việc theo giờ linh hoạt">Làm việc theo giờ linh hoạt</Select.Option>
                                            <Select.Option value="Làm việc theo dự án">Làm việc theo dự án</Select.Option>
                                            <Select.Option value="Hợp đồng thời vụ">Hợp đồng thời vụ</Select.Option>
                                            <Select.Option value="Làm việc không chính thức (Freelance)">Làm việc không chính thức (Freelance)</Select.Option>
                                            <Select.Option value="Khác">Khác</Select.Option>
                                        
                                    </Select>
                                </Form.Item>
                                <Form.Item 
                                    name="level" 
                                    label="Cấp bậc"
                                    rules={[{ required: true, message: 'Please choose level.' }]}
                                    initialValue={'0'}
                                    style={{
                                        width: '100%',
                                        marginLeft: '24px',
                                    }}
                                >
                                    <Select 
                                        size='large'
                                    >
                                        <Select.Option value="0">Chọn cấp bậc</Select.Option>
                                        <Select.Option value="Tất cả cấp bậc">Tất cả cấp bậc</Select.Option>
                                        <Select.Option value="Thực tập sinh/Sinh viên">Thực tập sinh/Sinh viên</Select.Option>
                                        <Select.Option value="Mới tốt nghiệp">Mới tốt nghiệp</Select.Option>
                                        <Select.Option value="Nhân viên">Nhân viên</Select.Option>
                                        <Select.Option value="Trưởng phòng">Trưởng phòng</Select.Option>
                                        <Select.Option value="Giám Đốc và Cấp Cao Hơn">Giám Đốc và Cấp Cao Hơn</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Space.Compact>
                            <Form.Item 
                                name="gender" 
                                label="Giới tính"
                                rules={[{ required: true, message: 'This field is required.' }]}
                                initialValue={'0'}
                            >
                                <Select size='large'>
                                    <Select.Option value="0">- Chọn giới tính -</Select.Option>
                                    <Select.Option value="nam">Nam</Select.Option>
                                    <Select.Option value="nữ">Nữ</Select.Option>
                                    <Select.Option value="Không yêu cầu">Không yêu cầu</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name="number_of_recruits" label="Số lượng"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập giá trị số' },
                                    { type: 'number', message: 'Vui lòng nhập giá trị số' }
                                ]}>
                                <InputNumber
                                        min={1} 
                                        style={{ width: '100%' }} 
                                        size='large' 
                                    />
                            </Form.Item>
                            <Form.Item name="career" label="Ngành Nghề"
                                rules={[{ required: true, message: 'Vui lòng chọn ngành nghề' }]}
                            >
                                <Select 
                                    size='large' 
                                    allowClear
                                    placeholder='Chọn ngành nghề'
                                >
                                    {
                                        career ? career?.map((item: any, index: any) =>
                                            <Select.Option key={index} value={item._id}>{item.name}</Select.Option>
                                        ) : ''
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item 
                                name="work_location" 
                                label="Khu vực"
                                rules={[{ required: true, message: 'Vui lòng nhập địa điểm làm việc' }]}
                            >
                                {/* <Input /> */}
                                <Select 
                                    size='large'
                                    mode='multiple'
                                    allowClear
                                    placeholder='Chọn khu vực'
                                >
                                    {
                                        provinces ? provinces?.map((province: any, index: number) =>
                                            <Select.Option 
                                                key={index} 
                                                value={province.province_name}
                                            >
                                                {province.province_name}
                                            </Select.Option>
                                        ) : ''
                                    }

                                </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div className='d-flex align-items-top'>
                        <div className='w-100 ms-3'>
                            <div className='fs-4 font-[600]'>Ngân sách dự kiến</div>
                            <Space 
                                style={{
                                    width: '100%',
                                    marginTop: '12px'
                                }}
                            >
                                <Form.Item 
                                    name="min_job_salary" 
                                    style={{
                                        width: '300px',
                                    }}
                                    dependencies={['max_job_salary','offer_salary']}
                                    rules={[
                                        { required: true, message: 'Vui lòng nhập giá trị số.' },
                                        { type: 'number', message: 'Vui lòng nhập giá trị số' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                              if (!getFieldValue('max_job_salary') && !value && !getFieldValue('offer_salary')) {
                                                return Promise.reject(new Error('Lương tối thiểu hoặc tối đa không được để trống.'));
                                              }
                                              else  if (value && getFieldValue('offer_salary')) {
                                                return Promise.reject(new Error('Vui lòng để trống lương khi chọn thương lượng.'));
                                              }
                                              return Promise.resolve();
                                            },
                                          }),
                                          ({ getFieldValue }) => ({
                                            validator(_, value) {
                                              if (!value || !getFieldValue('max_job_salary') || getFieldValue('max_job_salary') > value) {
                                                return Promise.resolve();
                                              }
                                              return Promise.reject(new Error('Lương tối thiểu không được lớn hơn lương tối đa.'));
                                            },
                                          }),
                                     ]}
                                >
                                    <InputNumber
                                        min={0}
                                        style={{ width: '300px' }} 
                                        size='large' 
                                        placeholder='Tối thiểu'
                                    />
                                </Form.Item>
                                <Form.Item
                                   
                                    name="max_job_salary" 
                                    style={{
                                        width: '300px',
                                        marginLeft: '24px',
                                    }}
                                    dependencies={['min_job_salary','offer_salary']}
                                    rules={[
                                       { required: true, message: 'Vui lòng nhập giá trị số.' },
                                       { type: 'number', message: 'Vui lòng nhập giá trị số' },
                                       ({ getFieldValue }) => ({
                                        validator(_, value) {
                                          if (!getFieldValue('min_job_salary') && !value && !getFieldValue('offer_salary')) {
                                            return Promise.reject(new Error('Lương tối thiểu hoặc tối đa không được để trống.'));
                                          }
                                          else  if (value && getFieldValue('offer_salary')) {
                                            return Promise.reject(new Error('Vui lòng để trống lương khi chọn thương lượng.'));
                                          }
                                          return Promise.resolve();
                                        },
                                      }),
                                      ({ getFieldValue }) => ({
                                        validator(_, value) {

                                          if (!value || !getFieldValue('min_job_salary') || getFieldValue('min_job_salary') < value) {
                                            return Promise.resolve();
                                          }
                                          return Promise.reject(new Error('Lương tối đa không thể thấp hơn lương tối thiểu.'));
                                        },
                                      }),
                                    ]}
                                >
                                    <InputNumber
                                        min={0} 
                                        style={{ width: '100%' }} 
                                        size='large' 
                                        placeholder='Tối đa'
                                    />
                                </Form.Item>
                                <Form.Item
                                name='offer_salary'
                                dependencies={['min_job_salary',',max_job_salary']}
                                valuePropName="checked"
                                    style={{
                                        width: '300px',
                                        marginLeft: '24px',
                                        fontSize: 24
                                    }}
                                >
                                    <Checkbox  onChange={onChange}>Thương lượng</Checkbox>
                                </Form.Item>
                            </Space>    
                        </div>
                    </div>
                </div>
                <div className='text-center sticky bottom-0 bg-white border-t-2 py-3'>
                    <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white text-[16px] py-1 px-6 rounded' type="submit">
                        Đăng
                    </button>
                    <NavLink to={'/home/posts'}>
                        <button
                            className='text-[#838383] hover:text-[#FE7D55] border-1 border-[#686868] hover:border-[#FE7D55] ms-4 py-1 px-6 rounded' 
                            type="button"
                        >
                            Quay lại
                        </button>
                    </NavLink>
                </div>
            </Form>
  </div>
</>
    )
}

export default PostEdit