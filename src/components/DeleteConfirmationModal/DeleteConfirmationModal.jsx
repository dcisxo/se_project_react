import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-grey.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, item }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__container modal__container_type_delete">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="modal__content_type_delete">
          <p className="modal__text">
            Are you sure you want to delete this item?
            <br />
            This action is irreversible.
          </p>
          <div className="modal__buttons">
            <button
              type="button"
              className="modal__confirm-btn"
              onClick={() => onConfirm(item)}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="modal__cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
