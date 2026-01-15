import React from 'react';
import './Header.css';
import Logo from '..//images/logo.svg';

const Header = () => {
  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
            <img src={Logo} alt="Логотип фільм-магазину" className="logo-img"/>
            </div>
        <div className="site-title">Home page</div> 
      </div>
    </header>
  );
};

export default Header;