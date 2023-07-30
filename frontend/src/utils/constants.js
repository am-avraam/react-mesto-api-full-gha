export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}


const jwt = localStorage.getItem("jwt");

export const apiConfig = {
  baseUrl: 'https://amavraam.nomoredomains.sbs/api',
  headers: {
    // authorization: '33fbf74b-a805-4063-8711-2b52c1f91b13',
    Authorization: `Bearer ${jwt}`,
    Accept: "application/json",
    'Content-Type': 'application/json',

  },
}

export const authApiConfig = {
  baseUrl: 'https://amavraam.nomoredomains.sbs/api',
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
