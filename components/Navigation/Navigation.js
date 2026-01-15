import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const getActiveClassName = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="main-nav-bar">
      <ul>
        <li><Link to="/" className={getActiveClassName('/')}>Home</Link></li>
        <li><Link to="/catalog" className={getActiveClassName('/catalog')}>Catalog</Link></li>
        <li><Link to="/cart" className={getActiveClassName('/cart')}>Cart</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;