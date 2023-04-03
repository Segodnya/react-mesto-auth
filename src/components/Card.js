import React, { useContext } from "react";
import trash from "../images/Trash.svg";
import CurrentUserContext from "../contexts/CurrentUserContext";

const hidden = { display: "none" };

const Card = ({
  image,
  cardKey,
  title,
  likeCount,
  onCardClick,
  card,
  onCardLike,
  onCardDelete,
}) => {
  // подписываем функциональный компонент на CurrentUserContext
  // и получаем значение контекста
  const user = useContext(CurrentUserContext);
  const isOwn = card.owner._id !== user._id;
  const isLiked = card.likes.some((i) => i._id === user._id);
  const cardLikeButtonClassName = `button content__like-button ${
    isLiked ? "content__like-button_active" : ""
  }`;

  return (
    <li key={cardKey}>
      <article className="content__card" aria-label="Пользоваельский пост">
        <img
          src={image}
          alt={title}
          className="content__image"
          onClick={() => onCardClick(card)}
        />
        <div className="content__info">
          <h2 className="content__title">{title}</h2>
          <div className="content__like-box">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Отметить пост как понравившийся"
              onClick={() => {
                onCardLike(card);
              }}
            />
            <span className="content__like-count">{likeCount}</span>
          </div>
        </div>
        <button
          type="button"
          className="button content__delete-button"
          style={isOwn ? hidden : null}
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
