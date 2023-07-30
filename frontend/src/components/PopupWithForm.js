import React, {useRef} from 'react';

export const PopupWithForm = (({ onSubmit, title, name, children, buttonText, isOpen, onClose}) => {
  const popupRef = useRef()

  function closeByOutClick(e) {
    if (e.target === popupRef.current) onClose()
  }

    return (
        <div ref={popupRef} onClick={closeByOutClick}
            className={`popup popup-${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h2 className="popup__title">{title}</h2>
                <form onSubmit={onSubmit} className={`popup__form popup__form-${name}`} name={`popup-form-${name}`} noValidate>
                    {children}
                    <button type="submit" className="popup__button popup__button_save popup__button-save-profile">{buttonText}</button>
                </form>
                <button onClick={onClose} type="button"
                        className="popup__button popup__button_close popup__button_close-profile"></button>
            </div>

        </div>
    );
})
