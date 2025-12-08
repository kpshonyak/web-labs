import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { FilmProvider } from './context/FilmContext';
import { AuthProvider } from './context/AuthContext';

import Header from './components/Header/Header';
import Navigation from './components/Navigation/Navigation';
import PromotionalBlock from './components/PromotionalBlock/PromotionalBlock';
import FeatureTiles from './components/FeatureTiles/FeatureTiles';
import Footer from './components/Footer/Footer';


import CatalogPage from './pages/CatalogPage';
import ItemPage from './pages/ItemPage'; 
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage'; 
import SuccessPage from './pages/SuccessPage';   
import LoginPage from './pages/LoginPage';  
import SignUpPage from './pages/SignUpPage'; 
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = () => (
    <main className="main-content-area">
        <PromotionalBlock />
        <FeatureTiles />
    </main>
);

const App = () => {
  return (
    <AuthProvider> 
      <Router>
        <FilmProvider>
          <div className="app-wrapper">
            <Header />
            <Navigation />
            
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              <Route path="/" element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } />
              
              <Route path="/catalog" element={
                <ProtectedRoute>
                  <CatalogPage />
                </ProtectedRoute>
              } />
              
              <Route path="/item/:id" element={
                <ProtectedRoute>
                  <ItemPage />
                </ProtectedRoute>
              } />
              
              <Route path="/cart" element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              } />
              
              <Route path="/checkout" element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              } />
              
              <Route path="/success" element={
                <ProtectedRoute>
                  <SuccessPage />
                </ProtectedRoute>
              } />

            </Routes>
            
            <Footer />
          </div>
        </FilmProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;