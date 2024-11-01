import React from 'react'
import { BookOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import { Button, Form, Input, InputNumber, Select, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import IAdmin_voucher from '../../../interface/admin_voucher';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useAddVoucherMutation } from '../../../service/admin_voucher';

const VoucherAdd = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [addVoucher] = useAddVoucherMutation()
    const onHandleAdd: any = (voucher: IAdmin_voucher) => {
        console.log({ ...voucher, status: true });
        try {
            addVoucher({ ...voucher, status: true })
            message.success('Tạo voucher thành công.')
            navigate('/admin/vouchers')
        } catch (error) { }
    }
    return (
        <>
            <div style={{ maxWidth: '800px' }} className='mx-[200px]'>
                <h3 className='mt-[90px] mb-3 text-center fw-normal'>Thêm gói dịch vụ mới</h3>
                <Form onFinish={onHandleAdd} form={form} name="add" layout="vertical">

                    <div  style={{ width: '800px' }}>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Tên gói</div>
                            <Form.Item name="package_name" label="Tên gói dịch vụ dành cho khách hàng"
                                rules={[
                                    { required: true, message: "Please input your name." },
                                ]}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div  style={{ width: '800px' }}>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Mô tả</div>
                            <Form.Item name="package_desc" label="Thông tin chi tiết về gói dịch vụ này"
                                rules={[
                                    { required: true, message: "Please input your description." },
                                ]}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>

                    <div  style={{ width: '800px' }}>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Giá</div>
                            <Form.Item name="package_price" label="Thông tin về giá tiền"
                                rules={[
                                    { required: true, message: "Please input your price." },
                                ]}>
                                <Input />
                            </Form.Item>
                        </div>
                    </div>
                    <div  style={{ width: '800px' }}>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Loại gói</div>
                            <Form.Item name="package_type" label="Loại gói"
                                rules={[
                                    { required: true, message: "Please input your package type." },
                                ]}>
                              <Select>
                                <Select.Option value="basic">Basic</Select.Option>
                                <Select.Option value="standard">Standard</Select.Option>
                                <Select.Option value="premium">Premium</Select.Option>
                            </Select>
                            </Form.Item>
                        </div>
                    </div>
                    <div  style={{ width: '800px' }}>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Thời gian hiệu lực</div>
                            <Form.Item name="package_day" label="Thời gian hiệu lực (Ngày)"
                                rules={[
                                    { required: true, message: "Please input your package day." },
                                ]}>
                                <InputNumber min={1} max={365} />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item className='text-center'>
                        <Button className='bg-success text-white' htmlType="submit">
                            Tạo
                        </Button>
                        <NavLink to={'/admin/vouchers'}>
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

export default VoucherAdd