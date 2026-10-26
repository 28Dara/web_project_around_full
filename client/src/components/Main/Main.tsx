import { useContext } from 'react';
import Popup from './Popup/Popup.tsx';
import Card from './Card/Card.tsx';
import EditProfile from './Popup/EditProfile/EditProfile.tsx';
import EditAvatar from './Popup/EditAvatar/EditAvatar.tsx';
import NewCard from './Popup/NewCard/NewCard.tsx';
import ImagePopup from './Popup/ImagePopup/ImagePopup.tsx';
import RemoveCard from './Popup/RemoveCard/RemoveCard.tsx';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import type { CardData } from '../../interfaces/CardData';
import type { ModalData } from '../../interfaces/ModalData';

type MainProps = {
  cards: CardData[];
  popup: ModalData | null;
  handleOpenPopup: (popup: ModalData) => void;
  handleClosePopup: () => void;
  handleCardLike: (card: CardData) => void;
  handleCardDelete: (card: CardData) => void;
};

export default function Main(props: MainProps): React.JSX.Element {
  const {
    cards,
    popup,
    handleOpenPopup,
    handleClosePopup,
    handleCardLike,
    handleCardDelete,
  } = props;
  const { currentUser } = useContext(CurrentUserContext);

  function handleEditProfileClick() {
    handleOpenPopup({ title: 'Editar perfil', children: <EditProfile /> });
  }

  function handleEditAvatarClick() {
    handleOpenPopup({
      title: 'Cambiar foto de perfil',
      children: <EditAvatar />,
    });
  }

  function handleAddCardClick() {
    handleOpenPopup({ title: 'Nuevo lugar', children: <NewCard /> });
  }

  function handleCardClick(name: string, link: string) {
    handleOpenPopup({ children: <ImagePopup name={name} link={link} /> });
  }

  function handleCardDeleteClick(card: CardData) {
    handleOpenPopup({
      title: '¿Estás seguro?',
      children: <RemoveCard card={card} handleCardDelete={handleCardDelete} />,
    });
  }

  return (
    <main className='content'>
      <section className='profile page__section'>
        <div
          className='profile__avatar-wrapper'
          onClick={handleEditAvatarClick}
        >
          <img
            className='profile__image'
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
          <div className='profile__avatar-overlay'></div>
        </div>
        <div className='profile__info'>
          <h1 className='profile__title'>{currentUser?.name}</h1>
          <button
            aria-label='Editar perfil'
            className='profile__edit-button'
            type='button'
            onClick={handleEditProfileClick}
          ></button>
          <p className='profile__description'>{currentUser?.about}</p>
        </div>
        <button
          aria-label='Agregar tarjeta'
          className='profile__add-button'
          type='button'
          onClick={handleAddCardClick}
        />
      </section>
      <section className='cards page__section'>
        <ul className='cards__list'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardClick={handleCardClick}
              handleCardLike={handleCardLike}
              handleCardDelete={handleCardDeleteClick}
            />
          ))}
        </ul>
      </section>
      {popup && (
        <Popup
          onClose={handleClosePopup}
          title={popup.title}
          isOpen={popup !== null}
        >
          {popup.children}
        </Popup>
      )}
    </main>
  );
}
