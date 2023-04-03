import api from "../utils/api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImageOpen, setIsImageOpen] = useState(false);
  // Создайте стейт currentUser в корневом компоненте
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const fetchCards = async () => {
    try {
      const res = await api.getInitialCards();
      setCards(res);
    } catch (e) {
      console.warn(e);
    }
  };

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
    try {
      await api.deleteCard(card._id);
      setCards((arrayCardsUpdated) =>
        arrayCardsUpdated.filter((item) => card._id !== item._id)
      );
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const handleUserUpdate = async (obj) => {
    try {
      const profileUpdated = await api.editUserInfo(obj);
      console.log(profileUpdated);
      setCurrentUser(profileUpdated);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAvatarUpdate = async (obj) => {
    try {
      const avatarUpdated = await api.updateUserAvatar(obj);
      setCurrentUser(avatarUpdated);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddPlace = async (obj) => {
    try {
      const newPlace = await api.addCard(obj);
      // После завершения API-запроса внутри него обновите стейт cards
      // с помощью расширенной копии текущего массива
      setCards([newPlace, ...cards]);
      closeAllPopups();
    } catch (e) {
      console.warn(e);
    }
  };

  const fetchData = async () => {
    try {
      const profileObject = await api.getCurrentUserInfo();
      setCurrentUser(profileObject);
    } catch (e) {
      console.warn(e);
    }
  };

  // создайте эффект при монтировании,
  // который будет вызывать api.getCurrentUserInfo
  // и обновлять стейт-переменную из полученного значения.
  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (obj) => {
    setIsImageOpen(true);
    setSelectedCard(obj);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImageOpen(false);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  return (
    // используйте провайдер объекта контекста:
    // «оберните» в него всё текущее содержимое корневого компонента.
    // В качестве значения контекста для провайдера используйте currentUser
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App page">
        <div className="page__content">
          <Header />

          <Main
            onAddPlace={handleAddPlaceClick}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUserUpdate}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleAvatarUpdate}
          />

          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isImageOpen={isImageOpen}
          />

          <PopupWithForm
            title={"Вы уверены?"}
            name={"del-content"}
            btnText={"Да"}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
