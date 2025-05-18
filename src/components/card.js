// @todo: Функция удаления карточки
export function deleteCard(cloneCard) {
  cloneCard.remove();
}

// Функция нажатия на лайк
export function toggleLike(event) {
  const button = event.currentTarget; // Получаем элемент, на котором висит обработчик
  button.classList.toggle('card__like-button_is-active');
}