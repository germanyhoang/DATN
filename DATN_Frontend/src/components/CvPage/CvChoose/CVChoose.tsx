import { forwardRef } from "react"
import classNames from 'classnames/bind';

import { useAppSelector } from '../../../app/hook';
import { useGetUserByEmailQuery } from '../../../service/auth';
import CVChooseComponent from './CVChooseComponent';
import styles from './CVChoose.module.scss';

const cx = classNames.bind(styles);

const CVChoose = forwardRef(
    ({ container }: any, ref: any) => {
        const { email } = useAppSelector((res: any) => res.auth)
        const { data: user }: any = useGetUserByEmailQuery(email)
        const address = user?.specific_address + ', ' + user?.district + ', ' + user?.province

        const items = [
            {
                icon: <i className="icon fa-solid fa-phone"></i>,
                text: user?.phone || '0123456789',
                border: !user?.phone,
                isValue: user?.phone,
            },
            {
                icon: <i className="icon fa-solid fa-envelope"></i>,
                text: user?.email || 'example@gmail.com',
                isValue: user?.email,
            },
            {
                icon: <i className="icon fa-solid fa-link"></i>,
                text: 'facebook.com',
                isValue: false,
            },
            {
                icon: <i className="icon fa-solid fa-location-dot"></i>,
                text: address || 'Quận A, Thành phố Hà Nội',
                border: !address,
                isValue: address,
            },
        ];

        // console.log(user);

        return (
            <>
                <div
                    className={cx('children-wrapper', {
                        container: container,
                    })}
                    ref={ref}
                    id="cv-content"
                >
                    <div className={cx('header')}>
                        <div className={cx('header__content')}>
                            <div className={cx('header__label')}>
                                <img
                                    hidden={!container}
                                    className={cx('header__img')}
                                    src="https://static.topcv.vn/cv-builder/assets/default-avatar.fc9c40ba.png"
                                    alt="avatar"
                                />
                                <div className={cx('header__label-info')}>
                                    <h1 className={cx('name')}>{user?.name}</h1>
                                    <div
                                        className={cx(
                                            'nominee',
                                            'fz-13',
                                            'text-italic',
                                        )}
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className={cx('header__info')}>
                                <div className={cx('header__info-wrapper')}>
                                    {container && (
                                        <div
                                            className={cx(
                                                'header__info-title',
                                                'text-italic',
                                            )}
                                        >
                                            Thông tin cá nhân
                                        </div>
                                    )}
                                    {items.map((item, index) => (
                                        <div
                                            className={cx('header__info-content')}
                                            key={index}
                                        >
                                            {item.icon}
                                            <span
                                                className={cx({
                                                    isValue: item.isValue,
                                                    border: item.border,
                                                })}
                                            >
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('content-wrapper')}>
                        <CVChooseComponent
                            title={'MỤC TIÊU NGHỀ NGHIỆP'}
                            name={'Mục tiêu nghề nghiệp của bạn bao gồm ngắn hạn và dài hạn'}
                            desc2={user?.career_goal}
                            isValue={user?.career_goal}
                            isshow={user?.career_goal}
                            data={user?.career_goal}
                        />
                        {
                            user?.education.map((item: any, index: number) => {
                                let title = null;
                                if(index == 0) title = "HỌC VẤN";
                                return <CVChooseComponent
                                title={title}
                                name={item.school || 'Tên trường học'}
                                time={`${item.time.start_date} - ${item.time.end_date}` || 'Thời gian'}
                                desc1={item.main_career || 'Ngành học'}
                                desc2={item.act || 'Mô tả quá trình học tập hoặc thành tích của bạn'}
                                isValue={!item}
                                data={item}
    
                            />
                            })
                        }
                        
                        {
                            user?.work_experience.map((item: any, index: number) => {
                                let title = null;
                                if (index == 0) title = "KINH NGHIỆM LÀM VIỆC";
                                return <CVChooseComponent
                                    title={title}
                                    name={item.company || 'Tên công ty'}
                                    time={`${item.time.start_date} - ${item.time.end_date}` || 'Thời gian'}
                                    desc1={item.position || 'Vị trí công việc'}
                                    desc2={item.desc_exp || 'Mô tả kinh nghiệm làm việc của bạn'}
                                    data={item}
                                />
                            })
                        }

                        {
                            user?.skills.map((item: any, index: number) => {
                                let title = null;
                                if(index == 0) title = "KỸ NĂNG";
                                return  <CVChooseComponent
                                title={title}
                                name={item.skill_name || 'Tên kỹ năng'}
                                // desc1={'Mô tả kỹ năng'}
                                data={user?.skills}
                            />
                            })
                        }
                       
                        <CVChooseComponent
                            title={'THÔNG TIN THÊM'}
                            name={'Điền thông tin thêm nếu có'}
                            desc2={user?.more_info}
                            isValue={user?.more_info}
                            isshow={user?.more_info}
                        />

                    </div>
                </div>
            </>

        )
    }
)

export default CVChoose