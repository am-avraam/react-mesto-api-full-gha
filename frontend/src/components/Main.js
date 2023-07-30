import React, { useContext} from 'react';
import editAva from '../images/profile/editAva.svg'
import {Card} from "./index";
import {UserContext} from "../contexts/CurrentUserContext";

export const Main = ({cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete}) => {

    const currentUser = useContext(UserContext)


    return (
        <main className="main">
            <section className="profile">
                <div onClick={onEditAvatar}  className="profile__avatar-wrapper">
                    <img src={currentUser?.avatar} alt="ава" className="profile__avatar"/>
                    <img src={editAva} alt="редактировать аву"
                         className="profile__edit"/>
                </div>
                <div className="profile__data-wrapper">
                    <h1 className="profile__name">{currentUser?.name}</h1>
                    <h2 className="profile__about">{currentUser?.about}</h2>
                </div>
                <button onClick={onEditProfile} type="button" className="profile__button profile__button_edit"></button>
                <button onClick={onAddPlace} type="button" className="profile__button profile__button_add"></button>
            </section>

            <div className="places">
                <ul className="places__list">
                    {cards.map((card) => (<Card onCardDelete={onCardDelete} onCardLike={onCardLike} card={card} key={card._id} onCardClick={onCardClick}/>))}
                </ul>
            </div>
        </main>
    );
};

