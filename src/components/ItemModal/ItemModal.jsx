import "./ItemModal.css";
import closeIcon from "../../assets/close.png";

function ItemModal({ activeModal, onClose, card }) {
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        {card && (
          <>
            <img src={card.link} alt={card.name} className="modal__image" />
            <div className="modal__info">
              <h2 className="modal__title">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ItemModal;
