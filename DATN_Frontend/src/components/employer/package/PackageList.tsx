import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Space, Spin, message } from 'antd'
import { useAppSelector } from '../../../app/hook'
import { useGetAdmPackagesQuery } from '../../../service/admin/package'
import IAdPackage from '../../../interface/admin/package'
import { formatCurrency } from '../../../utils/hooks/FormatCurrrency'
import { useCreateOrderMutation } from '../../../service/employer/order';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import { convertDaysToMonths } from '../../../utils/hooks/ConvertMonth'
const PackageList = (): any => {
    const [createOrder] = useCreateOrderMutation();
    const navigate = useNavigate()
    const { isLoggedIn, email } = useAppSelector((rs) => rs.authEmpr)
    const { data: packages, error, isLoading } = useGetAdmPackagesQuery()
    const {data: user }:any= useGetUserEprByEmailQuery(email)
    const onHandleBuy = async (pack: IAdPackage) => {
        const {package_price,package_name,_id} = pack;
        const body = {
            order_name: package_name,
            order_status: false,
            order_price: package_price,
            user_id: user?._id,
            package_id: _id,
        }
       try {
        const {data}:any = await createOrder(body)
        console.log(data);
        
        navigate(`/home/orders/${data.order._id}/detail`);
       
       } catch (error) {
        message.error('error')
       }
        
        
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

    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
            <section className='min-h-screen'>
                <div className='bg-white'>
                    <h2 className='text-[15px] font-[700] p-3'>Mua dịch vụ</h2>
                </div>
                <div className='p-3'>
                    <div>
                        <div>
                            <h2 className='text-[20px] mb-0'><span className='text-[#004AD1]'>TOP JOBS</span> | QUẢNG CÁO TIN TUYỂN DỤNG</h2>
                            <p className='mt-0'>Cộng hưởng sức mạnh công nghệ tạo ra hiệu quả đột phá cho tin tuyển dụng của Bạn.</p>
                        </div>
                        <div className='grid grid-cols-3 gap-x-3 mt-3 '>
                            {
                                packages ? packages?.map((pack: any) =>
                                    <div key={pack._id} className='bg-white p-4 border-none rounded mb-3 border'>
                                        <h3 className='text-[18px]'>{pack.package_name}</h3>
                                        <span className='text-[17px] text-[#FD6333] font-[700]'>{formatCurrency(pack.package_price)} VND</span>
                                        <div className='text-[14px] my-1 font-[700]'>Thời hạn gói {convertDaysToMonths(pack.package_day)}</div>
                                        <p>Quảng cáo tin đăng hiệu quả với vị trí nổi bật trong <span className='font-[550]'>Việc làm tốt nhất</span> kết hợp cùng các dịch cao cấp và được bảo hành vị trí ưu tiên.</p>
                                        <div className='flex items-center'>
                                            <button onClick={() => onHandleBuy(pack)} className='border-none rounded bg-[#004AD1] text-white font-[550] px-8 py-1'>
                                                Mua ngay
                                            </button>
                                        </div>
                                    </div>
                                ) : ''
                            }

                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default PackageList