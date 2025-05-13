// @todo: Вывести карточки на страницу
export function renderInitialCards(initialCards, createCard, listCards, deleteCard) {
  initialCards.forEach(function (item) {
    const cloneCard = createCard(item.link, item.name, deleteCard);
    listCards.append(cloneCard);
  });
}

// @todo: Функция удаления карточки
export function deleteCard(cloneCard) {
  cloneCard.remove();
}