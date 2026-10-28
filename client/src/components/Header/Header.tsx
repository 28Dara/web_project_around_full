import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

type HeaderProps = {
  isLoggedIn: boolean;
  email: string;
  handleSignOut: () => void;
};

export default function Header(props: HeaderProps): React.JSX.Element {
  const { isLoggedIn, email, handleSignOut } = props;
  const { pathname } = useLocation();
  const isSignupPage = pathname === '/signup';

  return (
    <header className='header page__section'>
      <img
        alt='Logotipo Around The U.S.'
        className='logo header__logo'
        src={logo}
      />
      <nav className='header__nav'>
        {isLoggedIn ? (
          <>
            <span className='header__email'>{email}</span>
            <button
              className='header__button'
              type='button'
              onClick={handleSignOut}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <Link
            className='header__link'
            to={isSignupPage ? '/signin' : '/signup'}
          >
            {isSignupPage ? 'Iniciar sesión' : 'Regístrate'}
          </Link>
        )}
      </nav>
    </header>
  );
}
