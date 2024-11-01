import { Popconfirm, Table, Tag, message } from 'antd'
import type { ColumnsType } from 'antd/es/table';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetOrderQuery, useRemoveOrderMutation,useVnPayCheckoutMutation } from '../../../service/employer/order';
import { DownOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react';
import IProfileEpr from '../../../interface/employer/profileEpr';
import { useGetEprProfileQuery } from '../../../service/employer/profileEpr';
import { useAppSelector } from '../../../app/hook';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import axios from 'axios';
import { formatCurrency } from '../../../utils/hooks/FormatCurrrency';
import { convertDaysToMonths } from '../../../utils/hooks/ConvertMonth';

const OrderDetail = (): any => {
    const { id } = useParams();
   
    const navigate = useNavigate()
    const { email, isLoggedIn } = useAppSelector((rs) => rs.authEmpr)
    const { data: user } = useGetUserEprByEmailQuery<any>(email)
    const { data: order } = useGetOrderQuery<any>(id)

    interface dataType {
        _id: string;
        order_name: string;
        order_price: number;
    }

    let orders: dataType[] = []
    if (order) {
        orders.push(order)
    }

    const columns: ColumnsType<dataType> = [
        {
            title: 'TÊN DỊCH VỤ',
            dataIndex: 'order_name',
            key: 'order_name',
        },
        {
            title: 'THỜI HAN',
            dataIndex: 'package_id',
            key: 'package_id',
            render: (_, record: any) => (
                <span>{`${convertDaysToMonths(record.package_id.package_day)}`}</span>
            ),
        },
        {
            title: 'SỐ TIỀN',
            dataIndex: 'order_price',
            key: 'order_price',
            render: (_, record: any) => (
                <span>{formatCurrency(record.order_price)}</span>
            ),
        },
    ];

    const total = order?.order_price * order?.order_count
    const totalVat = total * (10 / 100)

    const [removeOrder] = useRemoveOrderMutation();
    const [vnPayCheckout] = useVnPayCheckoutMutation()
    const text: string = 'Xác nhận hủy đơn hàng?'

    const handleRemoveOrder = (id: string) => {
        const deleteOrder: any = removeOrder(id)
        if (deleteOrder) {
            message.info("Hủy thành công!")
            navigate('/home/orders')
        }
    }
    
    const VNPayCheckout = async (amount: number, orderId: string) => {
        const body = {
            amount,
            orderId
        };
    
        try {
            const response = await vnPayCheckout(body);
            // Kiểm tra xem response có phải là { data: unknown } không
            if ('data' in response) {
                const checkout = response as { data: { vnpUrl: string } };
                window.open(checkout.data.vnpUrl, 'vnpay', 'popup');
            } else {
                // Xử lý trường hợp lỗi nếu response không có thuộc tính data
                console.error('Phản hồi không chứa dữ liệu:', response);
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán VNPay:', error);
        }
    };
    
    const downloadQR = () => {
        const canvas: any = document.getElementById('qrcode');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log('pngUrl', pngUrl);
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'QRCode.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
            <div className='min-h-screen'>
                <div className='bg-white p-2 flex items-center space-x-4'>
                    <NavLink to={'/home/orders'} className='flex items-center space-x-1 bg-[#F3F4F6] py-[2px] px-2 rounded text-black'>
                        <ArrowLeftOutlined />
                        <span>Quay lại</span>
                    </NavLink>
                    <h2 className='text-xl'>Chi tiết đơn hàng</h2>
                </div>
                <div className='mx-20 flex items-center space-x-40 bg-white mt-3 border-l-[5px] border-[#004AD1] px-8 py-2 rounded-md'>
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className='m-0'>Mã đơn hàng: </label>
                            <span className='font-[700] text-[#004AD1]'>{order?._id}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <label className='m-0'>Người tạo đơn: </label>
                            <span className='font-[700]'>{user?.name}</span>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center space-x-2'>
                            <label className='m-0'>Ngày tạo đơn: </label>
                            <span className='font-[700]'>{(new Date(order?.createdAt)).toLocaleDateString()}</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <label className='m-0'>Trạng thái đơn hàng: </label>
                            <Tag
                                color={order?.order_status ? "green" : "gold"}
                                key={order?.order_status ? "Đã thanh toán" : "Chờ thanh toán"}>
                                {order?.order_status ? "Đã thanh toán" : "Chờ thanh toán"}
                            </Tag>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className='mx-20 max-w-100 flex items-start space-x-3 mt-3'>
                    <main className='w-[70%] p-3 bg-white border-1 rounded-md'>
                        <h2 className='text-[19px] pb-4 pt-1'>Thông tin đơn hàng</h2>
                        <div className='mb-3'>
                            <Table
                                columns={columns}
                                dataSource={orders}
                                pagination={false} />

                        </div>
                        <div className='border-1 rounded py-3'>
                            <div className='px-4 border-b-[1px]'>
                                <div className='pb-[7px] flex items-center justify-between'>
                                    <label>Giá trị đơn hàng: </label>
                                    <span className='font-[700]'>{formatCurrency(order?.order_price)} VND</span>
                                </div>
                            </div>
                            <div className='px-4 pt-2'>
                                <div className='py-[7px] flex items-center justify-between'>
                                    <label>Giảm giá</label>
                                    <span className='font-[700]'>{formatCurrency(0)} VND</span>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <label className='font-[700]'>Tổng số tiền thành toán: </label>
                                    <span className='font-[700] text-[#004AD1] text-[18px]'>{formatCurrency(order?.order_price)} VND</span>
                                </div>
                            </div>
                        </div>
                        <Popconfirm placement="top"
                            title={text}
                            className="border-1 border-[#FD6333] text-[#FD6333] py-1 px-2 rounded mt-4 hover:bg-[#FD6333] hover:text-white"
                            onConfirm={() => handleRemoveOrder(order._id)}
                            okText="Yes"
                            cancelText="No">
                            <button>Hủy đơn hàng</button>
                        </Popconfirm>
                        <button onClick={() => VNPayCheckout(order?.order_price,order._id)} className="border-1 border-[#004ad1] text-[#004ad1] ml-4 py-1 px-2 rounded mt-4 hover:bg-[#004ad1] hover:text-white">Thanh toán bằng VNPAY</button>
                    </main>
                    <aside className='w-[30%] p-3 bg-white border-1 rounded-md'>
                        <div className='flex justify-center'>
                            <img width={80} height={80}
                                src='https://res.cloudinary.com/dmp0fiboh/image/upload/v1681754635/logo_hy0scv.png' />
                        </div>
                        <div className='space-y-1 px-1'>
                            <div className='flex items-center space-x-2'>
                                <label className="m-0">Tên chủ TK: </label>
                                <span className='font-[550]'>CÔNG TY ABC</span>
                            </div>
                            <div className='flex items-center space-x-2'>
                                <label className="m-0">Số TK: </label>
                                <span className='font-[700]'>0123456789</span>
                            </div>
                            <div>
                                <p>Ngân hàng quân đội Việt Nam.</p>
                            </div>
                            <div className='text-[#E35E5A] text-center py-2'>
                                (Nhập chính xác giá trị đơn hàng)
                            </div>
                        </div>
                        <div className='flex justify-center text-center'>
                            <div>
                                <QRCode
                                    id='qrcode'
                                    value='https://www.facebook.com/dqv28'
                                    size={290}
                                    level={'H'}
                                    includeMargin={true}
                                />
                                <button onClick={downloadQR}> Download QR </button>
                            </div>

                        </div>
                        <div className='flex items-center justify-center space-x-1 my-2 cursor-pointer'>
                            <span>Hiện mã QR</span>
                            <DownOutlined />
                        </div>
                    </aside>
                </div>
            </div>
        </>
    )
}

export default OrderDetail