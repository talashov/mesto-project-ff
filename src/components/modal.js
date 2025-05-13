// Открытие Popup
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрытие Popup
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
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

// Закрытие по оверлейну РЕДАКТИРОВАНИЕ
export function handleOver(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
}

// Открытие изображения
export function openCard(card) {
  const cardImage = card.querySelector('.card__image');
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');
  const popupClose = popup.querySelector('.popup__close');

  cardImage.addEventListener('click', () => {
    // Устанавливаем изображение и подпись в попап
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = card.querySelector('.card__title').textContent;

    // Показываем попап
    openPopup(popup);
  });
  console.log(popupClose);
  // Закрытие попапа по кнопке
  popupClose.addEventListener('click', () => {
    popup.classList.remove('popup_is-opened');
  });

  // Закрытие попапа по клику на оверлей
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('popup_is-opened');
    }
  });
}

document.addEventListener('keydown', (event) => {
  handleEscClose(event);
});
