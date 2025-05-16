// imports
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { deleteCard } from './components/card.js';
import {
  handleEscClose,
  closePopup,
  openPopup,
  handleOverlayClick,
  openCard,
} from './components/modal.js';

// @todo: Темплейт карточки
const card = document.querySelector('#card-template'); // template Карточки

// @todo: DOM узлы
// === const Профиль
const editTitle = document.querySelector('.profile__title'); // Имя пользователя
const editDescription = document.querySelector('.profile__description'); // Занятие пользователя

const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupInputEditName = document.querySelector('.popup__input_type_name'); // input имя пользователя
const popupInputEditDescription = document.querySelector('.popup__input_type_description'); // input занятие пользователя

const popupEdit = document.querySelector('.popup_type_edit'); // Popup редактирование профиля
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close'); // Кнопка закрытия Popup редактирование профиля

const formEditProfile = document.forms['edit-profile']; // Форма редактирования профиля
// const profile ===

// === const Создание карточки
const buttonOpenPopupCreateNewCard = document.querySelector('.profile__add-button'); // Кнопка создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card'); // Popup добавление карточек
const buttonClosePopupCreateNewCard = popupNewCard.querySelector('.popup__close'); // Кнопка закрытия Popup создания карточки

const popupInputNewCardTitle = document.querySelector('.popup__input_type_card-name'); // input название картинки
const popupInputNewCardUrl = document.querySelector('.popup__input_type_url'); // input путь для картинки
const formCreateCard = document.forms['new-place']; // Форма создание картинки

const listCards = document.querySelector('.places__list'); // Список карточек
// const Создание карточки ===

// Попапы
// const popupProfile = document.querySelector('.popup_type_edit');
// const popupNewCard = document.querySelector('.popup_type_new-card');
// const popupImage = document.querySelector('.popup_type_image');

// Вывести все карточки
renderInitialCards(initialCards, createCard, listCards, deleteCard);

// @todo: Вывести карточки на страницу
function renderInitialCards(initialCards, createCard, listCards, deleteCard) {
  initialCards.forEach(function (item) {
    const cloneCard = createCard(item.link, item.name, deleteCard);
    listCards.append(cloneCard);
  });
}

// Вызов popup редактирования
buttonEditProfile.addEventListener('click', () => {
  handleInputEdit();
  openPopup(popupEdit);
});

// Закрытие popup редактирования
buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Вызов popup добавления карточки
buttonOpenPopupCreateNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
});

// Закрытие popup Добавления карточки
buttonClosePopupCreateNewCard.addEventListener('click', () => {
  closePopup(popupNewCard);
  clearInputCreate();
});

popupEdit.addEventListener('mousedown', handleOverlayClick);

popupNewCard.addEventListener('mousedown', handleOverlayClick);

// Функция редактирования профиля
formEditProfile.addEventListener('submit', (event) => {
  event.preventDefault();
  editTitle.textContent = `${popupInputEditName.value}`;
  editDescription.textContent = `${popupInputEditDescription.value}`;
  closePopup(popupEdit);
});

// Функция которая заполняет input редактирования профиля
function handleInputEdit() {
  popupInputEditName.value = editTitle.textContent;
  popupInputEditDescription.value = editDescription.textContent;
}

// @todo: Функция создания карточки
formCreateCard.addEventListener('submit', (event) => {
  event.preventDefault();
  popupInputNewCardTitle.value;
  popupInputNewCardUrl.value;
  const cloneCard = createCard(
    popupInputNewCardUrl.value,
    popupInputNewCardTitle.value,
    deleteCard
  );
  listCards.prepend(cloneCard);
  clearInputCreate();
  closePopup(popupNewCard);
});

// Очистка input у создания карточки
function clearInputCreate() {
  popupInputNewCardTitle.value = '';
  popupInputNewCardUrl.value = '';
}

// Функция созадния карточки
function createCard(url, title, removeHandler) {
  const cloneCard = card.content.querySelector('.card').cloneNode(true);
  const likeBtn = cloneCard.querySelector('.card__like-button');

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-button_is-active');
  });

  cloneCard
    .querySelector('.card__delete-button')
    .addEventListener('click', () => {
      removeHandler(cloneCard);
    });

  cloneCard.querySelector('.card__image').src = url;
  cloneCard.querySelector('.card__title').textContent = title;
  cloneCard.querySelector('.card__image').alt = `Фотография места: ${title}`;
  openCard(cloneCard);
  return cloneCard;
}