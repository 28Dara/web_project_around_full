import type { Request, Response } from 'express';
import type { HydratedDocument } from 'mongoose';
import Card from '../models/card.js';
import type { CardData } from '../models/card.js';

const createCardNotFoundError = () =>
  Object.assign(new Error('No se encontró ninguna tarjeta con ese id'), {
    statusCode: 404,
  });

const addIsLiked = (card: HydratedDocument<CardData>, userId?: string) => ({
  ...card.toObject(),
  isLiked: card.likes.some((id) => id.toString() === userId),
});

const getCards = async (req: Request, res: Response) => {
  const cards = await Card.find({});

  res.json(cards.map((card) => addIsLiked(card, req.user?._id)));
};

const createCard = async (req: Request, res: Response) => {
  const { name, link } = req.body;
  const card = await Card.create({
    name,
    link,
    owner: req.user?._id as string,
  });

  res.status(201).json(addIsLiked(card, req.user?._id));
};

const deleteCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndDelete(req.params.id);

  if (!card) {
    throw createCardNotFoundError();
  }

  res.json(addIsLiked(card, req.user?._id));
};

const likeCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user?._id } },
    { new: true },
  );

  if (!card) {
    throw createCardNotFoundError();
  }

  res.json(addIsLiked(card, req.user?._id));
};

const dislikeCard = async (req: Request, res: Response) => {
  const card = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user?._id } },
    { new: true },
  );

  if (!card) {
    throw createCardNotFoundError();
  }

  res.json(addIsLiked(card, req.user?._id));
};

export { getCards, createCard, deleteCard, likeCard, dislikeCard };
