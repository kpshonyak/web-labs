const filmsKey = 'filmsData';

const getFilmsFromStorage = () => {
    return JSON.parse(localStorage.getItem(filmsKey)) || [];
};

const loadFilmForEditing = () => {
    const films = getFilmsFromStorage();

    const filmIndexToEdit = 0; 
    
    const filmToEdit = films[filmIndexToEdit];

    if (filmToEdit) {
        document.getElementById('edit-title').value = filmToEdit.title;
        document.getElementById('edit-duration').value = filmToEdit.duration;
        document.getElementById('edit-reviews').value = filmToEdit.imdbReviews;
        document.getElementById('film-index').value = filmIndexToEdit;
    } else {
        showModal("Помилка: Фільм для редагування не знайдено.");
    }
};

const editForm = document.getElementById('edit-form');
editForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const titleInput = document.getElementById('edit-title');
    const durationInput = document.getElementById('edit-duration');
    const reviewsInput = document.getElementById('edit-reviews');
    const filmIndex = document.getElementById('film-index').value;


    if (!titleInput.checkValidity() || !durationInput.checkValidity() || !reviewsInput.checkValidity()) {
        showModal("Будь ласка, заповніть усі поля форми коректно.");
        return;
    }

    const updatedFilm = {
        title: titleInput.value,
        duration: parseInt(durationInput.value),
        imdbReviews: parseInt(reviewsInput.value)
    };

    let films = getFilmsFromStorage();
    if (films[filmIndex]) {
        films[filmIndex] = updatedFilm;
        localStorage.setItem(filmsKey, JSON.stringify(films));
        showModal(`Фільм "${updatedFilm.title}" успішно оновлено!`);
    } else {
        showModal("Помилка: Фільм для оновлення не знайдено.");
    }

});

document.addEventListener('DOMContentLoaded', loadFilmForEditing);