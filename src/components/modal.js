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

// Открытие изображения
export function openCard(card) {
  const cardImage = card.querySelector('.card__image');
  const popupWindow = document.querySelector('.popup_type_image');
  const popupImage = popupWindow.querySelector('.popup__image');
  const popupCaptionImage = popupWindow.querySelector('.popup__caption');
  const buttonClosePopupImage = popupWindow.querySelector('.popup__close');

  cardImage.addEventListener('click', () => {
    // Устанавливаем изображение и подпись в попап
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaptionImage.textContent = card.querySelector('.card__title').textContent;
    
    // Показываем попап
    openPopup(popupWindow);
  });

  // Закрытие попапа по кнопке
  buttonClosePopupImage.addEventListener('click', () => {
    closePopup(popupWindow);
  });
  
  // Закрытие попапа по клику на оверлей
  popupWindow.addEventListener('mousedown', handleOverlayClick);

}

document.addEventListener('keydown', (event) => {
  handleEscClose(event);
});
