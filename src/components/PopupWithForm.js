import React from "react";

const PopupWithForm = ({
  title,
  name,
  children,
  isOpen,
  onClose,
  btnText,
  onSubmit,
  onLoading,
  isDisabled,
}) => {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      id={`popup_${name}`}
    >
      <div className="popup__container" id={`popup__container_type_${name}`}>
        <button
          type="button"
          className={`button popup__close-button popup__close-button_place_${name}`}
          aria-label="Кнопка закрытия всплывающего окна"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          id={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            type="submit"
            className={`button popup__button ${
              onLoading ? "popup__button_loading" : ""
            } ${isDisabled ? "popup__button_disabled" : ""} `}
          >
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
