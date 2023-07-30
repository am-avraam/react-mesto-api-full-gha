/* eslint-disable no-undef */

import {Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import {
    Header,
    Main,
    Footer,
    EditProfilePopup,
    ImagePopup,
    EditAvatarPopup,
    AddPlacePopup,
    ProtectedRoute,
    Register,
    Login,
} from './index'
import {useState, useEffect} from "react";
import api from "../utils/api/Api";
import {UserContext} from "../contexts/CurrentUserContext";
import authApi from "utils/api/AuthApi";
import InfoTooltip from "components/InfoTooltip";


export function App() {
  // eslint-disable-next-line
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentEmail, setCurrentEmail] = useState('')

    const [cards, setCards] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [selectedCard, setSelectedCard] = useState(null)
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false)
    const [isRegisterSucceed, setIsRegisterSucceed] = useState(false)

  const navigate = useNavigate()

    useEffect(() => {
      function handleTokenCheck() {
        const token = localStorage.getItem('token')
        if (token) {
          authApi.checkToken(token)
            .then((email) => {
            if (email) {
              setLoggedIn(true)
              setCurrentEmail(email)
              navigate('/', {replace: true})
            }
          })
            .catch(err => console.log(`Ошибка.....: ${err}`))
        }
      }

      handleTokenCheck()
    }, [navigate])

    useEffect(() => {
        api.getInitialCards()
            .then((initialCards) => {
            setCards(initialCards)
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }, [])

    useEffect(() => {
        api.getUser()
            .then(user => {setCurrentUser(user)})
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }, [])



    function handleRegister(res) {
      setInfoToolTipOpen(true)
      setIsRegisterSucceed(res)
    }

    function handleSignOut() {
      localStorage.removeItem('token')
      setLoggedIn(false)
      setCurrentEmail('')
    }

    function handleLogin() {
      setLoggedIn(true)
    }
    function handleCardClick(cardId) {
        setSelectedCard((cardId))
    }
    function handleEditAvatarClick() {
        // formValidators[updateAvatarForm.getAttribute('name')].resetValidation()
        setEditAvatarPopupOpen(true)
    }
    function handleEditProfileClick() {
        setEditProfilePopupOpen(true)
    }
    function handleAddPlaceClick() {
        // formValidators[addCardForm.getAttribute('name')].resetValidation()
        setAddPlacePopupOpen(true)
    }

    function handleUpdateUser(updatedInfo) {
        api.patchUser(updatedInfo)
            .then(newUserInfo => {
                setCurrentUser(newUserInfo)
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function handleUpdateAvatar(src) {
        api.changeAvatar(src)
            .then(({avatar}) => {
                setCurrentUser({...currentUser, avatar: avatar})
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function closeAllPopups() {
        setSelectedCard(null)
        setEditProfilePopupOpen(false)
        setAddPlacePopupOpen(false)
        setEditAvatarPopupOpen(false)
        setInfoToolTipOpen(false)
    }

    function handleEscClose(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    function handleAuthorization(email, password) {
      return authApi.authorize(email, password)
        .then(token => {
          if (token) {
            handleLogin(true)
            setCurrentEmail(email)
            navigate('/', {replace: true})
            localStorage.setItem('token', token);
          } else {
            handleRegister(false)
          }
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleRegistrationQuery(email, password) {
      authApi.register( email, password)
        .then((res) => {
          if (res.data) {
            navigate('/sign-in', {replace: true})
            handleRegister(true)
          } else {
            handleRegister(false)
          }
        })
        .catch(err => console.log(`Ошибка.....: ${err}`))
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }
    function handleCardDelete(card) {
        return api.deleteCard(card._id)
            .then((newCard) => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    function handleAddPlaceSubmit(card) {
        api.postCard(card)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(`Ошибка.....: ${err}`))
    }

    return (
        <UserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} currentEmail={currentEmail} handleSignOut={handleSignOut} />
          <Routes>

              <Route path="/" element={loggedIn ? <ProtectedRoute cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} loggedIn={loggedIn} element={Main}/> : <Navigate to="/sign-in" replace />} />
              <Route path="/sign-in" element={ <Login onLogin={handleAuthorization} />} />
              <Route path="/sign-up" element={<Register onRegister={handleRegistrationQuery} />} />
              <Route path="*" element={ <Login handleLogin={handleLogin} setUserEmail={setCurrentEmail} handleRegister={handleRegister} />} />

          </Routes>

        { loggedIn &&  <Footer/>}
      </div>
          <InfoTooltip res={isRegisterSucceed} isOpen={isInfoToolTipOpen} onClose={closeAllPopups}/>
          <EditProfilePopup handleEscClose={handleEscClose} onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
          <AddPlacePopup handleEscClose={handleEscClose} onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
          <EditAvatarPopup handleEscClose={handleEscClose} onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
          <ImagePopup handleEscClose={handleEscClose} card={selectedCard} onClose={closeAllPopups}/>
      </UserContext.Provider>
  );
}

