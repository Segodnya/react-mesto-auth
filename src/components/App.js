import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import api from "../utils/api";
import * as auth from "../utils/auth";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);
  const [profileEmail, setProfileEmail] = useState("");
  //
  const [removedCardId, setRemovedCardId] = useState("");
  const history = useNavigate();

  // Проверка токена и авторизация пользователя
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            history.push("/");
            setProfileEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      api
        .getCurrentUserInfo()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });

      api
        .getInitialCards()
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  // const fetchCards = async () => {
  //   try {
  //     const res = await api.getInitialCards();
  //     setCards(res);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

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

  // async ?
  const handleCardDelete = async (card) => {
    setIsLoading(true);
    try {
      await api.deleteCard(card._id);
      setCards((arrayCardsUpdated) =>
        arrayCardsUpdated.filter((item) => card._id !== item._id)
      );
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardDeleteClick = (cardId) => {
    setIsConfirmPopupOpen(!isConfirmPopupOpen);
    setRemovedCardId(cardId);
  };

  // useEffect(() => {
  //   fetchCards();
  // }, []);

  const handleUserUpdate = (newUserInfo) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  const handleAvatarUpdate = (newAvatar) => {
    setIsLoading(true);
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
        setIsLoading(false);
      });
  };

  // async ?
  const handleAddPlace = async (obj) => {
    setIsLoading(true);
    try {
      const newPlace = await api.addCard(obj);
      // После завершения API-запроса внутри него обновите стейт cards
      // с помощью расширенной копии текущего массива
      setCards([newPlace, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const profileObject = await api.getCurrentUserInfo();
  //     setCurrentUser(profileObject);
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // };

  // // создайте эффект при монтировании,
  // // который будет вызывать api.getCurrentUserInfo
  // // и обновлять стейт-переменную из полученного значения.
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleCardClick = (obj) => {
  //   setIsImageOpen(true);
  //   setSelectedCard(obj);
  // };

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
          setIsSuccess(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("./sign-in");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
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
          history.push("./");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  };

  // Выход
  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  };

  // const handleEditAvatarClick = () => {
  //   setIsEditAvatarPopupOpen(true);
  // };

  // const handleEditProfileClick = () => {
  //   setIsEditProfilePopupOpen(true);
  // };

  // const handleAddPlaceClick = () => {
  //   setIsAddPlacePopupOpen(true);
  // };

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
              path="/"
              element={
                <ProtectedRoute
                  path="/"
                  loggedIn={isLoggedIn}
                  component={Main}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={setSelectedCard}
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
            onLoading={isLoading}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUserUpdate}
            onLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
            onLoading={isLoading}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isImageOpen={isImageOpen}
          />

          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
          />

          <PopupWithConfirm
            isOpen={isConfirmPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleCardDelete}
            card={removedCardId}
            onLoading={isLoading}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );

  //

  //         <PopupWithForm
  //           title={"Вы уверены?"}
  //           name={"del-content"}
  //           btnText={"Да"}
  //         />
}

export default App;
