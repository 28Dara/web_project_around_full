import { useRef, useContext } from 'react';
import CurrentUserContext from '../../../../contexts/CurrentUserContext';

export default function EditAvatar(): React.JSX.Element {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (avatarRef.current) {
      handleUpdateAvatar({ avatar: avatarRef.current.value });
    }
  };

  return (
    <form
      className='popup__form'
      id='avatar-form'
      name='avatar-form'
      onSubmit={handleSubmit}
    >
      <input
        className='popup__input popup__input_type_avatar'
        name='avatar'
        id='avatar-input'
        placeholder='https://somewebsite.com/someimage.jpg'
        type='url'
        required
        ref={avatarRef}
      />
      <button className='button popup__button' type='submit'>
        Guardar
      </button>
    </form>
  );
}
