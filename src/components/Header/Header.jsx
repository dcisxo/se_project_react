import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr-logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__user-section">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__user-link">
              <div className="header__user-info">
                <p className="header__username">{currentUser?.name}</p>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header__avatar"
                  />
                ) : (
                  <div className="header__avatar header__avatar_placeholder">
                    {currentUser?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={onRegisterClick}
              className="header__add-clothes-btn"
            >
              Sign Up
            </button>
            <button onClick={onLoginClick} className="header__add-clothes-btn">
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
