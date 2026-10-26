import type { Request, Response } from 'express';
import User from '../models/user.js';

const createUserNotFoundError = () =>
  Object.assign(new Error('No se encontró ningún usuario con ese id'), {
    statusCode: 404,
  });

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw createUserNotFoundError();
  }

  res.json(user);
};

const getCurrentUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.user?._id);

  if (!user) {
    throw createUserNotFoundError();
  }

  res.json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  const user = await User.create({ name, about, avatar });

  res.status(201).json(user);
};

const updateProfile = async (req: Request, res: Response) => {
  const { name, about } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { name, about },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw createUserNotFoundError();
  }

  res.json(user);
};

const updateAvatar = async (req: Request, res: Response) => {
  const { avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true },
  );

  if (!user) {
    throw createUserNotFoundError();
  }

  res.json(user);
};

export {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateProfile,
  updateAvatar,
};
