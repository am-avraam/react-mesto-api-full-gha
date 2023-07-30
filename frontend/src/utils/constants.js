export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button_save',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '33fbf74b-a805-4063-8711-2b52c1f91b13',
    'Content-Type': 'application/json',
  },
}

export const authApiConfig = {
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
  },
}

export const initFormState = {
  email: '',
  password: '',
}

export const succedRegister = 'Вы успешно зарегистрировались!'
export const failedAuth = 'Что-то пошло не так!\n' +
  'Попробуйте ещё раз.'
