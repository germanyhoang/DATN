import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { Table, DatePicker } from 'antd';
import { useGetHistoryOrderQuery } from '../../../service/admin/chartLine';
import { Order } from '../../../interface/admin/order';
import { useGetUserByIdQuery } from '../../../service/admin';

const { MonthPicker } = DatePicker;

const OrderManagement = () => {
    const { data: HistoryPackage } = useGetHistoryOrderQuery([]);
    const [selectedMonth, setSelectedMonth] = useState<any>(null);
    console.log(HistoryPackage);
    
    // const nameUser = useGetUserByIdQuery()
    const columns = [
        {
            title: 'STT',
            dataIndex: 'key',
            render: (text: any, record: any, index: number) => index + 1
        },
        {
            title: 'Id người dùng',
            dataIndex: '_id',
        },
        {
            title: 'Tên gói',
            dataIndex: 'order_name',
        },
        {
            title: 'Ngày mua',
            dataIndex: 'order_date',
            render: (_: any, record: any) => (
                <>
                    <div>{(record.createdAt && record.createdAt !== 'Invalid date') ? (new Date(record.createdAt)).toLocaleDateString() : ''}</div>
                </>
            )
        },
        {
            title: 'Số tiền',
            dataIndex: 'order_price',
            render: (_: any, record: any) => (
                <div>{(typeof record.order_price === 'number') ? record.order_price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ''}
                </div>
            )
        },
        {
            title: 'Trạng thái',
            render: () => (
                <span style={{ color: 'green', fontWeight: 'bold' }}>
                  Đã thanh toán
                </span>
              ),
            
        },
    ];

    // Lọc dữ liệu khi selectedMonth thay đổi
    const filteredData = HistoryPackage?.filter((order: Order) => {
        if (selectedMonth) {
            const selectedMonthIndex = selectedMonth.get('month');
            const orderDate = new Date(order.createdAt);
            return orderDate.getMonth() === selectedMonthIndex && order.order_status === true;
        }
        return order.order_status === true;
    });
    
    const csvData = ((filteredData && filteredData.length > 0 ? filteredData : [])).map((user: any, index: number) => ({
        'Số đơn hàng': index + 1,
        'Id người dùng': user._id,
        'Tên gói': user.order_name,
        'Ngày mua': (user.createdAt && user.createdAt !== 'Invalid date') ? (new Date(user.createdAt)).toLocaleDateString() : '',
        'Số tiền': (typeof user.order_price === 'number') ? user.order_price.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : ''
    }));

    return (
        <>
            <div className='d-flex align-items-center justify-content-between mb-2 pt-20 mx-3'>
                <div>
                    <h2 className='mt-0 text-xl'>Thống kê đơn hàng</h2>
                </div>
                <div className='flex items-center'>
                    <div className='h-[40px]'>
                        <MonthPicker
                            className='h-100'
                            placeholder="Chọn tháng"
                            value={selectedMonth}
                            onChange={(date) => setSelectedMonth(date)}
                        />
                    </div>
                    <div className='bg-success rounded px-[16px] h-[40px] leading-[40px] ml-[10px]'>
                        <CSVLink className='text-white text-decoration-none' data={csvData} filename={'doanh-thu-don-hang.csv'}>
                            <i className="fa-solid fa-file-export"></i>
                            <span className='ml-[8px]'>Export</span>
                        </CSVLink>
                    </div>
                </div>
            </div>

            {filteredData && filteredData.length > 0 ? (
                <Table columns={columns} dataSource={filteredData} className='mx-3' />
            ) : (
                <div className='mx-3 text-center text-danger'>Không có dữ liệu</div>
            )}
        </>
    );
};

export default OrderManagement;
