import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/actions';
import { useFilms } from '../context/FilmContext';
import { fetchCoefficients } from '../services/api'; 
import PrimaryButton from '../components/UI/PrimaryButton';
import Loader from '../components/UI/Loader';
import Select from '../components/UI/Select';

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

const ROW_LABELS = {
  front: 'Front Row',
  middle: 'Middle Row',
  back: 'Back Row (VIP)'
};

const ItemPage = () => {
  const { id } = useParams();
  const { getFilmById } = useFilms();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [film, setFilm] = useState(null);
  const [coefficients, setCoefficients] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedRowType, setSelectedRowType] = useState('front');

  useEffect(() => {
    const loadData = async () => {
        setIsLoading(true);
        try {
            const [fetchedFilm, fetchedCoeffs] = await Promise.all([
                getFilmById(id),
                fetchCoefficients()
            ]);
            
            setFilm(fetchedFilm);
            setCoefficients(fetchedCoeffs);

        } catch (error) {
            setFilm(null);
        } finally {
            setIsLoading(false);
        }
    };
    loadData();
  }, [id, getFilmById]);

  let finalPrice = 0;
  let ticketOptions = [];

  if (film && coefficients) {
    const currentCoefficient = coefficients[selectedRowType];
    finalPrice = Math.round(film.price * currentCoefficient);

    ticketOptions = Object.keys(coefficients).map(key => ({
        value: key,
        label: `${ROW_LABELS[key]} ($${Math.round(film.price * coefficients[key])})`
    }));
  }

  const addToCartHandler = () => {
    if (!film || !coefficients) return;

    const cartItemId = `${film.id}-${selectedRowType}`;

    dispatch(addItem({
      id: cartItemId,
      title: `${film.title} (${ROW_LABELS[selectedRowType]})`, 
      price: finalPrice, 
      genre: film.genre,
      variant: selectedRowType
    }));

    alert(`Added to cart for $${finalPrice}`);
  };

  if (isLoading) return <Loader />;
  if (!film) return <div>Film not found</div>;

  return (
    <div className="main-content-area" style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', border: 'none', background: 'none', color: '#007bff', cursor: 'pointer' }}>&larr; Back</button>

      <div style={itemDetailStyle}>
        <div style={{ width: '40%', height: '400px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Poster</div>
        
        <div style={{ width: '60%' }}>
          <h1>{film.title}</h1>
          <p>{film.description}</p>
          
          <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #eee', background: '#f9f9f9' }}>
             <p><strong>Base Price:</strong> ${film.price}</p>
             {coefficients && (
                 <p><strong>Multiplier:</strong> x{coefficients[selectedRowType]}</p>
             )}
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>Select Row:</label>
            
            {coefficients && (
                <Select 
                    options={ticketOptions}
                    value={selectedRowType}
                    onChange={(e) => setSelectedRowType(e.target.value)}
                />
            )}

            <div style={{ marginTop: '20px', fontSize: '1.8em', fontWeight: 'bold', color: '#007bff' }}>
                Total: ${finalPrice}
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <PrimaryButton onClick={addToCartHandler}>
              Add to Cart
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;