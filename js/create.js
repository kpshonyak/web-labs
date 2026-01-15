const API_URL = 'http://localhost:3000/api/films'; 

const createForm = document.getElementById('create-form');

createForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const titleInput = document.getElementById('title');
    const durationInput = document.getElementById('duration');
    const reviewsInput = document.getElementById('reviews');

    if (!createForm.checkValidity()) {
        showModal("Будь ласка, заповніть усі поля форми коректно.");
        return;
    }

    const newFilmData = {
        title: titleInput.value,
        duration: parseInt(durationInput.value),
        imdbReviews: parseInt(reviewsInput.value)
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newFilmData),
        });

        if (response.status === 201) { 
            const createdFilm = await response.json();
            showModal(`Фільм "${createdFilm.title}" успішно створено!`);
            createForm.reset();
            
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 1500);
        } else {
            const errorData = await response.json();
            showModal(`Помилка: ${errorData.message}`);
        }
    } catch (error) {
        showModal("Не вдалося підключитися до сервера для створення фільму.");
    }
});