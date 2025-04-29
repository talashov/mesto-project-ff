// imports
import './pages/index.css';
import {initialCards} from './components/cards.js'
import {deleteCard} from './components/card.js'

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

// Закрытие Popup
function closePopup(popup){
  popup.classList.remove('popup__open');
  document.removeEventListener('keydown', handleEscClose);
}

// Функция для обработки нажатия Esc
export function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__open');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  } 
}

// Закрытие popup редактирования
popupBtnEditClose.addEventListener('click', () => {
  clearInput();
  closePopup(popupEdit);
});

// Закрытие popup Добавления карточки
popupBtnCreateClose.addEventListener('click', () => {
  closePopup(popupNewCard);
});


// Очистка input у редактирования профиля
function clearInput(clear) {
  popupInputEditName.value = '';
  popupInputEditDesc.value = '';
}

// Очистка input у создания карточки
function clearInputCreate(clear) {
  popupInputNewCardTitle.value = '';
  popupInputNewCardUrl.value = '';
}

// Вызов popup редактирования
btnEditProfile.addEventListener('click', () => {
  popupEdit.classList.add('popup__open');
  document.addEventListener('keydown', handleEscClose);
});

// Вызов popup добавления карточки
addBtn.addEventListener('click', () => {
  popupNewCard.classList.add('popup__open');
  document.addEventListener('keydown', handleEscClose);
});

// Функция редактирования профиля
editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  editTitle.textContent = `${popupInputEditName.value}`;
  editDesc.textContent = `${popupInputEditDesc.value}`;
  clearInput();

  popupEdit.classList.remove('popup__open');
});

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
  clearInput(popupInputNewCardTitle);
  clearInputCreate();
  popupNewCard.classList.remove('popup__open');
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
  return cloneCard;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
  const cloneCard = createCard(item.link, item.name, deleteCard);
  listCards.append(cloneCard);
});