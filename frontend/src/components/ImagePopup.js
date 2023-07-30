import React, {useEffect, useRef} from 'react';

export const ImagePopup = ({handleEscClose, card, onClose}) => {
  const popupRef = useRef()
  function closeByOutClick(e) {
    if (e.target === popupRef.current) onClose()
  }

  useEffect(() => {
    if (card) {
      window.addEventListener('keydown', handleEscClose)
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose)
    }
  })

    return (
    <div ref={popupRef} onClick={closeByOutClick} className={`popup popup_overlook ${ card && 'popup_opened'}`}>
        <div className="popup__wrapper">
            <button onClick={onClose} type="button"
                    className="popup__button popup__button_close popup__button_close-overlook"></button>
            <img src={card && card.link} alt={card?.name} className="popup__image"/>
            <p className="popup__name">{card?.name}</p>
        </div>
    </div>
    );
};

