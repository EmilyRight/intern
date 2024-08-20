import { openMenu, openModal } from './modal';
import { WOW } from './vendor/wow.min';
import Swiper from './vendor/swiper.min';

const wow = new WOW();

document.addEventListener('DOMContentLoaded', () => {
  wow.init();
  setEventListeners();
  handleFaqOpening();
  openPopup();
  handleSlider();
  getCurrentYear();
  scrollTeaser();
});

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

function getCurrentYear() {
  const yearSpan = document.querySelectorAll('.current-year');
  yearSpan.forEach((span) => {
    span.innerHTML = new Date().getFullYear().toString();
  });
}
function scrollToElement(el, header) {
  const offs = 0;
  const headerHeight = header || 0;
  const y = el.getBoundingClientRect().top + window.scrollY + offs - headerHeight;
  window.scrollTo({ top: y, behavior: 'smooth' }); // element.scrollIntoView();
}

// scroll to next if URL contains #about

function scrollTeaser() {
  const { hash } = window.location;
  if (hash) {
    const id = hash.slice(1);
    const section = document.getElementById(id);
    scrollToElement(section);
  }
}

function handleMenu(event) {
  const noscroll = 'modal-box-viewed';
  const { body } = document;
  const { section } = event.currentTarget.dataset;
  const sectionsList = document.querySelectorAll('.section');
  const burgerIcon = document.querySelector('.burger-icon');
  const header = document.querySelector('.header');
  const y = header.getBoundingClientRect().bottom;
  sectionsList.forEach((item) => {
    if (item.id === section) {
      scrollToElement(item, y);
      openMenu(burgerIcon);
      body.classList.remove(noscroll);
    }
  });
}

function setEventListeners() {
  const menuItems = document.querySelectorAll('.menu__item');
  const burgerIcon = document.querySelector('.burger-icon');
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => handleMenu(e));
  });
  burgerIcon.addEventListener('click', () => openMenu(burgerIcon));
}
