import React, {useState} from 'react';
import {initFormState} from "utils/constants";


export const Login = ({onLogin}) => {

  const [formValue, setFormValue] = useState(initFormState)

  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(formValue.email, formValue.password)
  }

  const handleChange = (e) => {
    const {name, value} = e.target

    setFormValue({
      ...formValue,
      [name]: value
    })
  }

    return (
        <div className='login'>
          <div className='login__container_side-top'>
          <h1 className='login__title'>
            Войти</h1>
            <form className='login__form' id='login-form-auth' onSubmit={handleSubmit}>
          <label>
            <input
              onChange={handleChange}
              value={formValue.email}
              className='login__input'
              name="email"
              type="text"
              placeholder="Email"
              required
              minLength="2"
              maxLength="40"
            />
            {/*<span></span>*/}
          </label>
          <label>
            <input
              onChange={handleChange}
              value={formValue.password}
              className='login__input'
              name="password"
              placeholder="Пароль"
              type="password"
              required
              minLength="2"
              maxLength="200"
            />
            {/*<span></span>*/}
          </label>
            </form>
          </div>

          <div className='login__container_side-bottom'>
            <button type='submit' form='login-form-auth' className='login__auth'>Войти</button>
          </div>
        </div>
    );
};

