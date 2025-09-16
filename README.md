# WTWR - What to Wear?

A React-based weather application that helps you decide what to wear based on current weather conditions. This app fetches real-time weather data and suggests appropriate clothing items for the day.

## About the Project

WTWR is a smart clothing recommendation app that takes the guesswork out of getting dressed. Simply check the app to see the current weather in your area and get personalized clothing suggestions based on temperature and weather conditions. Whether it's hot, warm, or cold outside, WTWR has you covered with the perfect outfit recommendations.

## Features

- **Real-time Weather Data**: Fetches current weather information using the OpenWeatherMap API
- **Smart Clothing Suggestions**: Recommends appropriate clothing items based on temperature ranges (hot ≥86°F, warm 66-85°F, cold <66°F)
- **Interactive Clothing Gallery**: Browse and view detailed information about different clothing items
- **Add New Items**: Modal form to add new clothing items to your wardrobe (UI ready)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Day/Night Weather Images**: Dynamic weather imagery that changes based on time of day

## Technologies Used

- **React 18.3.1** - Frontend framework
- **Vite** - Build tool and development server
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling with responsive design
- **OpenWeatherMap API** - Weather data source
- **Cabinet Grotesk** - Custom font family

## Screenshots

![WTWR Main Screen](<Screenshot 2025-09-16 122056.png>)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/dcisxo/se_project_react.git
```

2. Navigate to the project directory

```bash
cd se_project_react
```

3. Install dependencies

```bash
npm install
```

4. Start the development server

```bash
npm run dev
```

5. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── assets/           # Images and icons
├── components/
│   ├── App/           # Main application component
│   ├── Header/        # Navigation header
│   ├── Main/          # Main content area
│   ├── WeatherCard/   # Weather display component
│   ├── ItemCard/      # Individual clothing item cards
│   ├── ItemModal/     # Modal for viewing item details
│   ├── ModalWithForm/ # Modal for adding new items
│   └── Footer/        # Footer component
├── utils/
│   ├── constants.js   # App constants and clothing data
│   └── weatherApi.js  # Weather API functions
└── vendor/          # Third-party CSS (normalize, fonts)
```

## API Integration

The app uses the OpenWeatherMap API to fetch current weather data. The weather information is processed to determine:

- Current temperature (displayed in Fahrenheit)
- Weather conditions (clear, cloudy, rainy, snowy, etc.)
- Day/night status for appropriate imagery
- Clothing recommendations based on temperature ranges

## Future Enhancements

- User authentication and personal wardrobe management
- Weather forecasting for planning ahead
- Location search functionality
- Favorite items and outfit combinations
- Weather alerts and notifications

## Contributing

This project was developed as part of the TripleTen Software Engineering program. Feel free to fork the repository and submit pull requests for any improvements.

## Contact

**Damian Campos** - [Your Email] - [Your LinkedIn]

Project Link: [https://github.com/dcisxo/se_project_react](https://github.com/dcisxo/se_project_react)

---

_Developed with ❤️ as part of the TripleTen Software Engineering Bootcamp_
