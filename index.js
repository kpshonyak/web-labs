const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;
const API_BASE_URL = '/api/films';

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname))); 

let films = [
    { id: 1, title: "Дюна", duration: 155, imdbReviews: 800000 },
    { id: 2, title: "Інтерстеллар", duration: 169, imdbReviews: 1800000 },
    { id: 3, title: "Титанік", duration: 195, imdbReviews: 1200000 },
    { id: 4, title: "Початок", duration: 148, imdbReviews: 2000000 },
    { id: 5, title: "Матриця", duration: 136, imdbReviews: 1500000 },
    { id: 6, title: "Аватар", duration: 162, imdbReviews: 1000000 }
];

let nextId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;

app.get(API_BASE_URL, (req, res) => {
    const { search, sort } = req.query;
    let resultFilms = [...films];

    if (search) {
        const searchTerm = search.toLowerCase();
        resultFilms = resultFilms.filter(film => 
            film.title.toLowerCase().includes(searchTerm)
        );
    }

    if (sort) {
        if (sort === 'duration_asc') {
            resultFilms.sort((a, b) => a.duration - b.duration);
        } else if (sort === 'duration_desc') {
            resultFilms.sort((a, b) => b.duration - a.duration);
        } else if (sort === 'reviews_desc') {
            resultFilms.sort((a, b) => b.imdbReviews - a.imdbReviews);
        }
    }
    
    res.status(200).json(resultFilms); 
});

app.get(`${API_BASE_URL}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const film = films.find(f => f.id === id);

    if (film) {
        res.status(200).json(film);
    } else {
        res.status(404).json({ message: 'Фільм не знайдено' }); 
    }
});

app.post(API_BASE_URL, (req, res) => {
    const { title, duration, imdbReviews } = req.body;
    
    if (!title || !duration || !imdbReviews) {
        return res.status(400).json({ message: "Необхідно надати назву, тривалість та відгуки." });
    }

    const newFilm = {
        id: nextId++,
        title,
        duration: parseInt(duration),
        imdbReviews: parseInt(imdbReviews)
    };

    films.push(newFilm);
    res.status(201).json(newFilm); 
});

app.put(`${API_BASE_URL}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const index = films.findIndex(f => f.id === id);

    if (index !== -1) {
        const { title, duration, imdbReviews } = req.body;
        
        films[index] = {
            id, 
            title: title || films[index].title,
            duration: parseInt(duration) || films[index].duration,
            imdbReviews: parseInt(imdbReviews) || films[index].imdbReviews
        };
        res.status(200).json(films[index]); 
    } else {
        res.status(404).json({ message: 'Фільм не знайдено для оновлення' });
    }
});

app.delete(`${API_BASE_URL}/:id`, (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = films.length;
    
    films = films.filter(f => f.id !== id);

    if (films.length < initialLength) {
        res.status(204).send(); 
    } else {
        res.status(404).json({ message: 'Фільм не знайдено для видалення' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});