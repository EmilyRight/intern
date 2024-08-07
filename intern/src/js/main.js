document.addEventListener('DOMContentLoaded', () => {
  openMenu();
});

function openMenu() {
  const burgerIcon = document.querySelector('.burger-icon');
  const navMenu = document.querySelector('.header-nav');
  burgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('_opened');
    burgerIcon.classList.toggle('_opened');
  });
}
