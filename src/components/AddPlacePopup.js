import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isLoading }) => {
  const { values, errors, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({
      name: values.name,
      link: values.link,
    });
  };

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-content"}
      btnText={isLoading ? `Сохранение` : `Создать`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={!isFormValid}
    >
      <input
        className={
          errors.name ? "popup__input popup__input_type_error" : "popup__input"
        }
        id="add-content-name"
        type="text"
        name="name"
        value={values.name || ""}
        onChange={handleChange}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
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
          errors.link ? "popup__input popup__input_type_error" : "popup__input"
        }
        type="url"
        name="link"
        id="add-content-link"
        value={values.link || ""}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
      />
      <span
        className={
          errors.link ? "popup__error popup__error_visible" : "popup__error"
        }
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
