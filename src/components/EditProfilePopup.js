import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onLoading }) => {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const { enteredValues, errors, handleChange, isFormValid, resetForm } =
    useForm();

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: enteredValues.name,
      about: enteredValues.about,
    });
  };

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, resetForm, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      btnText={onLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      onLoading={onLoading}
      isDisabled={!isFormValid}
    >
      <input
        className={
          errors.name ? "popup__input popup__input_type_error" : "popup__input"
        }
        id="name-input"
        type="text"
        name="name"
        value={enteredValues.name || ""}
        onChange={handleChange}
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__error name-input-error">{errors.name}</span>
      <input
        className={
          errors.about ? "popup__input popup__input_type_error" : "popup__input"
        }
        id="about-input"
        type="text"
        name="about"
        value={enteredValues.about || ""}
        onChange={handleChange}
        placeholder="Ваша профессия"
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__error about-input-error">{errors.about}</span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
