import React from "react";

function InfoTooltip({ isOpen, onClose, text, image }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          id="success-close-button"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img className="popup__signup-image" src={image} alt="" />
        <h2 className="popup__signup-title">{text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
