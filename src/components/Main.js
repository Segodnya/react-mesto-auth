import React, { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Main = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) => {
  // подписываем функциональный компонент на CurrentUserContext
  // и получаем значение контекста
  const currentUser = useContext(CurrentUserContext);
  // Используйте поля объекта контекста вместо стейт-переменных
  const { name, avatar, about } = currentUser;

  const cardsElements = cards.map((card) => (
    <Card
      card={card}
      key={card._id}
      onCardClick={onCardClick}
      onCardLike={onCardLike}
      onCardDelete={onCardDelete}
    />
  ));

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <button
            className="profile__avatar-button"
            aria-label="Изменить аватар"
            onClick={onEditAvatar}
          />
          <img
            className="profile__avatar"
            src={avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name ?? ""}</h1>
          <button
            type="button"
            className="button profile__edit-button"
            aria-label="Кнопка редиктирования профиля"
            onClick={onEditProfile}
          />
          <p className="profile__about">{about ?? ""}</p>
        </div>
        <button
          type="button"
          className="button profile__add-button"
          aria-label="Добавить новый пост"
          onClick={onAddPlace}
        />
      </section>
      <section
        className="content"
        aria-label="Карточки с фотографиями пользователя"
      >
        <ul className="content__list">{cardsElements}</ul>
      </section>
    </main>
  );
};

export default Main;
