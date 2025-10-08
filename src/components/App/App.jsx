// React and third-party libraries
import { useEffect, useState } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";

// Styles
import "./App.css";

// Utils and constants
import { apiKey } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../../utils/api";

// Contexts
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

// Modal components
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

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

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const openConfirmationModal = (card) => {
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = (cardToDelete) => {
    deleteItem(cardToDelete._id)
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

  const handleAddItemSubmit = (item, resetForm) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
        resetForm();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
      });
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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
        // Optionally add fallback coordinates here if needed
      }
    );
  }, []);

  // Fetch clothing items from server
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
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <HashRouter>
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onAddClick={handleAddClick}
                  />
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
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              onDeleteClick={openConfirmationModal}
            />
          )}
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirm={handleCardDelete}
            item={cardToDelete}
          />
        </HashRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
