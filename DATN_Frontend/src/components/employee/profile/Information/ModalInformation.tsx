import "./Information.scss"

const ModalInformation = ({children, title, onClose }: any) => {
  return (
    <>
        <input type="checkbox" id="modal-form-check" hidden className="modal-check" />
        <label className="overlay-form" htmlFor="modal-form-check"></label>
        <section className="modal-form">
          <section className="modal-form__header">
            <h3>{title}</h3>
            {/* <label htmlFor="modal-form-check">
              <i className="fa-solid fa-xmark"></i> */}
              <label htmlFor="modal-form-check" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </label>
          </section>
          {children}
        </section>
    </>
  )
}

export default ModalInformation