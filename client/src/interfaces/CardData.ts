export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  createdAt: string;
  isLiked: boolean;
}

export interface CardFormData {
  name: string;
  link: string;
}

export type HandleCardClick = (name: string, link: string) => void;

export type HandleCardLike = (card: CardData) => void;

export type HandleCardDelete = (card: CardData) => void;
