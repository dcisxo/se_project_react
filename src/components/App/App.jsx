// React and third-party libraries
import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

// Styles
import "./App.css";

// Utils and constants
import { apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem, updateUser } from "../../utils/api";
import * as auth from "../../utils/auth";
import { addCardLike, removeCardLike } from "../../utils/api";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Modal components
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    weatherType: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);
  const [authError, setAuthError] = useState("");

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setAuthError("");
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  // Registration handler
  const handleRegister = (values, reset) => {
    setAuthError(""); // Clear previous errors
    auth
      .signup(values)
      .then(() => {
        return auth.signin({ email: values.email, password: values.password });
      })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
          reset();
        }
      })
      .catch((error) => {
        console.error("Error during registration:", error);
        setAuthError("Registration failed. Please try again.");
      });
  };

  // Login handler
  const handleLogin = (values, reset) => {
    setAuthError(""); // Clear previous errors
    auth
      .signin(values)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          // Fetch user data after login
          return auth.validateToken(data.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeActiveModal();
        reset();
      })
      .catch((error) => {
        console.error("Error during login:", error);
        setAuthError("Invalid email or password. Please try again.");
      });
  };

  // Update user profile handler
  const handleUpdateUser = (values, reset) => {
    const token = localStorage.getItem("jwt");
    updateUser(values, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
        reset();
      })
      .catch((error) => {
        console.error("Error updating user profile:", error);
      });
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  // Delete item handler
  const handleCardDelete = (cardToDelete) => {
    const token = localStorage.getItem("jwt");
    deleteItem(cardToDelete._id, token)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== cardToDelete._id
        );
        setClothingItems(updatedItems);
        closeActiveModal();
        setCardToDelete(null);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  // Card like/unlike handler
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            // Update selectedCard if it's the same card
            setSelectedCard((prevCard) =>
              prevCard._id === id ? updatedCard : prevCard
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
            // Update selectedCard if it's the same card
            setSelectedCard((prevCard) =>
              prevCard._id === id ? updatedCard : prevCard
            );
          })
          .catch((err) => console.log(err));
  };

  // Add new item handler
  const handleAddItemSubmit = (item, resetForm) => {
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  // Temperature unit toggle handler
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  // Check token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    auth
      .validateToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        localStorage.removeItem("jwt");
      });
  }, []);

  // Fetch weather data using geolocation
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        getWeather(coords, apiKey)
          .then((data) => {
            const filteredData = filterWeatherData(data);
            setWeatherData(filteredData);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
  }, []);

  // Fetch clothing items from server (no auth required)
  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <BrowserRouter>
            <div className="page__content">
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                isLoggedIn={isLoggedIn}
                onRegisterClick={() => setActiveModal("register")}
                onLoginClick={() => setActiveModal("login")}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLike={handleCardLike}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        clothingItems={clothingItems}
                        onCardClick={handleCardClick}
                        onAddClick={handleAddClick}
                        onEditProfile={handleEditProfileClick}
                        onCardLike={handleCardLike}
                        onLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
            <Footer />
            <AddItemModal
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
              onCloseModal={closeActiveModal}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onCloseModal={closeActiveModal}
              onRegister={handleRegister}
              errorMessage={authError}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onCloseModal={closeActiveModal}
              onLogin={handleLogin}
              errorMessage={authError}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onCloseModal={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
            {activeModal === "preview" && (
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
                onDeleteClick={openConfirmationModal}
                onCardLike={handleCardLike}
              />
            )}
            <DeleteConfirmationModal
              isOpen={activeModal === "delete-confirmation"}
              onClose={closeActiveModal}
              onConfirm={handleCardDelete}
              item={cardToDelete}
            />
          </BrowserRouter>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
