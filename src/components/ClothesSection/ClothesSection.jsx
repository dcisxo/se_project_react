import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  clothingItems,
  onCardClick,
  onAddClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to show only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your items</p>
        <button
          onClick={onAddClick}
          className="clothes-section__add-button"
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
