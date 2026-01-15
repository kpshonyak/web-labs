import React from 'react';
import { useLocation } from 'react-router-dom'; 
import './Header.css';
import Logo from '..//images/logo.svg';

const Header = () => {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/catalog':
        return 'Catalog Page';
      case '/cart':
        return 'Shopping Cart';
      case '/':
      default:
        return 'Home Page';
    }
  };

  const currentTitle = getPageTitle(location.pathname);

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="logo">
            <img src={Logo} alt="Логотип фільм-магазину" className="logo-img"/>
        </div>
        <div className="site-title">{currentTitle}</div> 
      </div>
    </header>
  );
};

export default Header;