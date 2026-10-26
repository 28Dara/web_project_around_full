import type { UserData, UserProfileFormData, AvatarFormData } from './UserData';
import type { CardFormData } from './CardData';

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateUser: (data: UserProfileFormData) => void;
  handleUpdateAvatar: (data: AvatarFormData) => void;
  handleAddPlaceSubmit: (data: CardFormData) => void;
}
