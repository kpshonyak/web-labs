const showModal = (message) => {

    const modal = document.getElementById("myModal");
    const modalText = document.getElementById("modal-text");
    const closeBtn = document.getElementsByClassName("close-btn")[0];
    
    if (!modal || !modalText) {
        console.error("Помилка: Не знайдено HTML елементи модального вікна (#myModal або #modal-text).");
        return;
    }

    modalText.textContent = message;
    modal.style.display = "block";
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };
    }

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
};