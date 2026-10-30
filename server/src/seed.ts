import User from './models/user.js';

const defaultUserId = '6acf02e2d597713d7eaef9c0';

const seedDefaultUser = async () => {
  await User.updateOne(
    { _id: defaultUserId },
    {
      $setOnInsert: {
        name: 'Jacques Cousteau',
        about: 'Explorador',
        avatar: 'https://picsum.photos/id/237/800/600',
      },
    },
    { upsert: true },
  );
};

export { defaultUserId, seedDefaultUser };
