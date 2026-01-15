class Film {
    constructor(title, duration, imdbReviews) {
        this.title = title;
        this.duration = duration;
        this.imdbReviews = imdbReviews;
    }
}

const films = [
    new Film("Дюна", 155, 800000),
    new Film("Інтерстеллар", 169, 1800000),
    new Film("Титанік", 195, 1200000),
    new Film("Початок", 148, 2000000),
    new Film("Матриця", 136, 1500000),
    new Film("Аватар", 162, 1000000)
];


const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const countBtn = document.getElementById('countBtn');
const totalReviewsCountSpan = document.getElementById('totalReviewsCount');


const displayMovies = (moviesToDisplay) => {
    moviesContainer.innerHTML = ''; 
    moviesToDisplay.forEach(film => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h2>${film.title}</h2>
            <p><strong>Тривалість:</strong> ${film.duration} хв</p>
            <p><strong>Відгуки на IMDB:</strong> ${film.imdbReviews}</p>
        `;
        moviesContainer.appendChild(movieCard);
    });
};

const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredFilms = films.filter(film => 
        film.title.toLowerCase().includes(searchTerm)
    );
    displayMovies(filteredFilms);
};

const handleSort = (event) => {
    const sortValue = event.target.value;
    let sortedFilms = [...films];

    if (sortValue === 'duration_asc') {
        sortedFilms.sort((a, b) => a.duration - b.duration);
    } else if (sortValue === 'duration_desc') {
        sortedFilms.sort((a, b) => b.duration - a.duration);
    } else if (sortValue === 'reviews_desc') {
        sortedFilms.sort((a, b) => b.imdbReviews - a.imdbReviews);
    }

    displayMovies(sortedFilms);
};

const handleCount = () => {
    const totalReviews = films.reduce((sum, film) => sum + film.imdbReviews, 0);
    totalReviewsCountSpan.textContent = totalReviews.toLocaleString('uk-UA');
};

searchInput.addEventListener('input', handleSearch);
sortSelect.addEventListener('change', handleSort);
countBtn.addEventListener('click', handleCount);

document.addEventListener('DOMContentLoaded', () => {
    displayMovies(films);
});