import React, { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about,
    });
  };

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, isOpen]);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onAboutChange = (e) => {
    setAbout(e.target.value);
  };

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        value={name || ""}
        onChange={onNameChange}
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__error name-input-error" />
      <input
        className="popup__input popup__input_type_about"
        type="text"
        name="about"
        value={about || ""}
        onChange={onAboutChange}
        placeholder="Ваша профессия"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error about-input-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
