// imports
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { deleteCard, toggleLike, createCard } from './components/card.js';
import {
  handleEscClose,
  closePopup,
  openPopup,
  handleOverlayClick
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
    const cloneCard = createCard(item.link, item.name, deleteCard, openImagePopup, card, toggleLike);
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
    deleteCard,
    openImagePopup,
    card,
    toggleLike
  );
  listCards.prepend(cloneCard);
  formCreateCard.reset()// Очистка input у создания карточки
  closePopup(popupNewCard);
});



const popupWindow = document.querySelector('.popup_type_image');
const popupImage = popupWindow.querySelector('.popup__image');
const popupCaptionImage = popupWindow.querySelector('.popup__caption');
const buttonClosePopupImage = popupWindow.querySelector('.popup__close');

// Закрытие попапа по кнопке
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupWindow);
});

// Закрытие попапа по клику на оверлей
popupWindow.addEventListener('mousedown', handleOverlayClick);

// Открытие изображения
function openImagePopup(url, alt, title) {
  // Устанавливаем изображение и подпись в попап
  popupImage.src = url;
  popupImage.alt = alt;
  popupCaptionImage.textContent = title;
  
  // Показываем попап
  openPopup(popupWindow);
}
