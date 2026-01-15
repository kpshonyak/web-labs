import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { FilmProvider } from './context/FilmContext';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PromotionalBlock from './components/PromotionalBlock/PromotionalBlock';
import FeatureTiles from './components/FeatureTiles/FeatureTiles';
import Footer from './components/Footer/Footer';


import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage'; 

const HomePage = () => (
    <main className="main-content-area">
        <PromotionalBlock />
        <FeatureTiles />
    </main>
);

const App = () => {
  return (
    <Router>
      <FilmProvider> 
        <div className="app-wrapper">
          <Header />
          <Navigation />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/item/:id" element={<ItemPage />} /> 
            <Route path="/cart" element={
              <main className="main-content-area">
                  <h2>Shopping Cart Page</h2>
              </main>
            } />
          </Routes>
          
          <Footer />
        </div>
      </FilmProvider> 
    </Router>
  );
};

export default App;