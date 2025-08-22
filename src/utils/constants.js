export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear-day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy-day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "foggy",
    url: new URL("../assets/day/foggy-day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "rainy",
    url: new URL("../assets/day/rainy-day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snowy",
    url: new URL("../assets/day/snowy-day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "stormy",
    url: new URL("../assets/day/stormy-day.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear-night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy-night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "foggy",
    url: new URL("../assets/night/foggy-night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "rainy",
    url: new URL("../assets/night/rainy-night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "snowy",
    url: new URL("../assets/night/snowy-night.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "stormy",
    url: new URL("../assets/night/stormy-night.png", import.meta.url).href,
  },
];

export const defaultClothingItems = [
  {
    _id: 0,
    name: "Cap",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
  },
  {
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
  },
  {
    _id: 2,
    name: "Jacket",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
  },
  {
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
  },
  {
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
  },
  {
    _id: 5,
    name: "Coat",
    weather: "cold",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
  }
]

export const coordinates = {
  latitude: 33.380672,
  longitude: -84.799657,
};

export const APIkey = "d25ab7b34403eea15c795c764dee83a9";