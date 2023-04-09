import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import PopupWithConfirm from "./PopupWithConfitm";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import CurrentUserContext from "../contexts/CurrentUserContext";
import successImage from "../images/success-image.svg";
import unsuccessImage from "../images/unsuccess-image.svg";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccessTooltipStatus, setisSuccessTooltipStatus] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  // Создайте стейт currentUser в корневом компоненте
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingPopupProfile, setIsLoadingPopupProfile] = useState(false);
  const [isLoadingPopupPlace, setIsLoadingPopupPlace] = useState(false);
  const [isLoadingPopupAvatar, setIsLoadingPopupAvatar] = useState(false);
  const [isLoadingPopupConfirm, setIsLoadingPopupConfirm] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  const [removedCardId, setRemovedCardId] = useState("");
  const navigate = useNavigate();

  // Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate("/");
            setProfileEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getCurrentUserInfo(), api.getInitialCards()])
        .then(([profileInfo, cardsData]) => {
          setCurrentUser(profileInfo);
          setCards(cardsData);
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  const handleCardLike = async (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    try {
      const resChangeLikeStatus = await api.changeLikeCardStatus(
        card,
        !isLiked
      );
      setCards((state) =>
        state.map((c) => (c._id === card._id ? resChangeLikeStatus : c))
      );
    } catch (e) {
      console.warn(e);
    }
  };

  const handleCardDelete = async (card) => {
    setIsLoadingPopupConfirm(true);
    try {
      await api.deleteCard(card._id);
      setCards((arrayCardsUpdated) =>
        arrayCardsUpdated.filter((item) => card._id !== item._id)
      );
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoadingPopupConfirm(false);
    }
  };

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(true);
    setRemovedCardId(cardId);
  };

  const handleUserUpdate = (newUserInfo) => {
    setIsLoadingPopupProfile(true);
    api
      .editUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPopupProfile(false);
      });
  };

  const handleAvatarUpdate = (newAvatar) => {
    setIsLoadingPopupAvatar(true);
    api
      .updateUserAvatar(newAvatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoadingPopupAvatar(false);
      });
  };

  const handleAddPlace = async (cardData) => {
    setIsLoadingPopupPlace(true);
    try {
      const newPlace = await api.addCard(cardData);
      // После завершения API-запроса внутри него обновите стейт cards
      // с помощью расширенной копии текущего массива
      setCards([newPlace, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoadingPopupPlace(false);
    }
  };

  const handleCardClick = (cardSelected) => {
    setIsImageOpen(true);
    setSelectedCard(cardSelected);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
    setSelectedCard({});
    setIsInfoTooltipPopupOpen(false);
    setIsConfirmPopupOpen(false);
  };

  // Регистрация пользователя
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setisSuccessTooltipStatus(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        setisSuccessTooltipStatus(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  };

  // Авторизация пользователя
  const handleAuthorize = (email, password) => {
    auth
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          setProfileEmail(email);
          navigate("/");
        }
      })
      .catch((err) => {
        setisSuccessTooltipStatus(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  };

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };

  return (
    // используйте провайдер объекта контекста:
    // «оберните» в него всё текущее содержимое корневого компонента.
    // В качестве значения контекста для провайдера используйте currentUser
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <div className="page__content">
          <Header onSignOut={handleSignOut} userEmail={profileEmail} />
          <Routes>
            <Route
              path="/sign-in"
              element={<Login onAuthorize={handleAuthorize} />}
            />

            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegister} />}
            />

            <Route
              path="*"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={isLoggedIn}
                  component={Main}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDeleteClick}
                />
              }
            />
          </Routes>

          <Footer />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoadingPopupPlace}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUserUpdate}
            isLoading={isLoadingPopupProfile}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
            isLoading={isLoadingPopupAvatar}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isImageOpen={isImageOpen}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccessTooltipStatus}
            onClose={closeAllPopups}
            txtSuccess="Вы успешно зарегистрировались!"
            txtUnsuccess="Что-то пошло не так! Попробуйте ещё раз."
            imgSuccess={successImage}
            imgUnsuccess={unsuccessImage}
          />

          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            isLoading={isLoadingPopupConfirm}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
