// @todo: Темплейт карточки
const card = document.querySelector('#card-template'); // template Карточки

// @todo: DOM узлы
const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit'); // popup редактирование
const popupEditName = document.querySelector('.popup__input_type_name'); // input имя 
const popupEditDesc = document.querySelector('.popup__input_type_description'); //input занятие
const popupTitle = document.querySelector('.profile__title'); // Имя 
const popupDesc = document.querySelector('.profile__description'); // Занятие
const editForm = document.forms['edit-profile']; // Форма редактирования

const addButton = document.querySelector('.profile__add-button'); // Кнопка создания карточки
const createForm = document.forms['new-place']; // Форма создание
const btnSave = createForm.querySelector('.popup__button'); // Кнопка сохранения
const btnClose = document.querySelector('.popup__close'); // Кнопка закрытия
const popupCreateName = document.querySelector('.popup__input_type_card-name'); // input name картинки
const popupCreateUrl = document.querySelector('.popup__input_type_url'); // input url для картинки
const popupNew = document.querySelector('.popup_type_new-card'); // popup добавление карточек
const list = document.querySelector('.places__list');

const deleteButton = document.querySelectorAll('.card__delete-button'); // Кнопка удаления карточки
const likeButton = document.querySelectorAll('.card__like-button'); // Кнопка лайка


// Вызов popup редактирования
editProfile.addEventListener('click', () => {
  popupEdit.classList.add('popup__open');
});

// Вызов popup добавления карточки
addButton.addEventListener('click', () => {
  popupNew.classList.add('popup__open');
});

// Закрытие popup редактирования
btnClose.addEventListener('click', function () {
  popupEdit.classList.remove('popup__open');
  popupEditName.value = '';
  popupEditDesc.value = '';
});

// Закрытие popup Добавления карточки
btnClose.addEventListener('click', function () {
  popupNew.classList.remove('popup__open');
});

// Функция редактирования профиля
editForm.addEventListener('submit', function (event) {
  event.preventDefault();
  popupEditName.value;
  popupEditDesc.value;
})

// @todo: Функция создания карточки

createForm.addEventListener('submit', function (event) {
  event.preventDefault();
  popupCreateName.value;
  popupCreateUrl.value;
  createCard(popupCreateUrl.value, popupCreateName.value);
  
  popupNew.classList.remove('popup__open');
});

function createCard(url, title) {
  const cloneCard = card.content.querySelector('.card').cloneNode(true);

  cloneCard.querySelector('.card__image').src = url;
  cloneCard.querySelector('.card__title').textContent = title;

  list.append(cloneCard);
}

// @todo: Функция удаления карточки


// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  createCard(item.link, item.name);
});
