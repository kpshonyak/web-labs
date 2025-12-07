import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="spinner"></div> 
            <p className="loading-text">Loading items...</p> 
        </div>
    );
};

export default Loader;