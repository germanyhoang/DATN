import { useAppDispatch, useAppSelector } from '../../../app/hook'
import type { ColumnsType } from 'antd/es/table';
import { NavLink, useNavigate } from 'react-router-dom';
import { Popconfirm, Table } from 'antd';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import {
    minusProductCart,
    nusProductCart,
    removeProductCart
} from '../../../app/actions/package';
import { useGetOrdersByUIdQuery } from '../../../service/employer/order';
import { useCreateOrderMutation } from '../../../service/employer/order';
import IOrder from '../../../interface/employer/order';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import React from 'react';

const Cart = (): any => {
    const dispatch: any = useAppDispatch()
    const navigate = useNavigate()
    const text: string = 'Bạn có muốn xóa gói khỏi giỏ hàng ?'

    const onHandleRemove = (id: string) => {
        dispatch(removeProductCart(id))
    }

    const decrease = (id: string) => {
        dispatch(minusProductCart(id))
    }

    const increase = (id: string) => {
        dispatch(nusProductCart(id))
    }

    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const data: any = useGetUserEprByEmailQuery(email)
    console.log(data);
    
    const user: any = data.currentData
    const { data: orders } = useGetOrdersByUIdQuery<any>(user?._id)

    //Create order code
    const min = 1;
    const max = 1000;
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    const code = characters.charAt(Math.floor(Math.random() * charactersLength)) + rand

    interface DataType {
        key: React.Key;
        product: {
            _id: string;
            package_name: string;
            package_code: string;
            package_desc: string;
            package_price: number;
            package_day: number;
            status: boolean;
        };
        orderCount: number;
    }
    const dataSource: DataType[] = useAppSelector((item: any) => item.cart)

    const columns: ColumnsType<DataType> = [
        {
            title: 'TÊN DỊCH VỤ',
            dataIndex: 'package_name',
            key: 'package_name',
            render: (_: any, record: DataType) => (
                <>
                    <p className='m-0'>{record.product.package_name}</p>
                </>
            ),
        },
        Table.EXPAND_COLUMN,
        {
            title: 'ĐƠN GIÁ',
            dataIndex: 'package_price',
            key: 'package_price',
            render: (_: any, record: DataType) => (
                <p>{record.product.package_price}</p>
            ),
        },
        {
            title: 'SỐ LƯỢNG',
            dataIndex: 'orderCount',
            key: 'orderCount',
            render: (_: any, record: DataType) => (
                <div className='flex items-center h-100'>
                    <button onClick={() => decrease(record.product._id)} className={'cursor-not-allowed'} disabled={record.orderCount === 1 ? true : false}>
                        <MinusOutlined />
                    </button>
                    <div className='px-2'>{record.orderCount}</div>
                    <button onClick={() => increase(record.product._id)}>
                        <PlusOutlined />
                    </button>
                </div>
            ),
        },
        {
            title: 'SỐ TIỀN',
            dataIndex: 'total',
            key: 'total',
            render: (_, record) => (
                <p>{(record.product.package_price * record.orderCount)}</p>
            ),
        },
        {
            title: 'THAO TÁC',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Popconfirm placement="top"
                    title={text}
                    onConfirm={() => onHandleRemove(record.product._id)}
                    okText="Có"
                    cancelText="Không">
                    <DeleteOutlined className='text-danger' />
                </Popconfirm>
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState<DataType[]>([]);
    let total: number = 0
    for (let i = 0; i < selectedRowKeys.length; i++) {
        total += ((selectedRowKeys[i].product.package_price) * selectedRowKeys[i].orderCount)
    }
    const totalVat: number = total * (10 / 100)

    const [createOrder] = useCreateOrderMutation<IOrder>()
    const handleCreateOrder = (orders: DataType[] | []) => {
        try {
            for (let i = 0; i < orders.length; i++) {
                const addOrder: any = createOrder({
                    order_name: orders[i].product.package_name,
                    order_status: false,
                    order_count: orders[i].orderCount,
                    order_price: orders[i].product.package_price,
                    order_code: code,
                    user_id: user?._id,
                    package_id: orders[i].product._id
                })
                if (addOrder) {
                    dispatch(removeProductCart(orders[i].product._id))
                }
            }
            navigate('/home/orders')
        } catch (error) {
            console.log(error);

        }

    }

    const [isChecked, setIsChecked] = useState(true)
    const handleConfirm = () => {
        setIsChecked(!isChecked)
    }

    if (isLoggedIn == false) {
        return navigate('/login')
    }

    return (
        <>
            <div className='min-h-screen bg-white px-10 max-w-100 space-y-2'>
                <ul className='flex items-center space-x-1 py-2 mb-3 border-b-2'>
                    <li className='border-1 rounded-full px-[10px] bg-[#FF7D55]'>
                        <NavLink to={'/home/cart'} className='text-white'>Giỏ hàng({dataSource.length})</NavLink>
                    </li>
                    <li className='border-1 rounded-full px-[10px] bg-[#C2C2C2]'>
                        <NavLink to={'/home/orders'} className='text-white'>Đơn hàng của tôi({orders?.length})</NavLink>
                    </li>
                </ul>
                <div className='flex items-start space-x-5'>
                    <main className='w-[70%]'>
                        <h2 className='text-[23px]'>Xem giỏ hàng & Thanh toán</h2>
                        <div>
                            <Table columns={columns}
                                rowSelection={{
                                    type: 'checkbox',
                                    onSelect: (record: any, selected: any) => {
                                        const pack: any = selectedRowKeys.filter((item: any) => item.product._id !== record.product._id)
                                        selected ? setSelectedRowKeys([
                                            ...selectedRowKeys,
                                            record
                                        ]) : setSelectedRowKeys(pack);
                                    },
                                    // onSelectAll: () => {

                                    // }
                                }}
                                expandable={{
                                    expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.product.package_desc}</p>,
                                }}
                                dataSource={dataSource}
                            />
                        </div>
                    </main>
                    <aside className='w-[30%]'>
                        <div className='border-1 rounded'>
                            <div className='p-3 bg-[#FAFAFA]'>
                                <h3 className="text-[17px]">
                                    THÔNG TIN ĐƠN HÀNG
                                </h3>
                            </div>
                            <div>
                                <div className='px-3 py-2 flex jitems-center justify-between border-b'>
                                    <label className='m-0'>Tổng giá trị đơn hàng: </label>
                                    <span className='font-[700]'>{total} VND</span>
                                </div>
                                <div className='px-3 py-2 flex jitems-center justify-between border-b'>
                                    <label className='m-0'>Tổng tiền chưa bao gồm VAT: </label>
                                    <span className='font-[700]'>{total} VND</span>
                                </div>
                                <div className='px-3 py-2 flex jitems-center justify-between border-b'>
                                    <label className='m-0'>VAT (10%): </label>
                                    <span className='font-[700]'>{totalVat} VND</span>
                                </div>
                                <div className='px-3 py-2 border-b space-x-2'>
                                    <label className='m-0'>Mã ưu đãi: </label>
                                    <span className='border-1 border-[#FD6333] text-[#FD6333] rounded p-[5px]'>Chọn mã ưu đãi</span>
                                </div>
                                <div className='px-3 py-2 flex items-center justify-between'>
                                    <label className='m-0 font-[700]'>Tổng số tiền thanh toán: </label>
                                    <span className='font-[700] text-[#FD6333] text-[19px]'>{total + totalVat} VND</span>
                                </div>
                            </div>
                            <div>
                                <div className='px-3 py-2 flex items-center space-x-2'>
                                    <input type="checkbox" onChange={handleConfirm} />
                                    <span>Tôi đồng ý với <span className='text-[#004AD1]'>Điều khoản dịch vụ</span> của công ty.</span>
                                </div>
                                <div className='px-3 pt-3 pb-4 py-2'>
                                    <button
                                        onClick={() => handleCreateOrder(selectedRowKeys)}
                                        disabled={isChecked}
                                        className={isChecked || selectedRowKeys.length == 0 ? 'bg-[#FD6333] text-white w-full p-1 rounded opacity-50' : 'bg-[#FD6333] text-white w-full p-1 rounded'}>
                                        Tạo đơn hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default Cart