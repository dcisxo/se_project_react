import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="page">
      <div className="page__content">
      <Header />
      <Main />
      <Footer />
      {/* Modals would typically be rendered conditionally */}
      </div>
    </div>
  );
}

export default App;