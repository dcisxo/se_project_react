import "./ModalWithForm.css";
import closeIcon from "../../assets/close-grey.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
  errorMessage = "",
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__container">
        <h2 className="modal__title-add">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={closeIcon} alt="Close" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          {errorMessage && <p className="modal__error">{errorMessage}</p>}
          <button
            type="submit"
            className={`modal__submit ${
              !isValid ? "modal__submit_disabled" : ""
            }`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
