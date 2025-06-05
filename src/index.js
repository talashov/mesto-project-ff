// imports
import './pages/index.css';
import { initialCards } from './components/cards.js';
import { deleteCard, toggleLike, createCard } from './components/card.js';
import { handleEscClose, closePopup, openPopup, handleOverlayClick } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, getUser, editUser, editAvatar } from './components/api.js';

// @todo: DOM узлы
const card = document.querySelector('#card-template'); // template Карточки

const profileImage = document.querySelector('.profile__image'); // Фотография пользователя
const popupEditAvatar = document.querySelector('.popup_update-photo'); // Popup обновление карточки
const popupInputEditAvatar = document.querySelector('.popup__input_update-photo'); // input обновления фото
const buttonClosePopupUserImage = popupEditAvatar.querySelector('.popup__close'); // Кнопка закрытия Popup обновления фотографии пользователя

const editTitle = document.querySelector('.profile__title'); // Имя пользователя
const editDescription = document.querySelector('.profile__description'); // Занятие пользователя

const buttonEditProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupInputEditName = document.querySelector('.popup__input_type_name'); // input имя пользователя
const popupInputEditDescription = document.querySelector('.popup__input_type_description'); // input занятие пользователя

const popupEdit = document.querySelector('.popup_type_edit'); // Popup редактирование профиля
const buttonClosePopupEdit = popupEdit.querySelector('.popup__close'); // Кнопка закрытия Popup редактирование профиля

const formEditProfile = document.forms['edit-profile']; // Форма редактирования профиля
const formEditAvatar = document.forms['update-photo']; // Форма редактирования фотографии пользователя

const buttonOpenPopupCreateNewCard = document.querySelector('.profile__add-button'); // Кнопка создания карточки
const popupNewCard = document.querySelector('.popup_type_new-card'); // Popup добавление карточек
const buttonClosePopupCreateNewCard = popupNewCard.querySelector('.popup__close'); // Кнопка закрытия Popup создания карточки

const popupInputNewCardTitle = document.querySelector('.popup__input_type_card-name'); // input название картинки
const popupInputNewCardUrl = document.querySelector('.popup__input_type_url'); // input путь для картинки
const formCreateCard = document.forms['new-place']; // Форма создание картинки

const listCards = document.querySelector('.places__list'); // Список карточек
const numberLike = document.querySelector('.card__like-number'); // span количество лайков

const popupFullImage = document.querySelector('.popup_type_image'); // Popup открытого изображения
const photoPopupFullImage = popupFullImage.querySelector('.popup__image'); // Изображение в popup
const popupCaptionImage = popupFullImage.querySelector('.popup__caption'); // Название изображения в popup
const buttonClosePopupImage = popupFullImage.querySelector('.popup__close'); // Кнопка закрытия открытого изображения


renderInitialCards(initialCards, createCard, listCards, deleteCard); // Вывести все карточки
enableValidation();

// @todo: Вывести карточки на страницу
async function renderInitialCards(initialCards, createCard, listCards, deleteCard) {
  initialCards.forEach(function (item) {
    const cloneCard = createCard(item.link, item.name, deleteCard, openImagePopup, card, toggleLike);
    listCards.append(cloneCard);
    // const cards = await getCards()
  });
}

// Вызов popup редактирования
buttonEditProfile.addEventListener('click', () => {
  handleInputEdit();
  openPopup(popupEdit);
  clearValidation()
});

// Закрытие popup редактирования
buttonClosePopupEdit.addEventListener('click', () => {
  closePopup(popupEdit);
  enableValidation()
});

// Вызов popup добавления карточки
buttonOpenPopupCreateNewCard.addEventListener('click', () => {
  openPopup(popupNewCard);
  clearValidation()
});

// Закрытие popup Добавления карточки
buttonClosePopupCreateNewCard.addEventListener('click', () => {
  closePopup(popupNewCard);
});

// Вызов popup обновления аватарки
profileImage.addEventListener('click', () => {
  openPopup(popupEditAvatar);
  clearValidation()
});

// Закрытие popup обновления аватарки
buttonClosePopupUserImage.addEventListener('click', () => {
  closePopup(popupEditAvatar);
});

// Открытие изображения
function openImagePopup(url, alt, title) {
  photoPopupFullImage.src = url; // Устанавливаем изображение и подпись в попап
  photoPopupFullImage.alt = alt;
  popupCaptionImage.textContent = title;
  openPopup(popupFullImage); // Показываем попап
}

// Закрытие попапа c изображением по кнопке
buttonClosePopupImage.addEventListener('click', () => {
  closePopup(popupFullImage);
});

popupEdit.addEventListener('mousedown', handleOverlayClick); // Закрытие попапа по клику на оверлей редактирование

popupNewCard.addEventListener('mousedown', handleOverlayClick); // Закрытие попапа по клику на оверлей создание новой карточки

popupFullImage.addEventListener('mousedown', handleOverlayClick); // Закрытие попапа по клику на оверлей открытого изображения

popupEditAvatar.addEventListener('mousedown', handleOverlayClick); // Закрытие попапа по клику на оверлей обновления фотографии пользователя

// Функция редактирования профиля
formEditProfile.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = formEditProfile.querySelector('.popup__button');
  button.textContent = 'Сохранение...'
  const userEdit = await editUser({
    name: popupInputEditName.value,
    about: popupInputEditDescription.value
  })
  button.textContent = 'Сохранить'
  editTitle.textContent = userEdit.name;
  editDescription.textContent = userEdit.about;
  closePopup(popupEdit);
});

// Функция которая заполняет input редактирования профиля
function handleInputEdit() {
  popupInputEditName.value = editTitle.textContent;
  popupInputEditDescription.value = editDescription.textContent;
}

// Функция обновления аватарки
formEditAvatar.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = formEditAvatar.querySelector('.popup__button');
  button.textContent = 'Сохранение...'
  const userEditAvatar = await editAvatar({
    avatar: popupInputEditAvatar.value,

  })
  button.textContent = 'Сохранить'
  profileImage.style.backgroundImage = `url(${userEditAvatar.avatar})`;
  closePopup(popupEditAvatar);
});

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

// Инициализация пользователя
async function initUser() {
  const user = await getUser()
  editTitle.textContent = user.name;
  editDescription.textContent = user.about;
  profileImage.style.backgroundImage = `url(${user.avatar})`;

}
initUser()