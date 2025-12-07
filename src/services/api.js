import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/films'; 

export const fetchFilms = async (filters = {}) => {
  try {
    const params = new URLSearchParams();

    if (filters.genre && filters.genre !== 'all') {
      params.append('genre', filters.genre); 
    }
    if (filters.search) {
      params.append("q", filters.search); 
    }

    if (filters.sort) {
      params.append('_sort', filters.sort);
    }
    if (filters.order) {
      params.append('_order', filters.order);
    }
    
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;

  } catch (error) {
    console.error("Error fetching films:", error);
    throw new Error('Failed to fetch films from API.');
  }
};

export const fetchFilmById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching film with id ${id}:`, error);
    if (error.response && error.response.status === 404) {
      return null; 
    }
    throw new Error('Failed to fetch film details.');
  }
};