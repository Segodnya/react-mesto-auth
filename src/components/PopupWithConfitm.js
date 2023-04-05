import React from "react";
import PopupWithForm from "./PopupWithForm";

const PopupWithConfirm = ({ isOpen, onClose, onSubmit, onLoading, card }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(card);
  };

  return (
    <PopupWithForm
      name="confirm"
      title="Удалить?"
      btnText={onLoading ? `Удаление...` : `Удалить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onLoading={onLoading}
    ></PopupWithForm>
  );
};

export default PopupWithConfirm;
