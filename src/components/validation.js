// Функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

// Функция скрывает ошибку
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add('popup__button_disabled')
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove('popup__button_disabled')
    }
}

const isValid = (formElement, inputElement) => {
    if (inputElement.validity.patternMismatch) {
        const customMessage = inputElement.dataset.error || 'Некорректный ввод';
        inputElement.setCustomValidity(customMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
};


const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    const buttonElement = formElement.querySelector('.popup__button')
    toggleButtonState(inputList, buttonElement)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)

            toggleButtonState(inputList, buttonElement)
        });
    });
};

export const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement);
    });
};

export const clearValidation = () => {
        const formList = Array.from(document.querySelectorAll('.popup__form'));

        formList.forEach((formElement) => {
            const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
            inputList.forEach((input) => {
                hideInputError(formElement, input);
            })
    })
}


// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'form__input-error_active'
// }); 