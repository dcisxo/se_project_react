import './WeatherCard.css';
import { weatherOptions } from '../../utils/constants';

function WeatherCard({ weatherData }) {

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === weatherData.isDay && option.condition === weatherData.condition;
  });

  const weatherOptionUrl = filteredOptions[0]?.url;

  return (
    <section className="weather-card">
      <p className="weather-card_temp">{Math.round(weatherData.temp.F)}&deg; F</p>
      <img src={weatherOptionUrl} alt={filteredOptions[0]?.condition} className="weather-card_image" />
    </section>
  );
}

export default WeatherCard;