// Функция показывает ошибку
const showInputError = (formElement, inputElement, errorMessage, config) => {
    console.log(config)
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

// Функция скрывает ошибку
const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass)
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass)
    }
}

const isValid = (formElement, inputElement, config) => {
    if (inputElement.validity.patternMismatch) {
        const customMessage = inputElement.dataset.error || 'Некорректный ввод';
        inputElement.setCustomValidity(customMessage);
    } else {
        inputElement.setCustomValidity('');
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideInputError(formElement, inputElement, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    })
};


const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    toggleButtonState(inputList, buttonElement, config)

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config)

            toggleButtonState(inputList, buttonElement, config)
        });
    });
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    // Переберём полученную коллекцию
    formList.forEach((formElement) => {
        // Для каждой формы вызовем функцию setEventListeners,
        // передав ей элемент формы
        setEventListeners(formElement, config);
    });
};

export const clearValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector));

        formList.forEach((formElement) => {
            const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
            const buttonElement = formElement.querySelector(config.submitButtonSelector);
            inputList.forEach((input) => {
                hideInputError(formElement, input, config);
            })
            if (buttonElement) {
            buttonElement.disabled = true;
            buttonElement.classList.add(config.inactiveButtonClass);
        }
    })
}