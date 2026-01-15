const modal = document.getElementById("myModal");
const modalText = document.getElementById("modal-text");
const closeBtn = document.getElementsByClassName("close-btn")[0];

const showModal = (message) => {
    modalText.textContent = message;
    modal.style.display = "block";
};

closeBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};