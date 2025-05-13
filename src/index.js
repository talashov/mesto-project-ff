// imports
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { deleteCard, renderInitialCards } from './components/card.js';
import {
  handleEscClose,
  closePopup,
  openPopup,
  handleOver,
  openCard,
} from './components/modal.js';

// @todo: Темплейт карточки
const card = document.querySelector('#card-template'); // template Карточки

// @todo: DOM узлы
// === const Профиль
const editTitle = document.querySelector('.profile__title'); // Имя пользователя
const editDesc = document.querySelector('.profile__description'); // Занятие пользователя

const btnEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupInputEditName = document.querySelector('.popup__input_type_name'); // input имя пользователя
const popupInputEditDesc = document.querySelector(
  '.popup__input_type_description'
); // input занятие пользователя

const popupEdit = document.querySelector('.popup_type_edit'); // Popup редактирование профиля
const popupBtnEditClose = popupEdit.querySelector('.popup__close'); // Кнопка закрытия Popup редактирование профиля

const editForm = document.forms['edit-profile']; // Форма редактирования профиля
// const profile ===

// === const Создание карточки
const addBtn = document.querySelector('.profile__add-button'); // Кнопка создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card'); // Popup добавление карточек
const popupBtnCreateClose = popupNewCard.querySelector('.popup__close'); // Кнопка закрытия Popup создания карточки

const popupInputNewCardTitle = document.querySelector(
  '.popup__input_type_card-name'
); // input название картинки
const popupInputNewCardUrl = document.querySelector('.popup__input_type_url'); // input путь для картинки
const createForm = document.forms['new-place']; // Форма создание картинки

const listCards = document.querySelector('.places__list'); // Список карточек
// const Создание карточки ===

// Попапы
// const profileEditPopup = document.querySelector('.popup_type_edit');
// const cardAddPopup = document.querySelector('.popup_type_new-card');
// const imagePopup = document.querySelector('.popup_type_image');

// Вывести все карточки
renderInitialCards(initialCards, createCard, listCards, deleteCard);

// Вызов popup редактирования
btnEditProfile.addEventListener('click', () => {
  inputEdit();
  openPopup(popupEdit);
});

// Закрытие popup редактирования
popupBtnEditClose.addEventListener('click', () => {
  closePopup(popupEdit);
});

// Вызов popup добавления карточки
addBtn.addEventListener('click', () => {
  openPopup(popupNewCard);
});

// Закрытие popup Добавления карточки
popupBtnCreateClose.addEventListener('click', () => {
  closePopup(popupNewCard);
  clearInputCreate();
});

popupEdit.addEventListener('mousedown', handleOver);

popupNewCard.addEventListener('mousedown', handleOver);

// Функция редактирования профиля
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editTitle.textContent = `${popupInputEditName.value}`;
  editDesc.textContent = `${popupInputEditDesc.value}`;
  closePopup(popupEdit);
});

// Функция которая заполняет input редактирования профиля
function inputEdit() {
  popupInputEditName.value = editTitle.textContent;
  popupInputEditDesc.value = editDesc.textContent;
}

// @todo: Функция создания карточки
createForm.addEventListener('submit', (event) => {
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

// Очистка input у создания карточки
function clearInputCreate() {
  popupInputNewCardTitle.value = '';
  popupInputNewCardUrl.value = '';
}
