const films = [];

const createForm = document.getElementById('create-form');

createForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    const titleInput = document.getElementById('title');
    const durationInput = document.getElementById('duration');
    const reviewsInput = document.getElementById('reviews');

    if (!titleInput.checkValidity() || !durationInput.checkValidity() || !reviewsInput.checkValidity()) {
        showModal("Будь ласка, заповніть усі поля форми коректно.");
        return;
    }

    const newFilm = {
        назва: titleInput.value,
        тривалість: parseInt(durationInput.value),
        кількість_відгуків: parseInt(reviewsInput.value)
    };

    console.log("Новий фільм створено:", newFilm);
    showModal("Фільм успішно створено!");

    createForm.reset();
});