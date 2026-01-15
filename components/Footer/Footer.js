import React from 'react';
import './Footer.css';
import Logofooter from '../images/logo.svg';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="branding-stuff">
          <h3>Branding stuff</h3> 
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, commodo.</p>
        </div>
        
        <div className="footer-logo">
          <img src={Logofooter} alt="Store Logo" className="footer-logo-img" /> 
        </div>
        
        <div className="social-media">
          <a href="#"><span role="img" aria-label="facebook">FB</span></a>
          <a href="#"><span role="img" aria-label="twitter">TW</span></a>
          <a href="#"><span role="img" aria-label="linkedin">LI</span></a>
          <a href="#"><span role="img" aria-label="googleplus">G+</span></a>
        </div>
      </div>
      <div className="copyright">
        &copy; 2025 Films E-commerce | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;