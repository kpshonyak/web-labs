import React, { useState, useEffect, useCallback } from 'react';
import ItemCard from '../components/Catalog/ItemCard'; 
import PrimaryButton from '../components/UI/PrimaryButton';
import Select from '../components/UI/Select';
import Loader from '../components/UI/Loader'; 
import { useFilms } from '../context/FilmContext'; 

const catalogContainerStyle = { 
  padding: '20px',
  maxWidth: '1200px',
  margin: '0 auto',
};

const controlsBar = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '15px',
  marginBottom: '30px',
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};

const itemsGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
};

const CatalogPage = () => {
  const { fetchFilms } = useFilms(); 
  
  const [films, setFilms] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [genreFilter, setGenreFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');
  
  const loadFilms = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    const filters = {
      genre: genreFilter,
      search: searchQuery,
    };

    if (sortType === 'reviews_desc') {
      filters.sort = 'imdbReviews'; 
      filters.order = 'desc';       
    } else if (sortType === 'reviews_asc') {
      filters.sort = 'imdbReviews';
      filters.order = 'asc';       
    } 

    else if (sortType === 'title_asc') {
      filters.sort = 'title';
      filters.order = 'asc';
    }

    try {
      const fetchedFilms = await fetchFilms(filters);
      setFilms(fetchedFilms);
    } catch (err) {
      setError(err.message || 'Failed to fetch data.');
      setFilms([]); 
    } finally {
      setIsLoading(false);
    }
  }, [genreFilter, searchQuery, sortType, fetchFilms]); 


  useEffect(() => {
    const timer = setTimeout(() => {
      loadFilms();
    }, 500);
    return () => clearTimeout(timer);
  }, [loadFilms]); 


  const genreOptions = [
    { value: 'all', label: 'All Genres' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Action', label: 'Action' },
    { value: 'Musical', label: 'Musical' },
  ];

  const sortOptions = [
    { value: 'default', label: 'Default Sorting' },
    { value: 'reviews_desc', label: 'Reviews: High to Low' }, 
    { value: 'reviews_asc', label: 'Reviews: Low to High' },  
    { value: 'title_asc', label: 'Title: A-Z' },              
  ];
  
  return (
    <div style={catalogContainerStyle}>
      <h2>Catalog Page ({films.length} items)</h2>

      <div style={controlsBar}>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap'}}>
          
          <Select 
            options={genreOptions} 
            value={genreFilter} 
            onChange={(e) => setGenreFilter(e.target.value)} 
          />
          
          <Select 
            options={sortOptions} 
            value={sortType} 
            onChange={(e) => setSortType(e.target.value)} 
          />

          <input
            type="text"
            placeholder="Search by Title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '200px' }}
          />

        </div>
        <PrimaryButton onClick={loadFilms}>Refresh</PrimaryButton>
      </div>

      {isLoading && <Loader />} 
      
      {error && <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>}
      
      {!isLoading && !error && films.length === 0 && (
        <p style={{ textAlign: 'center', padding: '50px' }}>No films found matching your criteria.</p>
      )}

      {!isLoading && films.length > 0 && (
        <div style={itemsGrid}>
          {films.map((film) => (
            <ItemCard key={film.id} item={film} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogPage;