import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { AuthFormData } from '../../interfaces/AuthData';

type RegisterProps = {
  handleRegister: (data: AuthFormData) => void;
};

export default function Register(props: RegisterProps): React.JSX.Element {
  const { handleRegister } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister({ email, password });
  };

  return (
    <section className='auth page__section'>
      <h2 className='auth__title'>Regístrate</h2>
      <form className='auth__form' name='register-form' onSubmit={handleSubmit}>
        <div className='auth__fields'>
          <input
            className='auth__input'
            name='email'
            placeholder='Correo electrónico'
            type='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='auth__input'
            name='password'
            placeholder='Contraseña'
            type='password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='auth__button' type='submit'>
          Regístrate
        </button>
      </form>
      <p className='auth__text'>
        ¿Ya eres miembro?{' '}
        <Link className='auth__link' to='/signin'>
          Inicia sesión aquí
        </Link>
      </p>
    </section>
  );
}
