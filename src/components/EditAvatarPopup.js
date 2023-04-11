import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isLoading }) => {
  const { values, errors, handleChange, isFormValid, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  };

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      btnText={isLoading ? `Сохранение` : `Сохранить`}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isDisabled={!isFormValid}
    >
      <input
        className={
          errors.avatar
            ? "popup__input popup__input_type_error"
            : "popup__input"
        }
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        required
        value={values.avatar || ""}
        onChange={handleChange}
        autoComplete="off"
      />
      <span
        className={
          errors.avatar ? "popup__error popup__error_visible" : "popup__error"
        }
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
