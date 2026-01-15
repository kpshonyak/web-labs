import React from 'react';
import './FeatureTiles.css';

const FeatureTile = ({ title }) => (
  <div className="feature-tile">
    <div className="tile-image">
      <p></p>
    </div>
    <h3>{title}</h3> 
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
);

const FeatureTiles = () => {
  return (
    <div className="feature-tiles-container">
      <FeatureTile title="Tile 1 heading" />
      <FeatureTile title="Tile 2 heading" />
      <FeatureTile title="Tile 3 heading" />
      
      <div className="view-more-container">
        <button className="view-more-btn">View More</button> 
      </div>
    </div>
  );
};

export default FeatureTiles;