import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Alert, Button, message, Popconfirm, Spin, Tag } from 'antd';
import { Space, Table } from 'antd';
import { useRef, useState } from 'react';
import { CheckOutlined, DeleteOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useGetServicesQuery, useRemoveServiceMutation } from '../../../service/employer/service';
import { MessageType } from 'antd/es/message/interface';
import { useAppSelector } from '../../../app/hook';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import React from 'react';
import moment from 'moment';

type Props = {}
const ServiceList = (): any => {
    const navigate = useNavigate()
    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const { data: user } = useGetUserEprByEmailQuery<any>(email)
    const { data: services, error, isLoading } = useGetServicesQuery(user?._id)
    // console.log(services)
    const remove = 'Bạn có muốn xoá gói dịch vụ này?';
    const [removeService] = useRemoveServiceMutation()
    let index = 0
    const onHandleRemove = (id: string) => {
        // console.log(id);
        const confirm: MessageType = message.success('Xoá thành công')
        if (confirm !== null) {
            removeService(id)
        }
    }

    const columns: ColumnsType<any> = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: () => { return index += 1 }
        },
        {
            title: 'Tên gói hiện tại',
            dataIndex: 'currentService',
        },
        {
            title: 'Loại gói',
            dataIndex: 'day',
            render: (_, record) => (
                <>
                    <div>{record?.serviceId?.package_type}</div>
                </>
            )
        },
        {
            title: 'Thời gian hiệu lực',
            dataIndex: 'day',
            render: (_, record) => (
                <>
                    <div>{`${moment(record.expireDay).format('DD/MM/YYYY')}`}</div>
                </>
            )
        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <Space size="middle">
                       <Link to="/home/packages">
                       <Button>Gia hạn</Button>
                       </Link>
                </Space>
            ),
        },
    ];

    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
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

    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
            <div className='min-h-screen'>
                <h2 className='px-3 text-2xl py-2'>Dịch vụ của tôi</h2>

                <Table columns={columns} dataSource={services} onChange={onChange} className='mx-3' />
            </div>

        </>
    )
}
export default ServiceList