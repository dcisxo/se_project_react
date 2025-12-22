import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if the item was liked by the current user
  const isLiked = item.likes?.some((id) => id === currentUser?._id);

  // Create className for like button
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
