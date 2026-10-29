import { useContext } from 'react';
import type {
  CardData,
  HandleCardClick,
  HandleCardLike,
  HandleCardDelete,
} from '../../../interfaces/CardData';
import CurrentUserContext from '../../../contexts/CurrentUserContext';

type CardProps = {
  card: CardData;
  handleCardClick: HandleCardClick;
  handleCardLike: HandleCardLike;
  handleCardDelete: HandleCardDelete;
};

export default function Card(props: CardProps): React.JSX.Element {
  const { card, handleCardClick, handleCardLike, handleCardDelete } = props;
  const { name, link, isLiked, owner, likes } = card;
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = currentUser?._id === owner;

  const cardLikeButtonClassName = `card__like-button ${
    isLiked ? 'card__like-button_is-active' : ''
  }`;

  return (
    <li className='card'>
      <img
        className='card__image'
        src={link}
        alt={name}
        onClick={() => handleCardClick(name, link)}
      />
      {isOwner && (
        <button
          aria-label='Eliminar tarjeta'
          className='card__delete-button'
          type='button'
          onClick={() => handleCardDelete(card)}
        />
      )}
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <div className='card__like'>
          <button
            aria-label='Botón Me gusta'
            type='button'
            className={cardLikeButtonClassName}
            onClick={() => handleCardLike(card)}
          />
          <span className='card__like-count'>{likes.length}</span>
        </div>
      </div>
    </li>
  );
}
