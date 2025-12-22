import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  onCardClick,
  onAddClick,
  onEditProfile,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          onCardClick={onCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
