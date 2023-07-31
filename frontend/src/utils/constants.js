export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}


const token = localStorage.getItem("token");

export const apiConfig = {
  baseUrl: 'https://api.amik.blin.nomoreparties.co',
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    'Content-Type': 'application/json',

  },
}

export const authApiConfig = {
  baseUrl: 'https://api.amik.blin.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    Accept: "application/json",
  },
}

export const initFormState = {
  email: '',
  password: '',
}

export const succedRegister = 'Вы успешно зарегистрировались!'
export const failedAuth = 'Что-то пошло не так!\n' +
  'Попробуйте ещё раз.'
