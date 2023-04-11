import React, { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name,
      about: values.about,
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
      btnText={isLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={!isFormValid}
    >
      <input
        className={
          errors.name ? "popup__input popup__input_type_error" : "popup__input"
        }
        id="name-input"
        type="text"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        placeholder="Ваше имя"
        required
        minLength="2"
        maxLength="40"
        autoComplete="off"
      />
      <span
        className={
          errors.name ? "popup__error popup__error_visible" : "popup__error"
        }
      >
        {errors.name}
      </span>
      <input
        className={
          errors.about ? "popup__input popup__input_type_error" : "popup__input"
        }
        id="about-input"
        type="text"
        name="about"
        value={values.about || ""}
        onChange={handleChange}
        placeholder="Ваша профессия"
        required
        minLength="2"
        maxLength="200"
        autoComplete="off"
      />
      <span
        className={
          errors.about ? "popup__error popup__error_visible" : "popup__error"
        }
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
