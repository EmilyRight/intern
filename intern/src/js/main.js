import { openModal } from './modal';
import { WOW } from './vendor/wow.min';
import Swiper from './vendor/swiper.min';

const wow = new WOW();

document.addEventListener('DOMContentLoaded', () => {
  wow.init();
  openMenu();
  handleFaqOpening();
  openPopup();
  handleSlider();
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

// open pop-up modal
function openPopup() {
  const popupLinksList = document.querySelectorAll('.open-popup-modal');
  popupLinksList.forEach((link) => {
    const { popup } = link.dataset;
    link.addEventListener('click', () => {
      openModal(`#${popup}`);
    });
  });
}

function handleSlider() {
  const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1.2,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      600: {
        spaceBetween: 12,
        slidesPerView: 3,
      },
    },
  });
  swiper.init();
}
