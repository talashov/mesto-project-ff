import { removeCard, likeCard, removelikeCard } from './api.js';

// @todo: Функция удаления карточки
export function deleteCard(cloneCard) {
  cloneCard.remove();
}

// Функция нажатия на лайк
export function toggleLike(button) {
  // const button = event.currentTarget; // Получаем элемент, на котором висит обработчик
  button.classList.toggle('card__like-button_is-active');
}

// Функция созадния карточки
export function createCard(id, url, title, removeHandler, openImagePopup, card, onToggleLike, idUser, idOwner, likes = []) {
  const cloneCard = card.content.querySelector('.card').cloneNode(true);
  const likeBtn = cloneCard.querySelector('.card__like-button');
  const cardImage = cloneCard.querySelector('.card__image')
  const altImage = `Фотография места: ${title}`;

  const like = cloneCard.querySelector('.card__like-number');
  let likesToggle = likes
  like.textContent = likes.length

  likes.forEach((item) => {
    if (item._id === idUser) {
      likeBtn.classList.add('card__like-button_is-active');
    }
  })

  likeBtn.addEventListener('click', async (event) => {
    const isLiked = likesToggle.some((item) => {
      console.log(item, idUser)
      return idUser === item._id
    })
    if (!isLiked) {
      const likedCard = await likeCard(id)
      likesToggle = likedCard.likes
      like.textContent = likedCard.likes.length
    } else {
      const likedCard = await removelikeCard(id)
      likesToggle = likedCard.likes
      like.textContent = likedCard.likes.length
    }

    likeBtn.classList.toggle('card__like-button_is-active');
  });

  const removeButton = cloneCard.querySelector('.card__delete-button')

  if (idUser !== idOwner) {
    removeButton.classList.add('card__delete-button-disabled');
  }

  removeButton.addEventListener('click', async () => {
    await removeCard(id)
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