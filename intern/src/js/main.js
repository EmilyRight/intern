import { WOW } from './vendor/wow.min';

const wow = new WOW();
document.addEventListener('DOMContentLoaded', () => {
  wow.init();
  openMenu();
  handleFaqOpening();
});

function openMenu() {
  const burgerIcon = document.querySelector('.burger-icon');
  const navMenu = document.querySelector('.header-nav');
  burgerIcon.addEventListener('click', () => {
    navMenu.classList.toggle('_opened');
    burgerIcon.classList.toggle('_opened');
  });
}

function setActive(arr) {
  const activeClassName = 'active';
  arr.forEach((el) => {
    const itemText = el.querySelector('.item__text');
    if (el.classList.contains(activeClassName)) {
      itemText.style.transition = 'none';
      el.classList.remove(activeClassName);
    }
  });
}

function handleFaqOpening() {
  const itemsList = document.querySelectorAll('.openup-list__item');
  const activeClassName = 'active';
  itemsList.forEach((item) => {
    item.addEventListener('click', () => {
      const itemText = item.querySelector('.item__text');
      if (item.classList.contains(activeClassName)) {
        itemText.style.transition = 'none';
        item.classList.remove(activeClassName);
      } else {
        setActive(itemsList);
        itemText.style.transition = '0.2s ease-in-out';
        item.classList.add(activeClassName);
      }
    });
  });
}
