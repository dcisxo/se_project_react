import { useContext } from "react";
import "./ItemModal.css";
import closeIcon from "../../assets/close.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, onClose, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content">
        <button onClick={onClose} type="button" className="modal__close-btn">
          <img src={closeIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__info">
          <div className="modal__header">
            <h2 className="modal__title">{card.name}</h2>
            {isOwn && (
              <button
                className="modal__delete-btn"
                onClick={() => onDeleteClick(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
