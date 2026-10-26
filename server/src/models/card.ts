import mongoose from 'mongoose';
import { urlRegex } from './user.js';

interface CardData {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const cardSchema = new mongoose.Schema<CardData>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => urlRegex.test(value),
      message: 'El enlace de la imagen no es válido',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model('Card', cardSchema);

export type { CardData };
export default Card;
