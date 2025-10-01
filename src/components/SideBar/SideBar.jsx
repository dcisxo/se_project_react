import "./SideBar.css";
import avatarSvg from "../../assets/avatar.svg";

function SideBar() {
  // Hardcoded user data for now
  const currentUser = {
    name: "Terrence Tegegne",
    avatar: avatarSvg,
  };

  return (
    <div className="sidebar">
      <img
        src={currentUser.avatar}
        alt={currentUser.name}
        className="sidebar__avatar"
      />
      <p className="sidebar__username">{currentUser.name}</p>
    </div>
  );
}

export default SideBar;
