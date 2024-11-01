import { Button, Form, Input, message, Select } from 'antd'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useGetCareerQuery, useEditCareerMutation } from '../../../service/admin';
import React, { useEffect } from 'react';
import ICareer from '../../../interface/admin/career';

const CareerEdit = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const { id } = useParams();
    const { data: career, isLoading } = useGetCareerQuery(id as string);
    useEffect(() => {
        if (career) {
            form.setFieldsValue(career);
        }
    }, [career, form]); 
    // console.log(career);

    const [editCareer] = useEditCareerMutation()
    const onHandleEdit = async (career: ICareer) => {
        try {
            // Kiểm tra xem `id` có tồn tại không
            if (id) {
                await editCareer({ ...career, status: false, _id: id });
                message.success('Sửa thành công.');
                navigate('/admin/careers');
            } else {
                message.error('ID không hợp lệ.');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra.');
        }
    };

    return (
        <>
            <div style={{ maxWidth: '700px', marginLeft: "30px" }}>
                <h1 className='text-center fw-normal text-[40px] mt-[67px]'>Chỉnh sửa thông tin ngành nghề</h1>
                <Form layout="vertical" onFinish={onHandleEdit} form={form} initialValues={career}>

                    <div className='d-flex align-items-top'>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Tên ngành nghề</div>
                            <Form.Item name="name" label="Tên ngành"
                                rules={[
                                    { required: true, message: "Please input your name." },
                                ]}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <Form.Item className='text-center'>
                        <Button className='bg-success text-white' htmlType="submit">
                            Sửa
                        </Button>
                        <NavLink to={'/admin/careers'}>
                            <Button className='bg-success text-white ms-2' htmlType="button">
                                Trở về
                            </Button>
                        </NavLink>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default CareerEdit