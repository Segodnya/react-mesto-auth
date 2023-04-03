import React from "react";

const ImagePopup = ({ onClose, card, isImageOpen }) => {
  return (
    <div
      className={`popup popup_type_image ${isImageOpen ? "popup_opened" : ""}`}
      id="popup_image"
    >
      <div
        className="popup__container popup__container_type_image"
        id="popup__container_type_image"
      >
        <button
          type="button"
          className="button popup__close-button popup__close-button_place_image"
          aria-label="Кнопка закрытия всплывающего окна"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__caption">{card.name}</h3>
      </div>
    </div>
  );
};

export default ImagePopup;
