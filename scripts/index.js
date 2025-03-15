// @todo: Темплейт карточки
const card = document.querySelector('#card-template'); // template Карточки

// @todo: DOM узлы
const editProfile = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const popupEdit = document.querySelector('.popup_type_edit'); // popup редактирование
const popupEditClouse = popupEdit.querySelector('.popup__close');

const addButton = document.querySelector('.profile__add-button'); // Кнопка создания карточки
const createForm = document.forms['new-place']; // Форма создание
const btnSave = createForm.querySelector('.popup__button'); // Кнопка сохранения
const popupCreateName = document.querySelector('.popup__input_type_card-name'); // input name картинки
const popupCreateUrl = document.querySelector('.popup__input_type_url'); // input url для картинки
const popupNew = document.querySelector('.popup_type_new-card'); // popup добавление карточек
const popupCreateClouse = popupNew.querySelector('.popup__close');
const list = document.querySelector('.places__list');

const popupEditName = document.querySelector('.popup__input_type_name'); // input имя
const popupEditDesc = document.querySelector('.popup__input_type_description'); //input занятие
const popupTitle = document.querySelector('.profile__title'); // Имя
const popupDesc = document.querySelector('.profile__description'); // Занятие
const editForm = document.forms['edit-profile']; // Форма редактирования

function closePopup (popup) {
  popup.classList.remove('popup__open');
}

// Вызов popup редактирования
editProfile.addEventListener('click', () => {
  popupEdit.classList.add('popup__open');
});

// Вызов popup добавления карточки
addButton.addEventListener('click', () => {
  popupNew.classList.add('popup__open');
});

// Закрытие popup редактирования
popupEditClouse.addEventListener('click', () => {
  closePopup(popupEdit)
  popupEditName.value = '';
  popupEditDesc.value = '';
});

// Закрытие popup Добавления карточки
popupCreateClouse.addEventListener('click', () => {
  closePopup(popupNew)
});

// Функция редактирования профиля


editForm.addEventListener('submit', (event) => {
  event.preventDefault();
  popupTitle.textContent = `${popupEditName.value}`;
  popupDesc.textContent = `${popupEditDesc.value}`;

  popupEdit.classList.remove('popup__open');
});

// @todo: Функция создания карточки

createForm.addEventListener('submit', (event) => {
  event.preventDefault();
  popupCreateName.value;
  popupCreateUrl.value;
  const cloneCard = createCard(popupCreateUrl.value, popupCreateName.value, delitedCard);
  list.prepend(cloneCard);
  popupNew.classList.remove('popup__open');
});

function createCard(url, title, removeHandler) {
  const cloneCard = card.content.querySelector('.card').cloneNode(true);
  const likeBtn = cloneCard.querySelector('.card__like-button');

  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('card__like-button_is-active')
  });

  cloneCard.querySelector('.card__delete-button').addEventListener('click', () => {
    removeHandler(cloneCard)
  })
  
  cloneCard.querySelector('.card__image').src = url;
  cloneCard.querySelector('.card__title').textContent = title;
  return cloneCard;
}

// @todo: Функция удаления карточки

function delitedCard (cloneCard) {
  cloneCard.remove();
}


// @todo: Вывести карточки на страницу

initialCards.forEach(function (item) {
  const cloneCard = createCard(item.link, item.name, delitedCard);
  list.append(cloneCard);
});
