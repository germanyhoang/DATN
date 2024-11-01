import { useEffect, useState } from 'react'
import { useGetChartLineQuery, useGetHistoryOrderQuery } from '../../../service/admin/chartLine';
import { ChartData } from '../../../interface/admin/chartData';
import { Order } from '../../../interface/admin/order';
import ChartUsers from './ChartLine/ChartUsers';
import { calculatePercentageChange } from './ChartLine/helpers/calculatePercentageChange';
import ChartNTD from './ChartLine/ChartNTD';
import ChartNTV from './ChartLine/ChartNTV';
import ChartTotal from './ChartLine/ChartTotal';
import { useAppSelector } from '../../../app/hook';
import StatisticalPackageDay from "./ChartLine/statisticalPackageDay";
import StatisticalPackagePie from './ChartLine/StatisticalPackagePie';
import StatisticalPackage from "./ChartLine/StatisticalPackage"
import { useNavigate } from 'react-router-dom';

const HomeAdmin: any = () => {
  const { isLoggedIn } = useAppSelector((res) => res.authAdm);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const { data: Chart, error, isLoading, isSuccess } = useGetChartLineQuery([]);
  const { data: HistoryPackage } = useGetHistoryOrderQuery([]);
  const [chartState, setChartState] = useState<ChartData>();
  const [PackageHistory, setPackageHistory] = useState<Order[]>([]);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0 (0 là tháng 1)
  const year = currentDate.getFullYear();
  const navigate = useNavigate()
  const currentMonthRevenue = PackageHistory?.reduce((totalRevenue, order) => {
    const orderDate = new Date(order.createdAt);
    const orderMonth = orderDate.getMonth() + 1;
    const orderYear = orderDate.getFullYear();

    if (orderMonth === currentMonth && orderYear === currentYear) {
      totalRevenue += order.order_price;
    }

    return totalRevenue;
  }, 0);

  useEffect(() => {
    setChartState(Chart)
  }, [Chart])
  useEffect(() => {
    setPackageHistory(HistoryPackage)
  }, [HistoryPackage])
  
  // if (!isLoggedIn) {
  //   return navigate('/login-admin')
  // }

  return (
    <div className="nk-content text-sm">
      <div className="container-fluid">
        <div className="nk-content-inner">
          <div className="nk-content-body">
            <div className="nk-block-head nk-block-head-sm">
              <div className="nk-block-between">
                <div className="nk-block-head-content">
                  <h3 className="nk-block-title page-title">Dashboard</h3>
                </div>
                {/* .nk-block-head-content */}

                {/* .nk-block-head-content */}
              </div>
              {/* .nk-block-between */}
            </div>
            {/* .nk-block-head */}
            <div className="nk-block">
              <div className="row g-gs">
                {/* .col */}

                <div className="col-xxl-3 col-sm-6">
                  <div className="card">
                    <div className="nk-ecwg nk-ecwg6">
                      <div className="card-inner">
                        <div className="">
                          <div className="">
                            <h6 className="text-xl">Tổng số người dùng</h6>
                          </div>
                        </div>
                        <div className="data">
                          <div className="data-group">
                            <div className="amount text-sm">{chartState?.totalUser.totalUser}</div>
                            <div className="nk-ecwg6-ck">
                              <ChartUsers
                                chartData={Chart}
                                error={error}
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                              />
                            </div>

                          </div>
                          <div className="info">
                            <span className="change up text-danger">
                              {
                                chartState ? (chartState?.totalUser.userLastWeekTotal < chartState?.totalUser.userWeekBeforeLastTotal) ?
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684684027/juiewztaypyiczhygevl.png"
                                        alt=""
                                      />
                                    </div>

                                    <span className='text-red-600'>{calculatePercentageChange(Number(chartState?.totalUser?.userWeekBeforeLastTotal), Number(chartState?.totalUser?.userLastWeekTotal))}% vs. last week</span> </div>
                                  :
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684683813/hjlqm92wwhp0lj93epso.png"
                                        alt=""
                                      />
                                    </div>
                                    <span className='text-green-500'>{calculatePercentageChange(Number(chartState?.totalUser?.userWeekBeforeLastTotal), Number(chartState?.totalUser?.userLastWeekTotal))}% vs. last week</span> </div> : 'loading  '
                              }

                            </span>
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                    {/* .nk-ecwg */}
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card">
                    <div className="nk-ecwg nk-ecwg6">
                      <div className="card-inner">
                        <div className="">
                          <div className="">
                            <h6 className="text-xl">Tổng nhà tuyển dụng</h6>
                          </div>
                        </div>
                        <div className="data">
                          <div className="data-group">
                            <div className="amount text-sm">{chartState?.totalNTD.totalNTD}</div>
                            <div className="nk-ecwg6-ck">
                              <ChartNTD
                                chartData={Chart}
                                error={error}
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                              />
                            </div>

                          </div>
                          <div className="info">
                            <span className="change up text-danger">
                              {
                                chartState ? (chartState?.totalNTD.userLastWeekTotalNTD < chartState?.totalNTD.userWeekBeforeLastTotalNTD) ?
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684684027/juiewztaypyiczhygevl.png"
                                        alt=""
                                      />
                                    </div>

                                    <span className='text-red-600'>{calculatePercentageChange(Number(chartState?.totalNTD?.userWeekBeforeLastTotalNTD), Number(chartState?.totalNTD?.userWeekBeforeLastTotalNTD))}% vs. last week</span> </div>
                                  :
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684683813/hjlqm92wwhp0lj93epso.png"
                                        alt=""
                                      />
                                    </div>
                                    <span className='text-green-500'>{calculatePercentageChange(Number(chartState?.totalNTD?.userWeekBeforeLastTotalNTD), Number(chartState?.totalNTD?.userLastWeekTotalNTD))}% vs. last week</span> </div> : 'loading  '
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                    {/* .nk-ecwg */}
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card">
                    <div className="nk-ecwg nk-ecwg6">
                      <div className="card-inner">
                        <div className="">
                          <div className="">
                            <h6 className="text-xl">Tổng người tìm việc</h6>
                          </div>
                        </div>
                        <div className="data">
                          <div className="data-group">
                            <div className="amount text-sm">{chartState?.totalNTV.totalNTV}</div>
                            <div className="nk-ecwg6-ck">
                              <ChartNTV
                                chartData={Chart}
                                error={error}
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                              />
                            </div>

                          </div>
                          <div className="info">
                            <span className="change up text-danger">
                              {
                                chartState ? (chartState?.totalNTV.userLastWeekTotalNTV < chartState?.totalNTV.userWeekBeforeLastTotalNTV) ?
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684684027/juiewztaypyiczhygevl.png"
                                        alt=""
                                      />
                                    </div>

                                    <span className='text-red-600'>{calculatePercentageChange(Number(chartState?.totalNTV?.userWeekBeforeLastTotalNTV), Number(chartState?.totalNTV?.userLastWeekTotalNTV)).toFixed()}% vs. last week</span> </div>
                                  :
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684683813/hjlqm92wwhp0lj93epso.png"
                                        alt=""
                                      />
                                    </div>
                                    <span className='text-green-500'>{calculatePercentageChange(Number(chartState?.totalNTV?.userWeekBeforeLastTotalNTV), Number(chartState?.totalNTV?.userLastWeekTotalNTV)).toFixed()}% vs. last week</span> </div> : 'loading  '
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                    {/* .nk-ecwg */}
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-3 col-sm-6">
                  <div className="card">
                    <div className="nk-ecwg nk-ecwg6">
                      <div className="card-inner">
                        <div className="">
                          <div className="">
                            <h6 className="text-xl">Tin chờ duyệt</h6>
                          </div>
                        </div>
                        <div className="data">
                          <div className="data-group">
                            <div className="amount text-sm">
                            {chartState?.totalPosts.totalPosts}
                            </div>
                            <div className="nk-ecwg6-ck">
                              <ChartTotal
                                chartData={Chart}
                                error={error}
                                isLoading={isLoading}
                                isSuccess={isSuccess}
                              />
                            </div>

                          </div>
                          <div className="info">
                            <span className="change up text-danger">
                              {
                                chartState ? (chartState?.totalPosts.postLastWeekTotalPosts < chartState?.totalPosts.postWeekBeforeLastTotalPosts) ?
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684684027/juiewztaypyiczhygevl.png"
                                        alt=""
                                      />
                                    </div>

                                    <span className='text-red-600'>{calculatePercentageChange(Number(chartState?.totalPosts?.postWeekBeforeLastTotalPosts), Number(chartState?.totalPosts?.postLastWeekTotalPosts)).toFixed()}% vs. last week</span> </div>
                                  :
                                  <div className="flex py-2">
                                    <div className="pr-3 ">
                                      <img
                                        className="w-5"
                                        src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684683813/hjlqm92wwhp0lj93epso.png"
                                        alt=""
                                      />
                                    </div>
                                    <span className='text-green-500'>{calculatePercentageChange(Number(chartState?.totalPosts?.postWeekBeforeLastTotalPosts), Number(chartState?.totalPosts?.postLastWeekTotalPosts)).toFixed()}% vs. last week</span> </div> : 'loading  '
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                    {/* .nk-ecwg */}
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}


                {/* .col */}
                <div className="col-xxl-6">
                  <div className="card">
                    <div className="">
                      <div className="card-inner">
                        <div className="card-title-group mb-3">
                          <div className="card-title">
                            <h6 className="text-xl font-bold">Doanh thu năm {year} </h6>
                          </div>

                        </div>
                        <ul className="nk-ecwg8-legends">
                          <li>
                            <div className="">
                              <span className="dot dot-lg sq text-sm" data-bg="#6576ff" />
                              {/* <span className='text-[#6576ff] font-bold'>Tổng gói đăng ký</span> */}
                            </div>
                          </li>
                          <li>
                            <div className="">
                              <span className="dot dot-lg sq " data-bg="" />
                              {/* <span className='text-[#eb6459] font-bold'>Tổng gói đã hủy</span> */}
                            </div>
                          </li>
                        </ul>
                        <div className="nk-ecwg8-ck">
                          <StatisticalPackage PackageHistory={HistoryPackage} />
                        </div>
                        <div className="chart-label-group ps-5">
                          <div className="text-black text-decoration-none">
                            Doanh thu từ đầu năm: {currentMonthRevenue ? currentMonthRevenue.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : 'loading...'}
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card">
                    <div className="align-center">
                      <div className="card-inner flex-grow-1">
                        <div className="">
                          <div className="">
                            <h6 className="text-xl text-center">Thống kê lượng người dùng</h6>
                          </div>
                        </div>
                        <div className="align-center h-72"><StatisticalPackagePie PackageHistory={HistoryPackage} /></div>

                      </div>
                      {/* .card-inner */}
                    </div>
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-3 col-md-6">
                  <div className="card h-100">
                    <div className="card-inner">
                      <div className="card-title-group mb-2">
                        <div className="card-title">
                          <h6 className="">Thống kê</h6>
                        </div>
                      </div>
                      <ul className="nk-store-statistics">
                        <li className="item w-full flex justify-evenly">
                          <div className="">
                            <div className="">Số gói</div>
                            <div className="count py-1">{chartState?.TotalPackage}</div>
                          </div>
                          <img className='w-10' src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684687461/l6imf0nh0m55inixceed.png" alt="" />
                        </li>
                        <li className="item w-full flex justify-evenly">
                          <div className="info">
                            <div className="">Người dùng</div>
                            <div className="count py-1">{chartState?.totalUser.totalUser}</div>
                          </div>
                          <img className='w-10' src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684687461/l6imf0nh0m55inixceed.png" alt="" />
                        </li>
                        <li className="item w-full flex justify-evenly">
                          <div className="info">
                            <div className="">Bài đăng</div>
                            <div className="count py-1">{chartState?.totalPosts.totalPosts}</div>
                          </div>
                          <img className='w-10' src="https://res.cloudinary.com/dtd8tra0o/image/upload/v1684687461/l6imf0nh0m55inixceed.png" alt="" />
                        </li>
           
                      </ul>
                    </div>
                    {/* .card-inner */}
                  </div>
                  {/* .card */}
                </div>
                {/* .col */}
                <div className="col-xxl-6">
                  <div className="card">
                    <div className="">
                      <div className="card-inner">
                        <div className="card-title-group mb-3">
                          <div className="card-title">
                            <h6 className="text-xl font-bold">Doanh thu tháng {month}/{year}</h6>
                          </div>

                        </div>
                        <ul className="nk-ecwg8-legends">
                          <li>
                            <div className="">
                              <span className="dot dot-lg sq text-sm" data-bg="#6576ff" />
                              {/* <span className='text-[#6576ff] font-bold'>Tổng gói đăng ký</span> */}
                            </div>
                          </li>
                          <li>
                            <div className="">
                              <span className="dot dot-lg sq " data-bg="" />
                              {/* <span className='text-[#eb6459] font-bold'>Tổng gói đã hủy</span> */}
                            </div>
                          </li>
                        </ul>
                        <div className="nk-ecwg8-ck">
                          <StatisticalPackageDay PackageHistory={HistoryPackage} />
                        </div>
                        <div className="chart-label-group ps-5">
                          <div className="text-black text-decoration-none">
                            Doanh thu tháng này: {currentMonthRevenue ? currentMonthRevenue.toLocaleString('vi', { style: 'currency', currency: 'VND' }) : 'loading...'}
                          </div>
                        </div>
                      </div>
                      {/* .card-inner */}
                    </div>
                  </div>
                  {/* .card */}
                </div>
                <div className="col-xxl-6">
                  <div className="card card-full"  >
                    <div className="card-inner">
                      <div className="card-title-group">
                        <div className="card-title">
                          <h6 className="text-xl">Lịch sử gói đăng ký</h6>
                        </div>
                      </div>
                    </div>

                    {/* Giới hạn chiều cao và kích hoạt thanh cuộn */}
                    
                    <div className="nk-tb-list mt-n2" >
                    <div style={{ maxHeight: '300px', overflowY: 'scroll' }}>
                      <div className="nk-tb-item nk-tb-head">
                        <div className="nk-tb-col">
                          <span>STT</span>
                        </div>
                        <div className="nk-tb-col tb-col-sm">
                          <span>Id nguời dùng</span>
                        </div>
                        <div className="nk-tb-col tb-col-md">
                          <span>Ngày mua</span>
                        </div>
                        <div className="nk-tb-col">
                          <span>Số tiền</span>
                        </div>
                        <div className="nk-tb-col">
                          <span className="d-none d-sm-inline">Trạng thái</span>
                        </div>
                      </div>

                      {/* Hiển thị 5 mục đầu tiên và cuộn để xem tiếp các mục khác */}
                      {PackageHistory?.slice(0, PackageHistory.length).map((data, index: number) => (
                        <div className="nk-tb-item" key={index} >
                          <div className="nk-tb-col" >
                            <span className="tb-lead">
                              <a href="#">{index + 1}</a>
                            </span>
                          </div>
                          <div className="nk-tb-col tb-col-sm">
                            <div className="user-card">
                              <div className="user-name">
                                <span className="tb-lead">{data?._id}</span>
                              </div>
                            </div>
                          </div>
                          <div className="nk-tb-col tb-col-md">
                            <span className="tb-sub">{new Date(data?.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="nk-tb-col">
                            <span className="tb-sub tb-amount">
                              {data?.order_price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                            </span>
                          </div>
                          <div className="nk-tb-col">
                            {data?.order_status === true ? (
                              <span className="badge badge-dot badge-dot-xs bg-success">Đã thanh toán</span>
                            ) : (
                              <span className="badge badge-dot badge-dot-xs bg-warning">Đang chờ thanh toán</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                </div>
                {/* .col */}
              </div>
              {/* .row */}
            </div>
            {/* .nk-block */}
          </div>
        </div>
      </div>
    </div>

  )
}

export default HomeAdmin