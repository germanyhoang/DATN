import { useEffect, useState } from 'react'
import FooterEmployer from '../../layouts/layoutComponentEmployer/FooterEmployer'
import { useAppSelector } from '../../../app/hook'
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import { useGetPostsByUIdQuery } from '../../../service/post';
import IPost from '../../../interface/post';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Home = (): any => {
    const { email, isLoggedIn } = useAppSelector((res) => res.authEmpr);
    const { data: user }: any = useGetUserEprByEmailQuery(email)
    const { data: posts, error, isLoading } = useGetPostsByUIdQuery(user?._id)
    const [postData, setPostData] = useState<IPost[]>([]);
    const navigate = useNavigate()
    useEffect(() => {
        setPostData(posts);
    }, [posts]);


    const jobIsOK = postData?.filter((post) => {
        const lengthofOK = [];
        if (post.post_status == true) {
            lengthofOK.push(post);
        }
        return lengthofOK.length
    })
    const jobIsWating = postData?.filter((post) => {
        const lengthofOK = [];
        if (!post.post_status) {
            lengthofOK.push(post);
        }
        return lengthofOK.length
    })
    const jobIsDeny = postData?.filter((post) => {
        const lengthofOK = [];
        if (post.post_status == false) {
            lengthofOK.push(post);
        }
        return lengthofOK.length
    })

    if (!isLoggedIn) {
        return navigate('/login-epr')
    }

    return (
        <>
            <div className='mx-5' style={{backgroundColor: "rgb(216, 214, 213)", borderRadius: "8px"}}>
                <div className="row mt-4">
                    <div style={{ marginTop: '10px', height: '450px' }} className=" rounded">
                        <div className=" margin-bottom--10 row row-cols-sm-12 row-cols-12">
                            <div className="col-lg-5 col-sm-12 col-12" style={{backgroundColor: "white", borderRadius: "8px"}}>
                                <div className="width-percent--100" style={{paddingTop: "14px"}}>
                                    <div
                                        className="flex-box flex-box--align-end flex-box--between"
                                        style={{
                                            background:
                                                'url("https://employer.vietnamworks.com/v2/dashboard/static/media/img-section-welcome.44cf26351d8ef0e81c024194906421ae.svg") 95% 100% / auto no-repeat rgb(225, 241, 255)',
                                            borderRadius: 8,
                                            boxShadow: "rgba(185, 185, 185, 0.5) 0px 1px 8px -1px"
                                        }}
                                    >
                                        <div className="p-4">
                                            <p className="fz--20 fw--bold" style={{marginBottom: "0px"}}>Xin chào,</p>
                                            <p className="fz--20 colour--orange fw--bold white-space--pre-line" style={{ color: "rgb(255, 125, 85)", fontWeight: '700', fontSize: "20px" }}>
                                            {user?.name} {user?.isActivePackage ? "(Premium)" : ""}
                                            </p>
                                            <p className="pt-5">
                                                Đây là một số thông tin để bạn có thể bắt đầu sử dụng:
                                            </p>
                                            <div className="flex-box flex-box--align-center margin-top--10" style={{ display: 'flex' }}>
                                                <div className="margin-right--15">
                                                    <img
                                                        src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-faq.ad3cd0ec16d625ec8311dfb4f79f84a8.svg"
                                                        alt="icon-faq"
                                                        className="pr-2"
                                                    />
                                                </div>
                                                <a className="text__link white-space--no-wrap" >
                                                    FAQ/Hướng dẫn sử dụng
                                                </a>
                                            </div>
                                            <div className="flex-box flex-box--align-center margin-top--10" style={{ display: 'flex' }}>
                                                <div className="margin-right--15">
                                                    <img
                                                        src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-explore.8af54e41c9357aaac43454ac42dc1da4.svg"
                                                        alt="icon-faq"
                                                        className="pr-2"
                                                    />
                                                </div>
                                                <a
                                                    href="/choose-services"
                                                    className="text__link white-space--no-wrap"
                                                    target="_blank"
                                                >
                                                    Khám phá sản phẩm
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className=" bg-white width-percent--100 background-colour--whitemargin-bottom--10" style={{ borderRadius: '8px'}}>
                                    <div className="tab-page tab-page--customed mt--20" style={{ marginTop: '20px' }}>
                                        <div className="fz--18 fw--bold"><h4>Điểm khả dụng</h4></div>
                                        <div className="mt-4 padding row row-cols-sm-12 row-cols-12">
                                            <div className="padding--vertical--5 min-height--170 col-sm-6 col-6" style={{borderRightWidth:"10px"}}>
                                                <div className="background-colour--gray border-radius--10 badge__full-height d-flex align-items-center">
                                                    <div>
                                                        <div
                                                            className="fw--bold title"
                                                            style={{ color: "rgb(255, 125, 85)" }}
                                                        >
                                                            0
                                                        </div>
                                                        <div className="content">Điểm đăng tuyển</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="padding--vertical--5 min-height--170 col-sm-6 col-6">
                                                <div className="background-colour--gray border-radius--10 badge__full-height d-flex align-items-center">
                                                    <div>
                                                        <div
                                                            className="fw--bold title colour--gray-dark"
                                                            style={{ color: "rgb(255, 125, 85)" }}
                                                        >
                                                            0
                                                        </div>
                                                        <div className="content">Điểm xem hồ sơ</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-sm-12 col-12">
                                <div className="bg-white tab-page tab-page--button margin-top--1 border-radius--8 h-chart" style={{ borderRadius: '8px' }}>
                                    <div className="flex-box flex-box--between" >
                                        <div className="fz--18 fz--16--mobile fw--bold pr--10" style={{ fontWeight: '700', fontSize: '18px', paddingTop: '20px', paddingLeft: '20px' }}>
                                            Tình trạng hiện tại
                                        </div>

                                    </div>
                                    <div className="text-align--center" style={{ textAlign: 'center' }}>
                                        <img
                                            className="margin-top--70"
                                            src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon-empty-current-status.dc7c121ad253b15972a4bb894e7084fd.svg"
                                            alt=""
                                            style={{ width: "90%", height: "50%" }}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className=" rounded" id="tinhtrangcongviec">
                        <div className="row g-1">

                            <h4 className="m-3">Tình trạng công việc</h4>
                            <div className="container">

                                <div className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3" id="ttcv">
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#d1e0f9' }}>
                                            <p className='font-bold text-2xl'>
                                                {jobIsOK?.length ? jobIsOK?.length : 0}</p>
                                            Công việc đang đăng tuyển
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#fef7e5' }}>
                                            <p>{jobIsWating?.length ? jobIsWating?.length : 0}</p>
                                            Công việc đang chờ duyệt
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#e5f6ec' }}>
                                            <p>{jobIsDeny?.length ? jobIsDeny?.length : 0}</p>
                                            Công việc đã bị từ chối
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#fcecec' }}>
                                            <p>0</p>
                                            Các gói dịch vụ đang dùng
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#ead9fb' }}>
                                            <p>0</p>
                                            Ứng viên đang chờ duyệt
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="p-3" style={{ backgroundColor: '#dcd6e2' }}>
                                            <p>0</p>
                                            Ticket hỗ trợ
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div style={{ backgroundColor: 'white', marginTop: '10px', height: '250px' }} className=" rounded">
                        <h4 className="m-3">Quản lý công việc</h4>
                        <div id="nkcv">
                            <a href="#"><img src="./src/assets/img/nhatkyhoatdong.jpg" style={{ textAlign: 'center' }} /></a>
                        </div>
                    </div>
                    <div>
                        <div className="mt--20 row row-cols-sm-12 row-cols-12" style={{ marginTop: '10px', marginBottom: '10px', backgroundColor: "white", borderRadius: "8px" }}>
                            <div className="col-lg-7 col-sm-12 col-12" style={{ borderRightWidth: "10px" }}>
                                <div className="tab-page tab-page--customed bg-white ">
                                    <div className="fz--18 fw--bold"><h4 style={{ fontWeight: '700', fontSize: "20px", marginTop: '10px' }}>Thông tin khách hàng thân thiết</h4></div>
                                    <div className="background-colour--gray border-radius--10 mt--20 mb--20" style={{ backgroundColor: "#f5f5f5", margin: "10px 0px" }}>
                                        <div className="padding--20 row row-cols-lg-8 row-cols-sm-12 row-cols-12">
                                            <div className="col-md-3 col-sm-12 col-12" >
                                                <div className="text-align--center" >
                                                    <img style={{ paddingLeft: '25%' }}
                                                        className="width--120"
                                                        src="https://employer.vietnamworks.com/v2/dashboard/static/media/icon_no_membership.6d5f082d590a40a35244294ab394a6b1.svg"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-9 col-sm-12 col-12" >
                                                <div>
                                                    <p>
                                                        Hạng: <strong className="null">Chưa có thành viên</strong>
                                                    </p>
                                                    <div className="pt--10 d-flex align-items-center">
                                                        <span>Giá trị: </span>
                                                        <strong className="ml--5">0 VNĐ </strong>
                                                        <span
                                                            className="icon_info_tooltip ml--5"
                                                            data-for="memberShipTooltip"
                                                            data-tip="Giá trị mà bạn đã chi cho các dịch vụ của chúng tôi như đăng tuyển, tìm kiếm sơ yếu lý lịch,..."
                                                        >
                                                            ?
                                                        </span>
                                                        <div
                                                            className="__react_component_tooltip t29d937df-3455-445d-985f-bc74a56da654 place-top type-dark"
                                                            id="memberShipTooltip"
                                                            data-id="tooltip"
                                                        >
                                                        </div>
                                                    </div>
                                                    <div className="pt--10 flex-box">
                                                        <div>Trạng thái:</div>
                                                        <div className="pt--4 pl--5 width-progress-membership">
                                                            <div>
                                                                <div
                                                                    className="progress"
                                                                    style={{
                                                                        marginTop: 1,
                                                                        height: "0.7rem",
                                                                        borderRadius: "1.5rem"
                                                                    }}
                                                                >
                                                                    <div
                                                                        role="progressbar"
                                                                        className="progress-bar bg-menberShip"
                                                                        aria-valuemin={0}
                                                                        aria-valuemax={100}
                                                                        aria-valuenow={0}
                                                                        style={{ width: "0%" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <p>
                                                                <i>
                                                                    <span>
                                                                        (Cần mua thêm <strong>48,000,000 VNĐ</strong> để lên
                                                                        hạng Bạc).
                                                                    </span>
                                                                </i>
                                                            </p>
                                                            <p className="text__link">
                                                                <i>Tìm hiểu thêm về Chương trình Khách hàng thân thiết</i>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5 col-sm-12 col-12" >
                                <div className="tab-page tab-page--customed background-promotion">
                                    <div className="fz--20 fw--bold" >
                                        <h4 style={{ color: "rgb(255, 125, 85)", fontWeight: '700', fontSize: "20px", marginTop: '10px' }}>Có sản phẩm mới</h4>
                                    </div>
                                    <div className="border-radius--10 mt--20">
                                        <p className="fz--15 w-75 text-special-promotion">
                                            Bắt đầu tìm kiếm tài năng ngay với các sản phẩm của chúng tôi.
                                        </p>
                                        <p className="pt--40 pb--40">
                                            <button
                                                type="button"
                                                className="btn_buy_now btn btn-primary"
                                                style={{ width: "auto", minWidth: "auto", marginTop:"13%" }}
                                            >
                                                <span style={{}} className="pl--5 pr--5">Mua ngay</span>
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <FooterEmployer />
        </>
    )
}

export default Home