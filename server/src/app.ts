import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/aroundb');

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '6acf02e2d597713d7eaef9c0',
  };

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorHandler);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});
