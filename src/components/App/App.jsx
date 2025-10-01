import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import { coordinates, apiKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ModalWithForm from "../ModalWithForms/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { defaultClothingItems } from "../../utils/constants";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
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
          {activeModal === "add-garment" && (
            <ModalWithForm
              buttonText="Add garment"
              title="New garment"
              name="add-garment"
              isOpen={activeModal === "add-garment"}
              onClose={closeActiveModal}
            >
              <label htmlFor="name" className="modal__label">
                Name{" "}
                <input
                  type="text"
                  className="modal__input"
                  id="name"
                  placeholder="Name"
                />
              </label>
              <label htmlFor="imageUrl" className="modal__label">
                Image{" "}
                <input
                  type="url"
                  className="modal__input"
                  id="imageUrl"
                  placeholder="Image URL"
                />
              </label>
              <fieldset className="modal__radio-btns">
                <legend className="modal__legend">
                  Select the weather type:
                </legend>
                <label
                  htmlFor="hot"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="hot"
                    type="radio"
                    name="weather"
                    className="modal__radio-input"
                  />{" "}
                  Hot
                </label>
                <label
                  htmlFor="warm"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="warm"
                    type="radio"
                    name="weather"
                    className="modal__radio-input"
                  />{" "}
                  Warm
                </label>
                <label
                  htmlFor="cold"
                  className="modal__label modal__label_type_radio"
                >
                  <input
                    id="cold"
                    type="radio"
                    name="weather"
                    className="modal__radio-input"
                  />{" "}
                  Cold
                </label>
              </fieldset>
            </ModalWithForm>
          )}
          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
            />
          )}
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
