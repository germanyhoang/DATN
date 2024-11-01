import classNames from 'classnames/bind';
import styles from './CVChoose.module.scss';

const cx = classNames.bind(styles);

function CVChooseComponent({ 
        title, 
        name, 
        time, 
        desc1, 
        desc2, 
        isValue, 
        isshow,
        data
    }: any) {
    return (
        <>
            {title && <p className={cx('content__title')}>{title}</p>}
            <div className={cx('content__education')}>
                <div className={cx('content-top', {
                    'mb-0': isshow
                })}>
                    <div
                        className={cx(
                            'content__education-text',
                            'fz-13',
                        )}
                    >
                        {
                            !isValue && <i className={cx('text-italic')}>{name}</i>
                        }
                    </div>
                    <div
                        className={cx(
                            'content__education-text',
                            'fz-13', {
                                ['text-italic']: !isValue
                            }
                        )}
                    >
                        <i>{time}</i>
                    </div>
                </div>
                <div className={cx('content-bottom')}>
                    <div
                        className={cx(
                            'content__education-text',
                            'fz-13', {
                                ['text-italic']: !isValue
                            }
                        )}
                    >
                        <p className={isValue && 'text-[#000]'}>{desc1}</p>
                    </div>
                    <div
                        className={cx(
                            'content__education-text',
                            'fz-13', {
                                ['text-italic']: !isValue
                            }
                        )}
                    >
                        <p className={isValue && 'text-[#000]'}>{desc2}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CVChooseComponent;
