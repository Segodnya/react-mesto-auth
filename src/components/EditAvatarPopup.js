import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  // Вместо управляемых компонентов используйте реф,
  // чтобы получить прямой доступ к DOM-элементу инпута и его значению.
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Значение инпута, полученное с помощью рефа
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  };

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      btnText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={inputRef}
        className="popup__input popup__input_type_avatar"
        type="url"
        name="avatar"
        defaultValue=""
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__error avatar-input-error" />
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
