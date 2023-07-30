import React, {useEffect, useRef} from 'react';
import {PopupWithForm} from "./index";

export const EditAvatarPopup = ({handleEscClose, onUpdateAvatar, isOpen, onClose}) => {

    const avatarRef = useRef()
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
        avatarRef.current.value = ''
    }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose)
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose)
    }
  })

    return (
        <PopupWithForm onSubmit={handleSubmit} title='Обновить аватар' name='update' isOpen={isOpen} onClose={onClose} buttonText='Сохранить'>
            <label className="popup__label">
                <input
                    ref={avatarRef}
                    name="link"
                    type="url"
                    className="popup__input popup__input_field_name popup__input-link"
                    placeholder="Ссылка на аватар"
                    required
                    id="ava-link-input"
                />
                <span className="popup__input-error ava-link-input-error"></span>
            </label>
        </PopupWithForm>
    );
};

