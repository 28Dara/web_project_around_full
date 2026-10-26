import mongoose from 'mongoose';

interface UserData {
  name: string;
  about: string;
  avatar: string;
}

const urlRegex = /^https?:\/\/(www\.)?[-\w._~:/?%#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema<UserData>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => urlRegex.test(value),
      message: 'El enlace del avatar no es válido',
    },
  },
});

const User = mongoose.model('User', userSchema);

export { urlRegex };
export default User;
