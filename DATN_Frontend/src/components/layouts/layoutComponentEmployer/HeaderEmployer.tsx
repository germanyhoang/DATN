import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { BsPersonCircle } from 'react-icons/bs'
import { Drawer, message, notification } from 'antd';
import { FaCartPlus } from "react-icons/fa"
import { WhatsAppOutlined, SettingOutlined } from '@ant-design/icons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { MessageType } from 'antd/es/message/interface'
import { Button, Modal } from 'antd';
import { IoMdNotifications } from "react-icons/io"
import moment from 'moment';

import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { useGetUserEprByEmailQuery } from '../../../service/auth_employer';
import { useAddFeedbackMutation } from '../../../services/feedback'
import { IFeedback } from '../../../interfaces/feedback'
import { logoutAuthEpr } from '../../../app/actions/authEpr';
import { useAddNotificationMutation, useGetNotificationByEmailQuery, useMarkAsReadMutation } from '../../../service/notification';
import { truncateStringFunction } from '../../../utils/hooks/TruncateString';
import { Inotification } from '../../../interface/notification';
import classNames from 'classnames/bind';
import styles from "./HeaderEpr.module.scss";
import { useGetCvsQuery } from '../../../service/manage_cv';
import { TiRssOutline } from 'react-icons/ti';

const cx = classNames.bind(styles);

const HeaderEmployer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { email, isLoggedIn } = useAppSelector((res: any) => res.authEmpr)
    const [isModalNoti, setIsModalNoti] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState<Inotification | null>(null)
    const [open, setOpen] = useState(false);
    const [openNotify, setOpenNotify] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: notificationEmail } = useGetNotificationByEmailQuery(
        email,
        {
            pollingInterval: 5000,
        }
    );
    const { data: user } = useGetUserEprByEmailQuery<any>(email)

    const onSignOut = async () => {
        try {
            dispatch(logoutAuthEpr())
            navigate('/login-epr')
        } catch (error: any) {
            message.info(error.message)
        }
    }

    const [addFeedback] = useAddFeedbackMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFeedback>()
    const onSubmit: SubmitHandler<IFeedback> = (data) => {
        addFeedback({
            ...data,
            feedback_email: email
        })
        const confirm: MessageType = message.info('Gửi yêu cầu thành công')
    }
    // get cvs
    const { data: cvs, error, isLoading } = useGetCvsQuery();
    //notification
    const [shownNotificationIds, setShownNotificationIds] = useState<string[]>([]);
    const [markAsRead] = useMarkAsReadMutation();
    const [addNotification] = useAddNotificationMutation()
    useEffect(() => {
        const notifiedEmails = new Set(); // Sử dụng Set để đảm bảo giữ duy nhất các email
        const addNotificationsForUnreadCvs = async () => {
            try {
                for (const cv of cvs) {
                    if (!cv.read && !notifiedEmails.has(cv.email)) {
                        await addNotification({
                            email: email,
                            role: 2,
                            notification_title: "Bạn có ứng viên ứng tuyển mới",
                            notification_content: `${cv.email} đã ứng tuyển với vị trí ${cv.job_title}`,
                            notification_url: `/home/posts/${cv.post_id}`
                        });
                        notifiedEmails.add(cv.email);
                    }
                }
            } catch (error) {
                // console.error('Error adding notifications:', error);
            }
        };

        addNotificationsForUnreadCvs();
    }, [addNotification, cvs]);

    const showNotification = async (notifications: Inotification) => {
        const { _id, notification_title, notification_content, isRead } = notifications;

        if (!isRead) {
            notification.info({
                message: 'Bạn có thông báo mới',
                description: notification_title,
            });
            setShownNotificationIds((prevIds) => [...prevIds, _id]);
            markAsRead(_id)
        }
    };

    // useEffect(() => {

    //     if (notificationEmail && notificationEmail.length > 0) {
    //         const latestNotification = notificationEmail[notificationEmail.length - 1]; //-1 cuoi danh sách
    //         showNotification(latestNotification);
    //     }
    // }, [notificationEmail]);

    const showModalNoti = (notificationId: string) => {
        if (notificationEmail) {
            const selectedNoti = notificationEmail.find((noti: { _id: string; }) => noti._id === notificationId) as Inotification;
            if (selectedNoti) {
                setSelectedNotification(selectedNoti as Inotification | null); // Explicitly cast to null
                setIsModalNoti(true);
            }
        }
    };
    moment.locale('vi');
    const handleOkNoti = () => {
        setIsModalNoti(false);
    };
    const handleCancelNoti = () => {
        setIsModalNoti(false);
    };
    return (
        <>
            {/* Header */}
            <div className='sticky top-0 z-[1000] bg-gradient-to-r from-[#FF703C] via-[#FF703C] to-[#FF703C] d-flex justify-content-between align-items-center'>
                <ul className='text-white'>
                    <li className='p-3 text-decoration-none text-white'>
                        <NavLink to={'/home'}
                            className='d-flex align-items-center text-decoration-none text-white'>
                            <span className='hover:text-orange-400'>
                                Bảng điều khiển
                            </span>
                        </NavLink>
                    </li>
                    <li className='p-3 text-decoration-none text-white'>
                        <NavLink to={'/home/posts'}
                            className='d-flex align-items-center text-decoration-none text-white'>
                            <span className='hover:text-orange-400'>
                                Tin tuyển dụng
                            </span>

                        </NavLink>
                    </li>
                    <li className='p-3 text-decoration-none text-white'>
                        <NavLink to={'/home/packages'}
                            className='d-flex align-items-center text-decoration-none text-white'>
                            <span className='hover:text-orange-400'>
                                Mua dịch vụ
                            </span>
                        </NavLink>
                    </li>
                    <li className='p-3 text-decoration-none text-white'>
                        <NavLink to={'/home/services'}
                            className='d-flex align-items-center text-decoration-none text-white'>
                            <span className='hover:text-orange-400'>
                                Dịch vụ của tôi
                            </span>
                        </NavLink>
                    </li>

                   { user?.serviceType == "premium" ?
                     <li className='p-3 text-decoration-none text-white'>
                     <NavLink to={'/home/search-resume'}
                         className='d-flex align-items-center text-decoration-none text-white'>
                         <span className='hover:text-orange-400'>
                             Tìm kiếm ứng viên
                         </span>
                     </NavLink>
                 </li> : <></>
                   }
                    <li className='p-3 text-decoration-none text-white'>
                        <NavLink to={'/report'}
                            className='d-flex align-items-center text-decoration-none text-white'>
                            <span className='hover:text-orange-400'>
                                Hỗ trợ
                            </span>
                        </NavLink>
                    </li>
                </ul>
                <ul className='flex items-center '>
                    <li className='p-3 pr-4 text-decoration-none text-white'>
                        <button onClick={() => setOpenNotify(true)}>
                            <IoMdNotifications className='text-3xl' />
                        </button>
                    </li>
                    <li className='p-3 pr-4 text-decoration-none'>
                        <NavLink to={'/home/cart'}>
                            <FaCartPlus className='text-[28px] text-white' />
                        </NavLink>
                    </li>
                    <li className='p-3 pr-4 text-decoration-none text-white'>
                        <button
                            className="flex items-center justify-center space-x-3"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            onClick={() => setOpen(true)}
                        >
                            <div className="avatar-wrapper">
                                {user?.image === undefined ? (
                                    <BsPersonCircle className="text-5xl text-[#474747]" />
                                ) : (
                                    <div
                                        style={{
                                            backgroundImage: `url(${user?.image})`,
                                            width: "45px",
                                            height: "45px",
                                        }}
                                        className="avatar-img"
                                    />
                                )}
                            </div>
                        </button>
                    </li>

                </ul>
                <Drawer
                    placement={'right'}
                    closable={false}
                    onClose={() => setOpen(false)}
                    open={open}
                    height={500}
                    key={'right'}
                    className='relative w-full stick bottom-0'
                >
                    {isLoggedIn ?
                        <div>
                            <div className='absolute left-0 flex items-center px-[30px] pb-[25px] gap-[20px] border-b-[1px] w-100'>
                                {user?.image === undefined ? (
                                    <BsPersonCircle className="text-5xl text-[#474747]" />
                                ) : (
                                    <div
                                        style={{
                                            backgroundImage: `url(${user?.image})`,
                                            width: "45px",
                                            height: "45px",
                                        }}
                                        className="avatar-img"
                                    />
                                )}
                                <div>

                                    <h2 className='text-[20px] text-[#474747] font-[700]'>{user?.name}</h2>
                                    <div className='text-[15px]'>{user?.email}</div>
                                </div>
                            </div>
                            <div className='pt-[100px] px-[10px]'>
                                <div className='flex items-start'>
                                    <SettingOutlined className='text-[25px] font-[700]' />
                                    <div className='flex flex-col'>
                                        <span className='text-[17px] text-[#474747] font-[700] px-3'>Thiết lập tài khoản</span>
                                        <NavLink
                                            to={'/home/acc-epr-manage'}
                                            className='text-[15px] text-[#474747] hover:text-[#474747] hover:bg-[#F3F8FC] px-3 py-1'>
                                            Quản lý tài khoản
                                        </NavLink>
                                        <NavLink
                                            to={'/home/profile-epr'}
                                            className='text-[15px] text-[#474747] hover:text-[#474747] hover:bg-[#F3F8FC] px-3 py-1'>
                                            Thông tin NTD
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                            <div className='absolute bottom-0 left-0 bg-[#F5F5F5] w-full p-3'>
                                <button className='flex items-center gap-2 text-[17px] text-[#474747] font-[700] px-[20px]' onClick={onSignOut}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                    </svg>
                                    Thoát
                                </button>
                            </div>
                        </div> :
                        <div>
                            <div className='mt-[150px]'>
                                <div className='flex justify-center'>
                                    <img src="https://employer.vietnamworks.com/v2/img/slider/image_not_login.svg" alt="" />
                                </div>
                                <div className='text-center'>
                                    <p className='py-3'>Đăng nhập để khám phá nhiều tính năng</p>
                                    <NavLink
                                        to={'/login-epr'}
                                        className='bg-[#FE7D55] hover:bg-[#FD6333] text-white py-2 px-3 rounded hover:no-underline'>
                                        Đăng nhập
                                    </NavLink>
                                </div>
                            </div>
                            <div className='absolute bottom-0 left-0 bg-[#F5F5F5] w-full py-3 text-center'>
                                <a href="#" className='text-[#2775FE] text-xl'>Tôi không có tài khoản</a>
                            </div>
                        </div>
                    }
                </Drawer>
            </div>
            <div className="float-contact ">
                <Button className='bg-[#f52b72] text-white m-2' onClick={() => setIsModalOpen(true)}>
                    <WhatsAppOutlined /> Hỗ trợ
                </Button>
                <Modal title="Đóng góp ý kiến" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='h-[80px] w-100 py-3 bg-white'>
                            <div className='container flex items-center justify-center h-100 w-100'>
                                <div className='flex items-center h-100 bg-[#F4F4F7] w-75 mr-2'>
                                    <div className='h-100 flex items-center bg-[#F4F4F7] w-[100%] border rounded'>
                                        <input type="text" className='bg-[#F4F4F7] h-100 w-[100%] text-gray-600 focus:outline-none' placeholder='Nhập câu hỏi cần giải đáp' {...register("feedback_question", { required: true })} />
                                        {errors.feedback_question?.type === "required" && <p className='text-danger font-bold w-200'>Vui lòng nhập câu hỏi của bạn !</p>}
                                    </div>
                                    {/* <div className='hidden'>
                                        {currentUser?.email}
                                    </div> */}
                                </div>
                                <div className='h-100'>
                                    <div className='h-100'>
                                        <button className='bg-[#FE7D55] hover:bg-[#FD6333] text-white rounded h-100 px-10'>Gửi</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </form>
                </Modal>
            </div>

            <Drawer
                placement={'right'}
                closable={false}
                onClose={() => setOpenNotify(false)}
                open={openNotify}
                height={500}
                key={'right'}
                className='relative w-full stick bottom-0'
            >
                <div className={cx('modal')} onClick={(e: any) => {
                    e.stopPropagation();
                }}
                >
                    <div className={cx('modal-header')}>
                        <div className={cx('modal-header__icon')}>
                            <i className="fa-regular fa-bell"></i>
                        </div>
                        <div className={cx('modal-header__title')}>
                            <h2>Thông báo & Tin tức</h2>
                            <p>Nhận thông báo tin tức hoặc công việc</p>
                        </div>
                        <button onClick={() => setOpenNotify(false)} className={cx('modal-header__btn')}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>

                    <div className={cx('modal-body')}>
                        <div className={cx('modal-body__tabs')}>
                            <span className={cx('modal-body__tabs-notify', {
                                active: true
                            })}>Thông báo</span>
                        </div>

                        <div className={cx('modal-body__msg')}>
                            Cập nhật hồ sơ để tìm thấy công việc phù hợp.
                            <span>Cập nhật</span>
                        </div>
                        <div className={cx('modal-body__content')}>
                            <div className={cx('modal-body__content')}>
                                <div>
                                    {notificationEmail ? (
                                        notificationEmail
                                            .slice()
                                            .sort((a: { created_at: moment.MomentInput; }, b: { created_at: moment.MomentInput; }) => moment(b.created_at).valueOf() - moment(a.created_at).valueOf())
                                            .map((noti: any) => (
                                                <div key={noti._id} className={cx('modal-body__content-notify')} onClick={() => setIsModalNoti(true)}>
                                                    <span className={cx('notify-img')}>
                                                        <img src={noti.notificationImage} alt="" />
                                                        <span>
                                                            <i className="fa-solid fa-heart"></i>
                                                        </span>
                                                    </span>
                                                    <div className={cx('notify-content')}>
                                                        <span className={cx('notify-title')}>{noti.notification_title}</span>
                                                        <span>{truncateStringFunction(noti.notification_content, 30)}</span>
                                                        <div className={cx('notify-desc')}>
                                                            <span className={cx('notify-expirate')}>
                                                                {moment(noti.created_at).format('DD/MM/YYYY HH:mm')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    ) : (
                                        <p>Loading notifications...</p>
                                    )}
                                    <Modal title={selectedNotification?.notification_title || "Thông báo"} open={isModalNoti} onOk={handleOkNoti} onCancel={handleCancelNoti}
                                        footer={[

                                            <Button key="cancel" onClick={handleCancelNoti}>
                                                Đóng
                                            </Button>,
                                            <Button
                                                key="goToURL"
                                                type="primary"
                                                onClick={() => window.location.href = selectedNotification?.notification_url ?? ''}
                                            >
                                                Đến URL
                                            </Button>
                                        ]}

                                    >
                                        {selectedNotification && (
                                            <>
                                                <span>{selectedNotification.notification_content}</span>
                                            </>
                                        )}
                                    </Modal>  <Modal title={selectedNotification?.notification_title || "Thông báo"} open={isModalNoti} onOk={handleOkNoti} onCancel={handleCancelNoti}
                                        footer={[

                                            <Button key="cancel" onClick={handleCancelNoti}>
                                                Đóng
                                            </Button>,
                                            <Button
                                                key="goToURL"
                                                type="primary"
                                                onClick={() => window.location.href = selectedNotification?.notification_url ?? ''}
                                            >
                                                Đến URL
                                            </Button>
                                        ]}

                                    >
                                        {selectedNotification && (
                                            <>
                                                <span>{selectedNotification.notification_content}</span>
                                            </>
                                        )}
                                    </Modal>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </Drawer>

        </>
    )
}

export default HeaderEmployer