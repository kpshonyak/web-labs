const burger = document.querySelector('.burger');
const actions = document.querySelector('.actions');

burger.addEventListener('click', () => {
  actions.classList.toggle('active');
});
