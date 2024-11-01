import React, { useState } from 'react'
import { BookOutlined, MoneyCollectOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import ICareer from '../../../interface/admin/career';
import { SubmitHandler } from 'react-hook-form/dist/types';
import { useAddCareerMutation } from '../../../service/admin';
import axios from 'axios';


type Props = {}

const CareerAdd = () => {
    const [url, setUrl] = useState("");
    const setting = {
        name: "file",
        beforeUpload: (file : any) => {
          const accept = ["image/png", "image/jpeg", "image/jpg"];
    
          if (file.size > 1024 * 1024 * 2) {
            message.error(`file quá lớn`);
            return Upload.LIST_IGNORE;
          } else if (!accept.includes(file.type)) {
            message.error(`không đúng định dạng ảnh (png,jpeg,jpg)`);
            return Upload.LIST_IGNORE;
          }
        },
        listType: 'picture-card' as 'picture-card', 
        maxCount: 1,
        // onDrop: true,
      };
    const [imageIcon,setImageIcon] = useState("")
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [addCareer] = useAddCareerMutation()
    const uploadImage = async (options : any) => {
        const { onSuccess, onError, file } = options;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ypnhyinn");
        try {
            const uploadCloudinary = (data : any ) => {
                const url = `https://api.cloudinary.com/v1_1/ecma/image/upload`;
              
                const header = {
                  "Content-Type": "application/x-www-formendcoded",
                };
                return axios.post(url, data);
              };
          const res = await uploadCloudinary(formData);
          message.success("Tải hình ảnh lên thành công!");
          setUrl(res.data.secure_url);  
        } catch (err) {
          onError({ err });
        }
      };
    const onHandleAdd: SubmitHandler<ICareer> = (career: ICareer) => {
       
      try {
        if (url) {
            addCareer({
                name: career.name,
                image: url, 
            });
            message.success('Tạo chuyên ngành thành công.');
            navigate('/admin/careers');
        } else {
            message.error('Vui lòng thêm icon');
        }
    } catch (error) {
        message.error('Có lỗi xảy ra');
    }
    }
    return (
        <>
          <div style={{ maxWidth: '800px' }} className='mx-10'>
                <h1 className='mb-3 text-center fw-normal'>Tạo chuyên ngành mới</h1>
                <Form onFinish={onHandleAdd} form={form} name="add" layout="vertical">

                    <div className='d-flex align-items-top'>
                        <div className='w-100 ms-3'>
                            <div className='fs-4'>Tên chuyên ngành</div>
                            <Form.Item name="name" label="Tên ngành nghề"
                                rules={[
                                    { required: true, message: "Vui lòng nhập tên chuyên ngành." },
                                ]}>
                                <Input />
                            </Form.Item>
                            <Form.Item label="Icon"
                            valuePropName="fileList"          
                            rules={[
                                { required: true, message: "Vui lòng chọn icon ngành nghề." },
                            ]}>
                <Upload.Dragger {...setting} customRequest={uploadImage}>
                <p className="ant-upload-drag-icon h-[15px]">
                </p>
                <p className="ant-upload-text">
                  Nhấn để tải ảnh lên
                </p>
              </Upload.Dragger>
                            </Form.Item>
                            <Form.Item>
                                <img width={250} src={url} alt="" />
                            </Form.Item>
                        </div>
                    </div>

                    <Form.Item className='text-center'>
                        <Button className='bg-success text-white' htmlType="submit">
                            Tạo
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

export default CareerAdd