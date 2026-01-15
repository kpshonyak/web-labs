const API_URL = 'http://localhost:3000/api/films'; 

const editForm = document.getElementById('edit-form');
const editTitleElement = document.getElementById('edit-title');
const movieIdInput = document.getElementById('movieId');
const titleInput = document.getElementById('title');
const durationInput = document.getElementById('duration');
const reviewsInput = document.getElementById('reviews');

const getQueryParam = (name) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
};

const loadFilmData = async () => {
    const filmId = getQueryParam('id');

    if (filmId === null) {
        editTitleElement.textContent = "Помилка: Не вказано ID фільму";
        editForm.innerHTML = `<p>Не вдалося завантажити дані фільму. Перевірте <a href="index.html">список фільмів</a>.</p>`;
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/${filmId}`);
        
        if (!response.ok) {
            throw new Error('Фільм не знайдено');
        }

        const film = await response.json();

        movieIdInput.value = film.id; 
        titleInput.value = film.title;
        durationInput.value = film.duration;
        reviewsInput.value = film.imdbReviews;

        editTitleElement.textContent = `Редагувати фільм: ${film.title}`;

    } catch (error) {
        editTitleElement.textContent = "Помилка: Фільм не знайдено";
        editForm.innerHTML = `<p>Не вдалося завантажити дані фільму. Перевірте <a href="index.html">список фільмів</a>.</p>`;
    }
};

editForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    if (!editForm.checkValidity()) {
        showModal("Будь ласка, заповніть усі поля форми коректно.");
        return;
    }
    
    const filmId = movieIdInput.value;
    const updatedFilmData = {
        title: titleInput.value,
        duration: parseInt(durationInput.value),
        imdbReviews: parseInt(reviewsInput.value)
    };

    try {
        const response = await fetch(`${API_URL}/${filmId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedFilmData),
        });

        if (response.ok) { 
            const updatedFilm = await response.json();
            showModal(`Фільм "${updatedFilm.title}" успішно оновлено.`);
            
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            const errorData = await response.json();
            showModal(`Помилка оновлення: ${errorData.message}`);
        }

    } catch (error) {
        showModal("Не вдалося підключитися до сервера для оновлення.");
    }
});

document.addEventListener('DOMContentLoaded', loadFilmData);