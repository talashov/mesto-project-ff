// @todo: Функция удаления карточки
export function deleteCard(cloneCard) {
  cloneCard.remove();
}

// Функция нажатия на лайк
export function toggleLike(event) {
  const button = event.currentTarget; // Получаем элемент, на котором висит обработчик
  button.classList.toggle('card__like-button_is-active');
}

// Функция созадния карточки
export function createCard(url, title, removeHandler, openImagePopup, card, onToggleLike) {
  const cloneCard = card.content.querySelector('.card').cloneNode(true);
  const likeBtn = cloneCard.querySelector('.card__like-button');
  const cardImage = cloneCard.querySelector('.card__image')
  const altImage = `Фотография места: ${title}`;

  likeBtn.addEventListener('click', onToggleLike);

  cloneCard
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      removeHandler(cloneCard);
    });

  cardImage.src = url;
  cardImage.alt = altImage;
  cloneCard.querySelector('.card__title').textContent = title;

  cardImage.addEventListener('click', () => {
    openImagePopup(url, altImage, title);
  });
  
  return cloneCard;
}