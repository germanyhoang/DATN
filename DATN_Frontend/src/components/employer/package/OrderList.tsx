import { Alert, Button, Input, InputRef, Popconfirm, Space, Spin, Table, Tag, message } from 'antd'
import type { ColumnsType, TableProps, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface'
import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    SearchOutlined,
    EyeOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {
    useGetOrdersByUIdQuery,
    useRemoveOrderMutation
} from '../../../service/employer/order';
import { useAppSelector } from '../../../app/hook';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import React from 'react';

const OrderList: any = () => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
    const text: string = 'Are you sure to delete this order?'
    const navigate = useNavigate()

    const { email, isLoggedIn } = useAppSelector((rs: any) => rs.authEmpr)
    const data: any = useGetUserEprByEmailQuery(email)
    const user: any = data.currentData
    const { data: orders, error, isLoading } = useGetOrdersByUIdQuery<any>(user?._id)
    console.log(orders);

    const [removeOrder] = useRemoveOrderMutation()
    interface DataType {
        key: React.Key
        product: {
            _id: string;
            package_name: string;
            package_code: string;
            package_desc: string;
            package_price: number;
            package_day: number
        };
        orderCount: number;
    }

    useEffect(() => {
        orders?.forEach((order: any | {}) => {
            const paymentTerm = new Date(order?.createdAt)
            const today = new Date()
            paymentTerm.setDate(paymentTerm.getDate() + 1)

            if (paymentTerm.getTime() < today.getTime()) {
                removeOrder(order._id)
            }
        });
    }, [orders])

    const dataSource: DataType[] = useAppSelector((item: any) => item.cart)

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: any,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const onHandleRemove = (id: string) => {
        const deleteOrder: any = removeOrder(id)
        if (deleteOrder) {
            message.info('Xóa thành công!')
        }
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'order_name',
            key: 'order_name',
            ...getColumnSearchProps('order_name'),
        },
        {
            title: 'Đơn giá',
            dataIndex: 'order_price',
            key: 'order_price',
        },
        {
            title: 'Số lượng',
            dataIndex: 'order_count',
            key: 'order_count',
        },
        {
            title: 'Số tiền',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => (
                <p>{(record.order_price * record.order_count)}</p>
            ),
        },
        {
            title: 'Ngày tạo đơn',
            dataIndex: 'createdAt',
            render: (_, record) => (
                <p>{(new Date(record.createdAt)).toLocaleDateString()}</p>
            ),

        },
        {
            title: 'Trạng thái',
            dataIndex: 'order_status',
            render: (_, record) => (
                <>
                    {
                        <Tag
                            color={record.order_status ? "green" : "gold"}
                            key={record.order_status ? "Đã thanh toán" : "Đang chờ thanh toán"}>
                            {record.order_status ? "Đã thanh toán" : "Đang chờ thanh toán"}
                        </Tag>
                    }
                </>
            ),
        },
        {
            title: 'Hành động',
            dataIndex: '_id',
            key: '_id',
            render: (_, record) => (
                <Space size="middle">
                    <NavLink to={`/home/orders/${record._id}/detail`}>
                        <EyeOutlined className='text-dark' />
                    </NavLink>
                    <Popconfirm placement="top"
                        title={text}
                        onConfirm={() => onHandleRemove(record._id)}
                        okText="Yes"
                        cancelText="No">
                        <DeleteOutlined className='text-danger' />
                    </Popconfirm>

                </Space>
            ),
        },
    ];

    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    if (isLoggedIn == false) {
        return navigate('/login-epr')
    }

    if (isLoading) {
        return <Space className='mt-16' direction="vertical" style={{ width: '100%' }}>
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    }
    if (error) {
        return <Space className='mt-16' direction="vertical" style={{ width: '100%' }}>
            <Alert message="Error!!!" type="error" />
        </Space>
    }

    return (
        <div className='min-h-screen bg-white px-10 max-w-100 space-y-2'>
            <ul className='flex items-center space-x-1 py-2 mb-3 border-b-2'>
                <li className='border-1 rounded-full px-[10px] bg-[#C2C2C2]'>
                    <NavLink to={'/home/cart'} className='text-white'>Giỏ hàng({dataSource.length})</NavLink>
                </li>
                <li className='border-1 rounded-full px-[10px] bg-[#FF7D55]'>
                    <NavLink to={'/home/orders'} className='text-white'>Đơn hàng của tôi({orders.length})</NavLink>
                </li>
            </ul>
            <div className='flex items-start space-x-5'>
                <main className='w-[70%]'>
                    <h2 className='text-[23px]'>Đơn hàng của tôi</h2>
                    <div>
                        <Table columns={columns}
                            dataSource={orders}
                            onChange={onChange} />
                    </div>
                </main>
                <aside className='w-[30%]'>
                    <div className='border-1 shadow p-[30px]'>
                        <h3 className='text-lg font-[550] m-0'>ĐẶT HÀNG TRỰC TUYẾN</h3>
                        <p className='m-0'>Chọn dịch vụ phù hợp với nhu cầu và đặt mua trực tuyến</p>
                        <button className='bg-[#FF7D55] text-white border-1 rounded px-2 py-1'>Mua ngay!</button>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default OrderList