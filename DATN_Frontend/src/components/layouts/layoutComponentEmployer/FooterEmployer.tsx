import React from "react";

type Props = {};

const FooterEmployer = (props: Props) => {
  return (
    <>
      {/* Footer */}
      <div className="bg-[#181818] text-white mt-3">
        <div className="container py-8" id="hanging-icons">
          <div className="footer-information grid grid-cols-4 gap-[115px]">
            <div className="footer-col w-[256px] ">
              <h3 className="text-[16px] font-semibold leading-[20px] tracking-normal">
                Thông tin liên hệ
              </h3>
              <div className="text-[14px] font-normal mt-4">
                <div className="flex pb-1">
                  <img
                    className="mr-[10px]"
                    src="https://employer.vietnamworks.com/v2/img/icons/icon_footer_phone.svg"
                    alt=""
                  />
                  <a className="text-white" href="">
                    {" "}
                    Hồ Chí Minh: (84 28) 3925 8456
                  </a>
                </div>
                <div className="flex py-1">
                  <img
                    className="mr-[10px]"
                    src="https://employer.vietnamworks.com/v2/img/icons/icon_footer_phone.svg"
                    alt=""
                  />
                  <a className="text-white" href="">
                    {" "}
                    Hà Nội: (84 24) 3944 0568
                  </a>
                </div>
                <div className="flex py-1">
                  <img
                    className="mr-[10px]"
                    src="https://employer.vietnamworks.com/v2/img/icons/icon_footer_email.svg"
                    alt=""
                  />
                  <a className="text-white" href="">
                    Jobsupport@uttworks.com
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-col w-[131px]">
              <h3 className="text-[16px] font-semibold leading-[20px] tracking-normal">
                Công ty
              </h3>
              <div className="text-[14px] font-normal mt-4 ">
                <div className="flex pb-1 ">
                  <a className="text-white" href="">
                    {" "}
                    Giới Thiệu
                  </a>
                </div>
                <div className="flex py-1">
                  <a className="text-white" href="">
                    {" "}
                    Bảo Mật Thông Tin
                  </a>
                </div>
                <div className="flex py-1">
                  <a className="text-white" href="">
                    {" "}
                    Quy Định Sử Dụng
                  </a>
                </div>
                <div className="flex py-1">
                  <a className="text-white" href="">
                    HR Insider
                  </a>
                </div>
                <div className="flex py-1">Hỏi Đáp</div>
              </div>
            </div>
            <div className="footer-col w-[139px]">
              <h3 className="text-[16px] font-semibold leading-[20px] tracking-normal">
                Ứng dụng di động
              </h3>
              <div className="text-[14px] font-normal mt-4">
                <div className="flex pb-1">
                  <a href="">
                    <img
                      className="mr-[10px] w-[121px]"
                      src="https://images.vietnamworks.com/gen/app-store-badge-vi.png"
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex py-1">
                  <a href="">
                    <img
                      className="mr-[10px] w-[121px]"
                      src="https://images.vietnamworks.com/gen/google-play-badge-vi.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-col w-[203px]">
              <h3 className="text-[16px] font-semibold leading-[20px] tracking-normal">
                Kết Nối Với UttWorks
              </h3>
              <div className="text-[14px] font-normal mt-4">
                <div className="flex pb-8">
                  <a className="pr-1" href="">
                    {" "}
                    <img
                      src="	https://employer.vietnamworks.com/v2/img/icons/icon_footer_linkedin.svg"
                      width={25}
                      alt=""
                    />
                  </a>
                  <a className="pl-1" href="">
                    {" "}
                    <img
                      src="	https://employer.vietnamworks.com/v2/img/icons/icon_footer_facebook.svg"
                      width={25}
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex py-1">
                  <span className="text-[16px] font-semibold leading-[20px] tracking-normal">
                    Chứng nhận bởi
                  </span>
                </div>
                <div className="flex py-1">
                  <a
                    href="http://online.gov.vn/HomePage/WebsiteDisplay.aspx?DocId=17746"
                    target="_blank"
                  >
                    <img
                      alt=""
                      title=""
                      src="https://images.vietnamworks.com/img/dadangky.jpgx?v=1"
                      width="124"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col align-center pb-4">
          <div className=" my-4 h-[1px] w-9/12 bg-white"></div>
          <p className="m-0 font-normal tracking-normal leading-4 opacity-75 text-[12px]">
            Bản Quyền © Công Ty Cổ Phần Navigos Group Việt Nam
          </p>
          <p className="m-0 font-normal tracking-normal leading-4  opacity-75 text-[12px]">
            Tầng 20, tòa nhà E.Town Central, 11 Đoàn Văn Bơ, Phường 13, Quận 4,
            TP.HCM, Vietnam
          </p>
        </div>
      </div>
    </>
  );
};

export default FooterEmployer;
