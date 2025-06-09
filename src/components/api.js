const token = '4e36d520-1861-41a8-9aac-72ace543f1e9'
const idGroup = 'wff-cohort-39'
const url = 'https://mesto.nomoreparties.co/'
const baseHeaders = {
    authorization: token,
    'Content-Type': 'application/json'
}

function getResponseData(res) {
    return res.json()
}

function getRequestData(body) {
    return JSON.stringify(body)
}

// 
export function getCards() {
    return fetch(`${url}v1/${idGroup}/cards`, {
        headers: baseHeaders

    })
        .then(getResponseData)

}

export function saveCard(body) {
    console.log(body)
    return fetch(`${url}v1/${idGroup}/cards`, {
        method: 'POST',
        headers: baseHeaders,
        body: getRequestData(body)
    })
        .then(getResponseData)
}

export function removeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/${cardId}`, {
        method: 'DELETE',
        headers: baseHeaders,
        
    })
        .then(getResponseData)
}

// Лайк для карточки
export function likeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: baseHeaders,
    })
        .then(getResponseData)
}

// Убрать лайк у карточки
export function removelikeCard(cardId) {
    return fetch(`${url}v1/${idGroup}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: baseHeaders,
    })
        .then(getResponseData)
}

// 
export function editUser(body) {
    return fetch(`${url}v1/${idGroup}/users/me`, {
        method: 'PATCH',
        headers: baseHeaders,
        body: getRequestData(body)
    })
        .then(getResponseData)
}

//
export function getUser() {
    return fetch(`${url}v1/${idGroup}/users/me`, {
        headers: baseHeaders,
    })
        .then(getResponseData)
}

//
export function editAvatar(body) {
    return fetch(`${url}v1/${idGroup}/users/me/avatar`, {
        method: 'PATCH',
        headers: baseHeaders,
        body: getRequestData(body)
    })
        .then(getResponseData)
}   