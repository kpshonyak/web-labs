import React from 'react';
import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PromotionalBlock from './components/PromotionalBlock/PromotionalBlock';
import FeatureTiles from './components/FeatureTiles/FeatureTiles';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <Navigation />
      <main className="main-content-area">
        <PromotionalBlock />
        <FeatureTiles />
      </main>
      <Footer />
    </div>
  );
};

export default App;