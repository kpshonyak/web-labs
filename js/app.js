const API_URL = 'http://localhost:3000/api/films'; 

const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const countBtn = document.getElementById('countBtn');
const totalReviewsCountSpan = document.getElementById('totalReviewsCount');

let currentFilms = []; 

const displayMovies = (moviesToDisplay) => {
    currentFilms = moviesToDisplay; 
    
    moviesContainer.innerHTML = ''; 
    
    if (moviesToDisplay.length === 0) {
        moviesContainer.innerHTML = '<p style="text-align: center; width: 100%;">Фільмів не знайдено.</p>';
        return;
    }
    
    moviesToDisplay.forEach((film) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.innerHTML = `
            <h2>${film.title}</h2>
            <p><strong>Тривалість:</strong> ${film.duration} хв</p>
            <p><strong>Відгуки на IMDB:</strong> ${film.imdbReviews}</p>
            <div style="margin-top: 10px; display: flex; gap: 10px;">
                <a href="edit.html?id=${film.id}" class="edit-link">Редагувати</a>
                <button class="delete-btn" data-id="${film.id}">Видалити</button>
            </div>
        `;
        moviesContainer.appendChild(movieCard);
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
};

const fetchFilms = async () => {
    const searchTerm = searchInput.value.trim();
    const sortValue = sortSelect.value;
    const params = new URLSearchParams();
    if (searchTerm) {
        params.append('search', searchTerm);
    }
    if (sortValue) {
        params.append('sort', sortValue);
    }
    
    const fullUrl = `${API_URL}?${params.toString()}`;
    
    moviesContainer.innerHTML = '<p style="text-align: center; width: 100%;">Завантаження...</p>';

    try {
        const response = await fetch(fullUrl); 
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }
        let films = await response.json();


        displayMovies(films);
    } catch (error) {
        console.error('Помилка завантаження фільмів:', error);
        moviesContainer.innerHTML = '<p class="error-message" style="color: red; text-align: center; width: 100%;">Не вдалося завантажити фільми. Перевірте, чи запущено Node.js сервер.</p>';
    }
};

const handleDelete = async (event) => {
    const filmId = event.target.dataset.id;
    if (!confirm(`Ви впевнені, що хочете видалити фільм з ID ${filmId}?`)) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${filmId}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            showModal("Фільм успішно видалено.");
            
            setTimeout(() => {
                const modal = document.getElementById("myModal");
                if (modal) {
                     modal.style.display = "none";
                }
                window.location.reload(); 
            }, 1500);
            
        } else {
            const errorData = await response.json();
            showModal(`Помилка видалення: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Помилка при видаленні фільму:', error);
        showModal("Не вдалося підключитися до сервера для видалення.");
    }
};


const handleSearch = () => {
    fetchFilms(); 
};

const handleSort = () => {
    fetchFilms();
};

const handleCount = () => {
    const totalReviews = currentFilms.reduce((sum, film) => sum + film.imdbReviews, 0);
    totalReviewsCountSpan.textContent = totalReviews.toLocaleString('uk-UA');
};

searchInput.addEventListener('input', handleSearch);
sortSelect.addEventListener('change', handleSort);
countBtn.addEventListener('click', handleCount);

document.addEventListener('DOMContentLoaded', fetchFilms);