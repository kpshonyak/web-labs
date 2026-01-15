import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFilms } from '../context/FilmContext';
import PrimaryButton from '../components/UI/PrimaryButton'; 

const itemDetailStyle = {
  padding: '40px',
  maxWidth: '1000px',
  margin: '40px auto',
  border: '1px solid #ddd',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  gap: '40px',
};

const ItemPage = () => {
  const { id } = useParams(); 
  const { getFilmById } = useFilms(); 
  const navigate = useNavigate();
  
  const film = getFilmById(id);

  if (!film) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2>404 - Item Not Found</h2>
        <PrimaryButton onClick={() => navigate('/catalog')}>
            Go to Catalog
        </PrimaryButton>
      </div>
    );
  }
  
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  return (
    <div className="main-content-area" style={{ padding: '20px' }}>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '20px', background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: '1em' }}
      >
        &larr; Back to Catalog
      </button>

      <div style={itemDetailStyle}>
        <div style={{width: '40%', aspectRatio: '0.7 / 1', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '2em', color: '#aaa', borderRadius: '4px'}}>
          <p>Movie Poster</p>
        </div>
        
        <div style={{ width: '60%' }}>
          <h1>{film.title}</h1>
          <p style={{ fontSize: '1.2em', color: '#555', marginBottom: '30px' }}>{film.description}</p>
          
          <div style={{ margin: '30px 0', padding: '20px', border: '1px dashed #ccc', borderRadius: '4px' }}>
              <p><strong>Genre:</strong> {film.genre || 'Not specified'}</p>
              <p><strong>Duration:</strong> {film.duration} minutes</p>
              <p><strong>IMDb Reviews:</strong> {formatNumber(film.imdbReviews)}</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: '30px' }}>
            <PrimaryButton 
              onClick={() => alert(`Adding ${film.title} to cart`)}
              style={{ padding: '15px 30px', fontSize: '1.2em', minWidth: '200px' }}
            >
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;