import React, { createContext, useState, useContext } from 'react';
import initialFilms from '../data/films'; 


const FilmContext = createContext();

export const useFilms = () => useContext(FilmContext);

export const FilmProvider = ({ children }) => {
  const [films] = useState(initialFilms);

  const getFilmById = (id) => {
    return films.find(film => film.id === parseInt(id));
  };

  return (
    <FilmContext.Provider value={{ films, getFilmById }}>
      {children}
    </FilmContext.Provider>
  );
};