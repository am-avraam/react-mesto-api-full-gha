import React from 'react';
import succeed from 'images/infoToolTip/success.svg'
import decline from 'images/infoToolTip/decline.svg'
import {failedAuth, succedRegister} from "utils/constants";

const InfoTooltip = ({res = true, isOpen, onClose}) => {

  return (
    <div className={`popup popup-infotooltip ${isOpen && 'popup_opened'}`}>
    <div className='popup__container popup-infotooltip__container'>
      <img className='popup-infotooltip__icon' src={res? succeed : decline} alt={res? 'успешно': 'ошибка'}/>
      <h2 className='popup-infotooltip__title' >{res? succedRegister : failedAuth}</h2>
      <button onClick={onClose} type="button"
              className="popup__button popup__button_close popup__button_close-profile"></button>
    </div>

     </div>
  );
};

export default InfoTooltip;
