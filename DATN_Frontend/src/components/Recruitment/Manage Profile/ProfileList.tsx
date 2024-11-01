import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { NavLink } from 'react-router-dom';
import { Alert, message, Popconfirm, Spin, Tag } from 'antd';
import { Space, Table } from 'antd';
import { useRef, useState } from 'react';
import { CheckOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useGetProfilesQuery, useRemoveProfileMutation } from '../../../service/manage_profile';
import { MessageType } from 'antd/es/message/interface';
import { useRefuseProfileMutation, useApproveProfileMutation } from '../../../service/manage_profile';
import { useGetCvsQuery } from '../../../service/manage_cv';
import React from 'react';

type Props = {}
const ProfileList = () => {
    const { data: cvs, error, isLoading } = useGetCvsQuery()
    const remove = 'Bạn có muốn xoá hồ sơ này?';
    const approve = 'Bạn có phê duyệt hồ sơ này?';
    const reject = "Bạn có muốn từ chối hồ sơ này?"
    const [removeProfile] = useRemoveProfileMutation()

    const [duyet] = useRefuseProfileMutation()
    const onHandleApprove = (id: string) => {
        console.log(id);
        const confirm: MessageType = message.info('Duyệt thành công')
        if (confirm !== null) {
            duyet(id)
        }
    }

    const [tuchoi] = useRefuseProfileMutation()
    const onHandleRefuse = (id: string) => {
        console.log(id);
        const confirm: MessageType = message.info('Từ chối thành công')
        if (confirm !== null) {
            tuchoi(id)
        }
    }

    const onHandleRemove = (id: string) => {
        console.log(id);
        const confirm: MessageType = message.info('Xoá thành công')
        if (confirm !== null) {
            removeProfile(id)
        }
    }


    const columns: ColumnsType<any> = [
        {
            title: 'Ứng viên',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'time',
        },
        {
            title: 'Việc làm đã nộp',
            dataIndex: 'working',
        },
        {
            title: 'Lời nhắn',
            dataIndex: 'note',
        },
        {
            title: 'Ngày nộp',
            dataIndex: 'time',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (_, record) => (
                <>
                    {
                        record.status == null ? <p>Đang chờ duyệt</p>
                            :
                            <Tag
                                color={record.status ? "green" : "red"}
                                key={record.status ? "Đã duyệt" : "Từ chối"}>
                                {record.status ? "Đã duyệt" : "Từ chối"}
                            </Tag>
                    }
                </>
            ),
            filters: [
                {
                    text: 'Đã duyệt',
                    value: true,
                },
                {
                    text: 'Từ Chối',
                    value: false,
                },
            ],
            onFilter: (value: any, record) => record.post_status.indexOf(value) === 0,
        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <Space size="middle">

                    <Popconfirm placement="top"
                        title={reject}
                        onConfirm={() => onHandleRefuse(record._id)}
                        okText="Đồng ý"
                        cancelText="Không">
                        <CloseOutlined className='text-dark' />
                    </Popconfirm>

                    <Popconfirm placement="top"
                        title={approve}
                        onConfirm={() => onHandleApprove(record._id)}
                        okText="Đồng ý"
                        cancelText="Không">
                        <CheckOutlined className='text-success' />
                    </Popconfirm>

                    <Popconfirm placement="top"
                        title={remove}
                        onConfirm={() => onHandleRemove(record._id)}
                        okText="Đồng ý"
                        cancelText="Không">
                        <DeleteOutlined className='text-danger' />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    if (isLoading)
        return <Space direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    if (error)
        return <Space direction="vertical" style={{ width: '100%' }}>
            <Alert message="Error!!!" type="error" />
        </Space>
    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2'>
                <div>
                    <h2 className='mt-0'>Quản lý hồ sơ ứng tuyển</h2>
                </div>
            </div>
            <Table columns={columns} dataSource={cvs} onChange={onChange} />
        </>
    )
}
export default ProfileList