import React from 'react';
import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';

function Main() {
  return (
    <main className="main">
      <WeatherCard />
      <section className="cards">
        <ItemCard />
        {/* You can add more ItemCard components here as needed */}
      </section>
    </main>
  );
}

export default Main;