const hidden = 'popup-modal-hidden';
const active = 'modal-box-active';
const noscroll = 'modal-box-viewed';
const { body } = document;
const closeIconClassName = 'close';

export function openModal(modalBoxId) {
  const modalBox = document.querySelector(modalBoxId);
  const modal = modalBox.closest('.popup-modal');
  body.style.paddingRight = `${getScrollbarWidth()}px`;
  body.classList.add(noscroll);
  modal.classList.remove(hidden);
  modalBox.classList.add(active);

  // закрыть эту модалку
  modal.addEventListener('click', (e) => {
    const { target } = e;
    const closeModalButton = (
      target.classList.contains(closeIconClassName))
      ? target
      : target.closest(`.${closeIconClassName}`);

    if (!target.closest('.modal-box') || closeModalButton) {
      closeModal(modalBoxId);
    }
  });
}

function getScrollbarWidth() {
  const documentWidth = document.documentElement.clientWidth;
  const windowsWidth = window.innerWidth;
  const scrollbarWidth = windowsWidth - documentWidth;
  return scrollbarWidth;
}

export function closeModal(modalBoxId) {
  const modalBox = document.querySelector(modalBoxId);
  body.classList.remove(noscroll);
  body.style.paddingRight = '0px';
  modalBox.closest('.popup-modal').classList.add(hidden);
}

export function openMenu(icon) {
  const navMenu = document.querySelector('.header-nav');
  navMenu.classList.toggle('_opened');
  icon.classList.toggle('_opened');
  body.style.paddingRight = '0px';
  body.classList.toggle(noscroll);
}
