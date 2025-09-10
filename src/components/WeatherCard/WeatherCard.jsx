import "./WeatherCard.css";
import { weatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = weatherOptions[0];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(weatherData.temp.F)}&deg; F
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherData.condition} weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
