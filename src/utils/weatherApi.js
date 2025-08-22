export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: data.main.temp,
    C: (data.main.temp - 32) * (5 / 9),
  };
  result.weatherType = getWeatherType(result.temp.F);
  result.condition = getWeatherCondition(data.weather[0].main.toLowerCase());
  result.isDay = isDay(data.sys, Date.now());
  return result;
};

const isDay = ({ sunrise, sunset }) => {
  const now = Date.now();
  return now > sunrise * 1000 && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature > 60 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

const getWeatherCondition = (condition) => {
  switch (condition) {
    case "clear":
      return "clear";
    case "clouds":
      return "cloudy";
    case "rain":
    case "drizzle":
      return "rainy";
    case "snow":
      return "snowy";
    case "thunderstorm":
      return "stormy";
    case "mist":
    case "fog":
    case "haze":
      return "foggy";
    default:
      return "clear";
  }
};
