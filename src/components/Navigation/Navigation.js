import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="main-nav-bar">
      <ul>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/catalog">Catalog</a></li> 
        <li><a href="/cart">Cart</a></li> 
      </ul>
    </nav>
  );
};

export default Navigation;