import React from 'react';
import { Link } from 'react-router-dom';
import PrimaryButton from '../UI/PrimaryButton';

const ItemCard = ({ item, coefficients }) => {
  let priceDisplay = `$${item.price}`;
  
  if (coefficients) {
    const minPrice = Math.round(item.price * coefficients.front);
    const maxPrice = Math.round(item.price * coefficients.back);
    priceDisplay = `$${minPrice} - $${maxPrice}`;
  }

  const itemCardStyle = {
    width: 'calc(25% - 15px)', 
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
  };

  return (
    <div style={itemCardStyle}>
      <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#f0f0f0', marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
        Poster
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1em' }}>{item.title}</h3>
        <p style={{ fontWeight: 'bold', color: '#28a745', fontSize: '1.1em', margin: '5px 0' }}>
           {priceDisplay}
        </p>

        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '5px' }}>
            Reviews: {item.imdbReviews.toLocaleString()}
        </p>
        <p style={{ fontSize: '0.9em', color: '#666' }}>Genre: {item.genre}</p>
      </div>

      <div style={{ marginTop: '15px' }}>
        <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
          <PrimaryButton style={{ width: '100%', padding: '10px' }}>
            View More
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;