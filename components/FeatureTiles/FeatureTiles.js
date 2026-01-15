import React, { useState } from 'react'; 
import './FeatureTiles.css';

const FeatureTile = ({ title, content }) => (
  <div className="feature-tile" style={{ width: '30%', textAlign: 'left' }}>
    <div className="tile-image">
      <p>Content Image</p>
    </div>
    <h3>{title}</h3> 
    <p>{content}</p>
  </div>
);

const MORE_TILES_DATA = [
    { title: "Exclusive Interviews", content: "Глибокий погляд за лаштунки з режисерами та акторами." },
    { title: "Classic Retrospective", content: "Огляд культових фільмів, що змінили історію кіно." },
];

const initialTiles = [
    { title: "Tile 1 heading", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { title: "Tile 2 heading", content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { title: "Tile 3 heading", content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
];


const FeatureTiles = () => {
  const [extraContent, setExtraContent] = useState([]);
  
  const handleViewMore = () => {
      if (extraContent.length === 0) {
          setExtraContent(MORE_TILES_DATA);
      } else {
          setExtraContent(prev => [...prev, { 
              title: `Bonus Feature ${prev.length + 1}`,
              content: `This is dynamically loaded extra content block number ${prev.length + 1}.`,
          }]);
      }
  };

  const allTiles = [...initialTiles, ...extraContent];

  return (
    <div style={{textAlign: 'center'}}>
        <div className="feature-tiles-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
          {allTiles.map((tile, index) => (
            <FeatureTile key={index} title={tile.title} content={tile.content} />
          ))}
        </div>
        
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            {extraContent.length === 0 ? "View More" : `Load Even More (${allTiles.length} total)`}
          </button> 
        </div>
    </div>
  );
};

export default FeatureTiles;