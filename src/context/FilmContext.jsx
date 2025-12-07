import React, { createContext, useContext, useCallback } from 'react'; 
import { fetchFilmById, fetchFilms as apiFetchFilms } from '../services/api'; 

const FilmContext = createContext();

export const useFilms = () => useContext(FilmContext);

export const FilmProvider = ({ children }) => {
  const getFilmById = useCallback(async (id) => {
    return await fetchFilmById(id);
  }, []);

  const contextValue = { 
    getFilmById, 
    fetchFilms: apiFetchFilms 
  };

  return (
    <FilmContext.Provider value={contextValue}>
      {children}
    </FilmContext.Provider>
  );
};