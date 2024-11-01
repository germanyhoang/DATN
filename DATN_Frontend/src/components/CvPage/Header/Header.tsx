import classNames from 'classnames/bind'
import styles from "./Header.module.scss"

const cx = classNames.bind(styles)

const Header = ({onClick, onBack, onSave} : any) => {
  return (
    <>
        <section className={cx("btn-wrapper")}>
            <section className={cx("btn-wrapper__container")}>
                <button className={cx("btn-back")} onClick={onBack}>
                    <i className="fa-solid fa-arrow-left"></i>
                    <span>Trở lại</span>
                </button>
                <section className={cx("btn-group")}>
                    <button className={cx("btn-download", "btn")} onClick={onClick}>
                        <i className="fa-solid fa-download"></i>
                        <span>Tải xuống CV</span>
                    </button>
                    <button className={cx("btn-save", "btn", "btn--active")} onClick={onSave}>
                        <i className="fa-regular fa-file"></i>
                        <span>Lưu CV</span>
                    </button>
                </section>
            </section>
        </section>
    </>
  )
}

export default Header