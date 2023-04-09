import React from "react";

function InfoTooltip({
  isOpen,
  onClose,
  isSuccess,
  txtSuccess,
  txtUnsuccess,
  imgSuccess,
  imgUnsuccess,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          id="success-close-button"
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img
          className="popup__signup-image"
          src={`${isSuccess ? imgSuccess : imgUnsuccess}`}
          alt=""
        />
        <h2 className="popup__signup-title">
          {isSuccess ? txtSuccess : txtUnsuccess}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
