import React, {useContext} from 'react';
import {UserContext} from "../contexts/CurrentUserContext";

export const Card = ({card, onCardClick, onCardLike, onCardDelete}) => {

const currentUser = useContext(UserContext)
  // eslint-disable-next-line
    const {name, link, owner, _id, likes} = card
    const isOwn = owner._id === currentUser._id;
    const isLiked = likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `places__like ${isLiked && 'places__like_state_active'}`
    );

    const handleLikeClick = () => {
        onCardLike(card)
    }

    const handleCardDeleteClick = () => {
        onCardDelete(card)
    }

    return (
        <li className="places__item">
            {isOwn && <button onClick={handleCardDeleteClick} className="places__delete places__delete_active"></button>}
            <button onClick={() => onCardClick(card)} className="places__overlook">
                <img src={link} alt={name} className="places__image"/>
            </button>
            <div className="places__description">
                <p className="places__name">{name}</p>
                <div className="places__like-wrapper">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="places__count-like">{likes.length}</span>
                </div>
            </div>
        </li>
    );
};

