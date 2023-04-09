import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ cardKey, onCardClick, card, onCardLike, onCardDelete }) => {
  // подписываем функциональный компонент на CurrentUserContext
  // и получаем значение контекста
  const user = useContext(CurrentUserContext);
  const isOwn = card.owner._id === user._id;
  const isLiked = card.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `button content__like-button ${
    isLiked ? "content__like-button_active" : ""
  }`;

  return (
    // TODO: Компонент карточки не может “знать”,
    // что будет всегда частью списка, поэтому оборачивать
    // его в li не совсем правильно. Компонент должен быть
    // самодостаточным. В li можно оборачивать сам компонент
    // Card внутри списка, то есть:
    //  <li key={item._id}><Card {...props} /></li>
    <li key={cardKey}>
      <article className="content__card" aria-label="Пользоваельский пост">
        <img
          src={card.link}
          alt={card.name}
          className="content__image"
          onClick={() => onCardClick(card)}
        />
        <div className="content__info">
          <h2 className="content__title">{card.name}</h2>
          <div className="content__like-box">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Отметить пост как понравившийся"
              onClick={() => {
                onCardLike(card);
              }}
            />
            <span className="content__like-count">{card.likes.length}</span>
          </div>
        </div>
        <button
          type="button"
          className={
            isOwn
              ? "button content__delete-button"
              : "button content__delete-button content__delete-button_hidden"
          }
          aria-label="Кнопка удаления поста"
          onClick={() => {
            onCardDelete(card);
          }}
        />
      </article>
    </li>
  );
};

export default Card;
