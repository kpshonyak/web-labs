import React from 'react';
import PrimaryButton from '../UI/PrimaryButton';
import { Link } from 'react-router-dom';

const itemCardStyle = {
  border: '1px solid #ccc',
  padding: '15px',
  borderRadius: '4px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.05)',
  width: 'calc(25% - 15px)',
  textAlign: 'left',
  marginBottom: '20px',
};

const imagePlaceholderStyle = {
  width: '100%',
  aspectRatio: '1 / 1',
  backgroundColor: '#eee',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5em',
  color: '#aaa',
};

const ItemCard = ({ item }) => {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <div style={itemCardStyle}>
      <div style={imagePlaceholderStyle}>
        <p>Poster</p>
      </div>
      
      <h3>{item.title}</h3> 
      
      <p style={{ fontSize: '0.9em', color: '#666', height: '90px', overflow: 'hidden' }}>
        {item.description}
      </p>
      
      <div style={{ marginBottom: '15px', fontSize: '0.9em' }}>
        <p>Reviews: {formatNumber(item.imdbReviews)}</p>
        <p>Genre: {item.genre || 'N/A'}</p>
      </div>
      <Link to={`/item/${item.id}`} style={{ textDecoration: 'none' }}>
        <PrimaryButton style={{ width: '100%' }}>
          View more
        </PrimaryButton>
      </Link>
    </div>
  );
};

export default ItemCard;