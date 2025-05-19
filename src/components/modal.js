// Открытие Popup
export function openPopup(popupWindow) {
  popupWindow.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрытие Popup
export function closePopup(popupWindow) {
  popupWindow.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция для обработки нажатия Esc
export function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Закрытие по оверлейну
export function handleOverlayClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}