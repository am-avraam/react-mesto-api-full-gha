import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {initFormState} from "utils/constants";

export const Register = ({onRegister}) => {

  const [formValue, setFormValue] = useState(initFormState)

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister(formValue.email, formValue.password)
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  return (
    <div className='login login-register'>
      <div className='login__container_side-top'>
        <h1 className='login__title'>
          Регистрация</h1>
        <form className='login__form' onSubmit={handleSubmit} id='login-form-register' >
          <label>
            <input
              onChange={handleChange}
              id="email"
              name="email"
              type="email"
              value={formValue.email}
              className='login__input'
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
            />
            <span></span>
          </label>
          <label>
            <input
              onChange={handleChange}
              className='login__input'
              type="password"
              name='password'
              placeholder="Пароль"
              value={formValue.password}
              required
              minLength="2"
              maxLength="200"
            />
            <span></span>
          </label>
        </form>
      </div>

      <div className='login__container_side-bottom'>
        <button type='submit' form='login-form-register' className='login__auth'>Зарегистрироваться</button>
        <Link to='/sign-in' className='login__link'>Уже зарегистрированы? Войти</Link>
      </div>
    </div>
  );
};



