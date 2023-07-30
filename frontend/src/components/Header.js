import React from 'react';
import logo from "../images/header/header-logo.svg";
import {Link, useLocation } from "react-router-dom";

export const Header = ({ loggedIn, currentEmail, handleSignOut}) => {

  const location = useLocation()
  const atRegistrationPage = location.pathname === '/sign-up'

    return (
        <header className="header">
            <img src={logo} alt="логотип 'Mesto'" className="header__logo"/>
          {loggedIn &&
            <>
            <span className='header__email'>{currentEmail}</span>
            <Link onClick={handleSignOut} to='sign-in' className='header__link header__link-action_out'>Выйти</Link>
            </>
          }
          { !loggedIn && <Link to={atRegistrationPage ? 'sign-in' : 'sign-up'}
                 className='header__link'>{atRegistrationPage ? 'Войти' : 'Регистрация'}</Link>}
        </header>
    );
};
