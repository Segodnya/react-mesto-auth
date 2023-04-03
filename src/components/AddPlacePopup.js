import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace({ name, link });
  };

  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add-content"}
      isOpen={isOpen}
      onClose={onClose}
      btnText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        value={name || ""}
        onChange={handleNameChange}
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
      />
      <span className="popup__error name-input-error" />
      <input
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        value={link || ""}
        onChange={handleLinkChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error link-input-error" />
    </PopupWithForm>
  );
};

export default AddPlacePopup;
