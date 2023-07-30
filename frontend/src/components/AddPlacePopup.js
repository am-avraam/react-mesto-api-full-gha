import React, {useRef, useEffect} from 'react';
import {PopupWithForm} from "./index";

export const AddPlacePopup = ({handleEscClose, onAddCard, isOpen, onClose, }) => {

    const placeNameRef = useRef()
    const placeLinkRef = useRef()
    function handleSubmit(e) {
        e.preventDefault()
        onAddCard({name: placeNameRef.current.value, link: placeLinkRef.current.value})
        placeNameRef.current.value = ''
        placeLinkRef.current.value = ''
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
        <PopupWithForm onSubmit={handleSubmit} title='Новое место' name='add' isOpen={isOpen} onClose={onClose} buttonText='Создать'>
            <label className="popup__label">
                <input
                    ref={placeNameRef}
                    name="name"
                    type="text"
                    className="popup__input popup__input_field_name popup__input-title"
                    placeholder="Название"
                    required
                    minLength="2"
                    maxLength="30"
                    id="title-input"
                />
                <span className="popup__input-error title-input-error"></span>
            </label>
            <label className="popup__label">
                <input
                    ref={placeLinkRef}
                    name="link"
                    type="url"
                    className="popup__input popup__input_field_about popup__input-link"
                    placeholder="Ссылка на картинку"
                    required
                    id="link-input"
                />
                <span className="popup__input-error link-input-error"></span>
            </label>
        </PopupWithForm>
    );
};
