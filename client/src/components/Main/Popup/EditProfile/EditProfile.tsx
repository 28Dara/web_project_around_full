import { useState, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditProfile(): React.JSX.Element {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form
      className='popup__form'
      id='edit-profile-form'
      name='edit-profile-form'
      noValidate
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__input_type_name'
        name='name'
        id='name-input'
        placeholder='Nombre'
        type='text'
        required
        minLength={2}
        maxLength={40}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span id='name-input-error' className='popup__input-error'></span>
      <input
        className='popup__input popup__input_type_description'
        name='description'
        id='description-input'
        placeholder='Acerca de mí'
        type='text'
        required
        minLength={2}
        maxLength={200}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span id='description-input-error' className='popup__input-error'></span>
      <button className='button popup__button' type='submit'>
        Guardar
      </button>
    </form>
  );
}
