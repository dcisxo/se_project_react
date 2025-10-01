import "./ModalWithForm.css";
import closeIcon from "../../assets/close-grey.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  modalName,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div
      className={`modal modal_type_${modalName} ${
        isOpen ? "modal_opened" : ""
      }`}
    >
      <div className="modal__container">
        <h2 className="modal__title-add">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <form className="modal__form" name={modalName} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
