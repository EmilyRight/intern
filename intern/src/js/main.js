import { WOW } from './vendor/wow.min';

const wow = new WOW();
document.addEventListener('DOMContentLoaded', () => {
  openMenu();
  wow.init();
});

function openMenu() {
  const burgerIcon = document.querySelector('.burger-icon');
  const navMenu = document.querySelector('.header-nav');
  burgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('_opened');
    burgerIcon.classList.toggle('_opened');
  });
}
