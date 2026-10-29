import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import Login from './Login/Login';
import Register from './Register/Register';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';

import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { registerUser, loginUser, checkToken } from '../utils/auth';
import CurrentUserContext from '../contexts/CurrentUserContext';
import type {
  UserData,
  UserProfileFormData,
  AvatarFormData,
} from '../interfaces/UserData';
import type { CardData, CardFormData } from '../interfaces/CardData';
import type { ModalData } from '../interfaces/ModalData';
import type { AuthFormData } from '../interfaces/AuthData';

const tokenStorageKey = 'jwt';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [cards, setCards] = useState<CardData[]>([]);
  const [popup, setPopup] = useState<ModalData | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isTooltipSuccess, setIsTooltipSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const [userData, initialCards] = await Promise.all([
          api.getUserInfo(),
          api.getInitialCards(),
        ]);
        setCurrentUser(userData);
        setCards(initialCards);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem(tokenStorageKey);
      if (token) {
        try {
          const user = await checkToken(token);
          setEmail(user.email);
          setIsLoggedIn(true);
        } catch (error) {
          console.error(error);
          localStorage.removeItem(tokenStorageKey);
        }
      }
      setIsAuthChecked(true);
    })();
  }, []);

  const handleCardLike = async (card: CardData) => {
    const isLiked = card.isLiked;
    try {
      const apiCall = isLiked
        ? api.removeLike(card._id)
        : api.addLike(card._id);
      const newCard = await apiCall;
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCardDelete = async (card: CardData) => {
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateUser = async (data: UserProfileFormData) => {
    try {
      const updatedUser = await api.editUserInfo(data);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAvatar = async (data: AvatarFormData) => {
    try {
      const updatedUser = await api.updateAvatar(data);
      setCurrentUser(updatedUser);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddPlaceSubmit = async (data: CardFormData) => {
    try {
      const newCard = await api.addCard(data);
      setCards((state) => [newCard, ...state]);
      setPopup(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (data: AuthFormData) => {
    try {
      await registerUser(data);
      setIsTooltipSuccess(true);
      setIsTooltipOpen(true);
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setIsTooltipSuccess(false);
      setIsTooltipOpen(true);
    }
  };

  const handleLogin = async (data: AuthFormData) => {
    try {
      const token = await loginUser(data);
      localStorage.setItem(tokenStorageKey, token);
      setEmail(data.email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      setIsTooltipSuccess(false);
      setIsTooltipOpen(true);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem(tokenStorageKey);
    setIsLoggedIn(false);
  };

  function handleOpenPopup(popup: ModalData) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCloseTooltip() {
    setIsTooltipOpen(false);
  }

  if (!isAuthChecked) {
    return null;
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAddPlaceSubmit,
      }}
    >
      <div className='page__content'>
        <Header
          isLoggedIn={isLoggedIn}
          email={email}
          handleSignOut={handleSignOut}
        />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  cards={cards}
                  handleOpenPopup={handleOpenPopup}
                  handleClosePopup={handleClosePopup}
                  handleCardLike={handleCardLike}
                  handleCardDelete={handleCardDelete}
                  popup={popup}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path='/signin'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Login handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path='/signup'
            element={
              isLoggedIn ? (
                <Navigate to='/' replace />
              ) : (
                <Register handleRegister={handleRegister} />
              )
            }
          />
          <Route
            path='*'
            element={<Navigate to={isLoggedIn ? '/' : '/signin'} replace />}
          />
        </Routes>
        <Footer />
        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isTooltipSuccess}
          onClose={handleCloseTooltip}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
