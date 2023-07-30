import React, {useState, useContext, useEffect} from 'react';
import {PopupWithForm} from "./index";
import {UserContext} from '../contexts/CurrentUserContext'

export const EditProfilePopup = ({handleEscClose, onUpdateUser, isOpen, onClose}) => {
    const currentUser = useContext(UserContext);
    const [name, setName] = useState(" ")
    const [description, setDescription] = useState(" ")

    useEffect(() => {
        setName(currentUser?.name || '');
        setDescription(currentUser?.about || '');
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
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
        <PopupWithForm onSubmit={handleSubmit} title='Редактировать профиль' name='profile' isOpen={isOpen} onClose={onClose} buttonText='Сохранить'>
            <label className="popup__label">
                <input
                    onChange={(e) => {setName(e.target.value)}}
                    name="name"
                    type="text"
                    className="popup__input popup__input_field_name popup__input-name"
                    value={name}
                    placeholder="Имя"
                    required
                    minLength="2"
                    maxLength="40"
                    id="name-input"
                />
                <span className="popup__input-error name-input-error"></span>
            </label>
            <label className="popup__label">
                <input
                    onChange={(e) => {setDescription(e.target.value)}}
                    name="about"
                    type="text"
                    className="popup__input popup__input_field_about popup__input-introduce"
                    value={description}
                    placeholder="О себе"
                    required
                    minLength="2"
                    maxLength="200"
                    id="introduce-input"
                />
                <span className="popup__input-error introduce-input-error"></span>
            </label>
        </PopupWithForm>
    );
};
