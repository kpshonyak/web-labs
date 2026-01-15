import React, { useState, useMemo } from 'react';
import ItemCard from '../components/Catalog/ItemCard'; 
import PrimaryButton from '../components/UI/PrimaryButton';
import Select from '../components/UI/Select';
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

const filtersGroup = {
  display: 'flex',
  gap: '15px',
};

const itemsGrid = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  justifyContent: 'flex-start',
};

const CatalogPage = () => {
  const { films } = useFilms(); 
  
  const [genreFilter, setGenreFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFilms = useMemo(() => {
    let currentFilms = films;

    if (genreFilter !== 'all') {
      currentFilms = currentFilms.filter(film => film.genre === genreFilter);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      currentFilms = currentFilms.filter(film => 
        film.title.toLowerCase().includes(query) ||
        film.description.toLowerCase().includes(query)
      );
    }
    
    return currentFilms;
  }, [films, genreFilter, searchQuery]); 

  const genreOptions = [
    { value: 'all', label: 'All Genres' },
    { value: 'Sci-Fi', label: 'Sci-Fi' },
    { value: 'Drama', label: 'Drama' },
    { value: 'Action', label: 'Action' },
    { value: 'Musical', label: 'Musical' },
  ];
  
  return (
    <div style={catalogContainerStyle}>
      <h2>Catalog Page ({filteredFilms.length} items)</h2>

      <div style={controlsBar}>
        <div style={{...filtersGroup, alignItems: 'center'}}>
          <Select 
            options={genreOptions} 
            value={genreFilter} 
            onChange={(e) => setGenreFilter(e.target.value)} 
            label="Genre Filter" 
          />
          
          <input
            type="text"
            placeholder="Search by Title or Description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', minWidth: '250px' }}
          />

        </div>
        <PrimaryButton onClick={() => console.log('Filters refreshed')}>Refresh</PrimaryButton>
      </div>

      <div style={itemsGrid}>
        {filteredFilms.length > 0 ? (
          filteredFilms.map((film) => (
            <ItemCard key={film.id} item={film} />
          ))
        ) : (
            <p>No films match your search/filter criteria.</p>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;