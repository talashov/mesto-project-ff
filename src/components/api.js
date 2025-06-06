const token = '4e36d520-1861-41a8-9aac-72ace543f1e9'
const idGroup = 'wff-cohort-39'
const url = 'https://mesto.nomoreparties.co/'


// 
export function getCards() {
    return fetch(`${url}v1/${idGroup}/cards`, {
        headers: {
            authorization: token
        },

    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

export function saveCard(body) {
    console.log(body)
    return fetch(`${url}v1/${idGroup}/cards`, {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

export function removeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

// Лайк для карточки
export function likeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: {
            authorization: token,
        },
    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

// Убрать лайк у карточки
export function removelikeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: {
            authorization: token,
        },
    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

// 
export function editUser(body) {
    return fetch(`${url}v1/${idGroup}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)


    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

//
export function getUser() {
    return fetch(`${url}v1/${idGroup}/users/me`, {
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

//
export function editAvatar(body) {
    return fetch(`${url}v1/${idGroup}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)

    })
        .then(res => res.json())

        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}   