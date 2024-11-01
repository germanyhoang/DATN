import { AiOutlineSearch } from 'react-icons/ai'
import { TiDocumentText } from "react-icons/ti"
import HeaderEmployer from '../../layouts/layoutComponentEmployer/HeaderEmployer'
import FooterClient from '../../layouts/layoutComponentClient/FooterClient'
import React, { useState } from 'react';
import report from '../report/report.css'
import banner from '../../../assets/img/banneremployer.jpg'
import { Button, Modal } from 'antd';
const Report = () => {
  const [open, setOpen] = useState(false);
  const news = [
    {
      title: 'ĐIỀU KHOẢN CHUNG',
      content: 'Bằng cách truy cập hoặc sử dụng trang web Jobforyou.vn, các dịch vụ, hoặc bất kỳ ứng dụng......'
    },
    {
      title: 'ĐỊNH NGHĨA VÀ GIẢI THÍCH',
      content: '“Cơ sở dữ liệu Jobforyou.vn” hoặc “Các cơ sở dữ liệu Jobforyou.vn” bao gồm tất cả......'
    },
    {
      title: 'ĐĂNG KÝ',
      content: 'Để sử dụng Dịch vụ bạn phải tạo một tài khoản theo yêu cầu của Jobforyou, bạn cam kết......'
    },
    {
      title: 'MẬT KHẨU VÀ BẢO MẬT',
      content: 'Khi bạn đăng ký sử dụng trang web Jobforyou.vn bạn sẽ được yêu cầu khởi tạo mật khẩ......'
    },
    {
      title: 'QUYỀN TRUY CẬP VÀ THU THẬP THÔNG TIN',
      content: 'Khi sử dụng trang web Jobforyou.vn, bạn thừa nhậ......'
    },
    {
      title: 'TUYÊN BỐ VỀ QUYỀN SỞ HỮU TRÍ TUỆ',
      content: 'Bạn tuyên bố và đảm bảo rằng: (i) bạn sở hữu Nội dun......'
    },
    {
      title: 'TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM',
      content: 'Jobforyou không tuyên bố hay đảm bảo rằng dịch vụ sẽ khô......'
    },
    {
      title: 'GIỚI HẠN TRÁCH NHIỆM PHÁP LÝ',
      content: 'Trong mọi tình huống, Jobforyou sẽ không chịu trách nhiệ......'
    }
  ]
  return (
    <div className=' bg-white'>
      <div >
        <HeaderEmployer />
      </div>

      <div className='relative'>
        <img src={banner} alt="" className='h-[340px] w-full' />

        <div className="absolute inset-0  items-center top-[30%]">
          <h2 className='test-[27px] text-center text-white'>Smart Recruitment Platform</h2>
          <div className="flex border-white border-2 bg-black text-white w-[650px] h-[45px] m-auto rounded-lg">
            <button className="px-2">
              <AiOutlineSearch className=' text-white text-[15px]' />
            </button>
            <input
              type="text"
              placeholder="Tìm kiếm nội dung hỗ trợ"
              className="bg-transparent border-none outline-none text-white "
            />
          </div>
        </div>
      </div>

      <div className='w-[1200px] m-auto '>
        <h2 className='text-[16px] text-gray-500 mt-5'>Mới cập nhật <span className='bg-blue-800 px-2 rounded-md text-white'>New</span></h2>


        <div className='flex flex-wrap ml-5'>
          {news.map(function (data) {
            return (
              <div className='flex justify-between mt-3 b mr-2 ml-5'>

                <a className='border bg-blue-800 rounded-md w-[240px] h-[180px] cursor-pointer hover:bg-blue-900 '>
                  <label className='px-3 pt-3 text-white mb-1  text-[15px] font-semibold'>{data.title}</label>
                  <p className='px-3 text-white mb-1  text-[13px] '>Bằng cách truy cập hoặc sử dụng trang web Jobforyou.vn, các dịch vụ, hoặc bất kỳ ứng dụng......</p>
                  <p className='pl-[150px] text-white  text-[13px] font-bold'>Xem thêm</p>
                </a>
              </div>
            )
          })}
        </div>



        <div className='mt-5 flex justify-between'>
          <div className='flex bg-white justify-between items-center  w-[45%] p-3 border rounded-md'>
            <div>
              <h2 className='text-[16px]'>Tổng quan</h2>
              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Quy định bảo mật</a>
                </div>
              </div>
              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Chính sách dịch vụ</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Ẩn hồ sơ với NTD</a>
                </div>

              </div>


              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Liên hệ</a>
                </div>

              </div>

            </div>

            <div>
              <img src="https://tuyendung.topcv.vn/help/wp-content/uploads/2023/04/Help-1-2-1.png" alt="" className='w-[122px]' />
            </div>
          </div>

          <div className='flex justify-between items-center bg-white  w-[45%] p-3 border rounded-md'>

            <div>
              <h2 className='text-[16px]'>Tìm việc và ứng tuyển</h2>
              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Quy trình ứng tuyển trên Jobforyou</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Làm thế nào để chat với Nhà tuyển dụng?</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px]  font-semibold'>Xem lại các công việc đã ứng tuyển hoặc xem danh sách NTD xem CV online như thế nào?</a>
                </div>

              </div>


              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Sau khi nhận được thông báo NTD đánh giá CV phù hợp có cần tìm cách liên hệ với NTD không?</a>
                </div>

              </div>

            </div>

            <div>
              <img src="https://tuyendung.topcv.vn/help/wp-content/uploads/2023/04/Help-3-1-2.png" alt="" className='w-[122px]' />
            </div>
          </div>
        </div>



        <div className='mt-5 flex justify-between'>
          <div className='flex justify-between items-center bg-white  w-[45%] p-3 border rounded-md'>

            <div>
              <h2 className='text-[16px]'>Tìm việc an toàn</h2>
              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Ứng tuyển an toàn như thế nào?</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Báo cáo tin đăng tuyển hoặc Nhà tuyển dụng có dấu hiệu bất thường như thế nào?</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Jobforyou cảnh báo tới bạn các NTD có dấu hiệu bất thường</a>
                </div>

              </div>


              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px]  font-semibold'>Jobforyou đã làm gì để phòng chống lừa đảo</a>
                </div>

              </div>

            </div>

            <div>
              <img src="https://tuyendung.topcv.vn/help/wp-content/uploads/2023/04/Help-2-2.png" alt="" className='w-[122px]' />
            </div>
          </div>

          <div className='flex justify-between items-center  bg-white w-[45%] p-3 border rounded-md'>

            <div>
              <h2 className='text-[16px]'>Cài đặt tài khoản</h2>
              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Tôi gặp lỗi khi xác thực tài khoản</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Tôi muốn thay đổi email đăng nhập</a>
                </div>

              </div>

              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a href="#" className='text-black text-[14px] font-semibold'>Bật/Tắt chế độ Cho phép NTD tìm kiếm hồ sơ như thế nào?</a>
                </div>

              </div>


              <div className='flex'>
                <div>
                  <TiDocumentText />
                </div>
                <div className='px-3 py-2'>
                  <a className='text-black text-[14px] font-semibold' onClick={() => setOpen(true)}>Tôi muốn vô hiệu hóa tài khoản</a>
                  <Modal
                    title="Tôi muốn vô hiệu hóa tài khoản"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    cancelButtonProps={{ style: { display: 'none' } }}
                    okButtonProps={{ style: { display: 'none' } }}
                    width={1000}
                  >
                    <p className='text-black text-[14px] font-semibold'>
                      Jobforyou rất tiếc khi biết rằng bạn không muốn sử dụng các chức năng của Jobforyou trong một khoảng thời gian.
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      Trong trường hợp bạn chỉ muốn ngừng nhận các email được gửi từ Jobforyou hay các cuộc gọi từ Nhà tuyển dụng, bạn hãy tham khảo các hướng dẫn sau:
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      - Tắt tìm việc
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      - Tắt cho phép NTD tìm kiếm hồ sơ
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      Sau khi cân nhắc kỹ, nếu bạn vẫn mong muốn vô hiệu hóa tài khoản của bạn trên Jobforyou, bạn vui lòng làm theo hướng dẫn sau:
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      1. Truy cập vào mục <label className='font-bold'>Cài đặt bảo mật</label>.
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      2. Ở nội dung "Trong trường hợp bạn không muốn sử dụng các chức năng của Jobforyou trong một khoảng thời gian, bạn có thể gửi yêu cầu để Jobforyou hỗ trợ Vô hiệu hoá tài khoản của bạn tại đây." hiển thị ở khu vực cuối trang, bạn nhấp chọn "<label className='font-bold'>tại đây</label>.".
                    </p>
                    <p className='text-black text-[14px] font-semibold'>
                      3. Ở popup hiển thị Vô hiệu hóa tài khoản, bạn hãy nhập chính xác email và số điện thoại tích hợp với tài khoản bạn muốn vô hiệu hóa, chọn lý do vô hiệu hóa và nhấp chọn <label className='font-bold'>Vô hiệu hóa</label> để hoàn thành việc gửi yêu cầu vô hiệu hóa tài khoản đến Jobforyou..
                    </p>
                  </Modal>
                </div>

              </div>

            </div>

            <div>
              <img src="https://tuyendung.topcv.vn/help/wp-content/uploads/2023/04/Help-4-4.png" alt="" className='w-[122px]' />
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <FooterClient />
      </div>
    </div>
  )
}

export default Report