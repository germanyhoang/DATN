import React from 'react'
import HeaderSearchhJob from '../layouts/HeaderSearchhJob'
import "./pages.css"

const Interview = () => {
    return (
        <>
            <div>
                {/* ****head */}
                <div className='bg-white'>
                    <HeaderSearchhJob className={'py-[16px]'} />
                </div>
                {/* ****conntent */}
                <div style={{ background: '#f7f7f7', paddingBottom: '2em' }}>
                    <div className=" pt-3">
                        <div className="w-[80%] mx-auto flex items-start" >
                            <div className='interview-content w-[70%] mx-[8px]'>
                                <div className=" px-4 pt-5" style={{ background: 'white', color: 'black' }}>
                                    <p className="fw-bold fs-3" >
                                        Những câu hỏi phỏng vấn việc làm thường gặp &amp; cách trả lời hay nhất
                                    </p>
                                    <p className='fw-bold fs-5 pt-4 pb-2'>1. Giới thiệu sơ lược về bản thân bạn? </p>
                                    Hầu hết nhà tuyển dụng đều dùng câu hỏi này để bắt đầu câu chuyện với ứng viên. Mục đích câu hỏi này là để đánh giá phong thái và cách trình bày của ứng viên. Lúc này, tùy thuộc vào câu trả lời của ứng viên mà nhà tuyển dụng sẽ đánh giá đây có phải là một ứng viên phù hợp hay không và đưa ra các câu hỏi tiếp theo để đánh giá kỹ năng, tính cách và kinh nghiệm làm việc.
                                    <br />
                                    <br />
                                    Tip: Để trả lời tốt câu hỏi này, bạn cần đưa ra khái quát những thông tin về cá nhân có liên quan, hữu ích cho vị trí mà mình ứng tuyển như: công việc hiện tại, trình độ học vấn, mục tiêu sự nghiệp,… Bạn nên cân nhắc giới thiệu bản thân theo trình tự thời gian quá khứ, hiện tại và tương lai cũng như gói gọn trong tối đa 2 phút. Chia sẻ ngắn về sở thích, tính cách cũng là một cách thu hút nhà tuyển dụng, tuy nhiên cũng không nên nói quá nhiều về những vấn đề này với nhà tuyển dụng.
                                    <br />
                                    <br />
                                    "Trước khi giới thiệu về bản thân mình, em/tôi xin gửi lời cảm ơn chân thành tới anh/chị khi đã tạo cơ hội cho em/tôi để được trao đổi về vị trí ứng tuyển của quý công ty. Em chào anh/ chị, tên em là Mai, họ tên đầy đủ của em là Trịnh Thị Tuyết Mai. Em là sinh viên mới ra trường của Trường đại học X, trong thời gian làm sinh viên em đã từng tham gia một số công việc bán thời gian nhưng không thật sự ấn tượng, vì các công việc em làm khá đơn giản, tuy vậy thông qua chúng em học được tính kiên nhẫn và tỉ mỉ. Thông qua các hoạt động này, em có kinh nghiệm hơn trong việc nắm bắt tâm lý người khác, có thêm những kỹ năng như quan sát, có khả năng chịu áp lực cao. Và em tin những điều này sẽ có ích đối với vị trí này. Qua tìm hiểu kỹ về vị trí công việc và môi trường làm việc bên mình cũng như những kinh nghiệm và sở trường em đang có, em thực sự mong muốn được có cơ hội được làm việc cùng anh chị tại công ty Y với vị trí nhân viên tư vấn khách hàng."
                                    <br />
                                    <br />

                                    <p className='fw-bold fs-5 pt-4 pb-2'>2. Bạn có thể mô tả sơ lược về những công việc bạn đã làm? Nhiệm vụ chính ở công việc gần đây nhất của bạn là gì?</p>
                                    Mục đích của câu hỏi này để đánh giá về năng lực và những kinh nghiệm làm việc của bạn có phù hợp với vị trí đang ứng tuyển hay không.
                                    <br />
                                    <br />
                                    Tip: Được đánh giá là một trong các câu hỏi phỏng vấn thường gặp và quan trọng, cách trả lời phỏng vấn câu hỏi này là nên chân thật, nó giống như bạn đang chia sẻ những kinh nghiệm của bản thân, đừng cố nói những gì mình không biết, bạn sẽ không trả lời được nếu nhà tuyển dụng hỏi sâu hơn về chuyên môn.
                                    <br />
                                    Hãy nói những gì bạn được học hay những gì biết về công việc một cách ngắn gọn và đủ, cũng không nên kể chi tiết các công việc, quá dài dòng
                                    <br />
                                    Trong trường hợp bạn chưa có nhiểu kinh nghiệm, hãy nói bạn đang muốn theo đuổi công việc này và dành nhiều thời gian học hỏi, phát triển kỹ năng, bạn đang mong muốn tìm được một công ty tốt để gắn bó và cống hiến lâu dài.
                                    <br />
                                    <br />
                                    Tham khảo câu trả lời phỏng vấn mẫu bằng Tiếng Việt:
                                    <br />
                                    "Trước kia, tôi đã làm trợ lý hành chính cho một giám đốc tại Nhà xuất bản Sách và tôi đã hỗ trợ sắp xếp lịch trình cho cho ông ấy cũng như cho toàn văn phòng. Công việc của tôi là chăm sóc tất cả các chi tiết hành chính để ông ấy có thể tập trung vào các dự án của mình. Tôi đã làm tất cả mọi thứ từ việc đặt vé chuyến bay để chuẩn bị và in ấn các bản tường trình để nộp làm báo cáo chi phí."
                                    <br />
                                    <br />
                                    <br />
                                    <p className='fw-bold fs-5 pt-4 pb-2'>3. Những thành tựu nào đã đạt được trong công việc khiến bạn tự hào nhất? </p>





                                </div>
                            </div>
                            <div className='w-[27%] mx-[8px]'>
                                <div className='border border-0 rounded-[8px] overflow-hidden w-100 bg-[#fff]'>
                                    <p className='py-4 pl-[16px] fs-6' style={{ background: '#e5eeff', color: 'black' }}>Việc làm liên quan</p>
                                    <div className='flex items-center p-[16px]'>
                                        <span className='flex items-center justify-center border rounded py-[16px] px-[8px] h-100'>
                                            <img src='https://images.vietnamworks.com/pictureofcompany/6e/10922087.png' width={50} height={50} />
                                        </span>
                                        <div className='ml-[12px]' style={{flex: '1'}}>
                                            <a className='text-break job-title text-[16px]' style={{ lineHeight: '18px' }} href='#'>
                                                Giám đốc công ty doanh nhaanh 10 người làm trong cuộc thi 
                                            </a>
                                            <span className='text-[#005aff] text-[12px] short-desc' style={{ lineHeight: '18px' }}>
                                                Hà Nội
                                            </span>
                                            <span className='text-[#005aff] text-[12px]' style={{ lineHeight: '18px' }}>Thương lượng</span>
                                        </div>
                                    </div>

                                    <div className='flex items-center mt-[16px]'>
                                        <img src="https://glints.com/vn/blog/wp-content/uploads/2022/02/Feb-18-10-00-AM-_-Blog-Article-49-07-1024x845.jpg" alt="" className='h-[493px]' />
                                    </div>
                                    <div className='flex items-center mt-[16px]'>
                                        <img src="https://glints.com/vn/blog/wp-content/uploads/2022/02/Feb-18-10-00-AM-_-Blog-Article-49-07-1024x845.jpg" alt="" className='h-[493px]' />
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}


export default Interview