import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/index.js';
import { errorHandler } from './middleware/error-handler.js';
import { defaultUserId, seedDefaultUser } from './seed.js';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: defaultUserId,
  };

  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.use(errorHandler);

const PORT = 3001;
const MONGO_URL = 'mongodb://127.0.0.1:27017/aroundb';

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URL, { serverSelectionTimeoutMS: 5000 });
    await seedDefaultUser();
  } catch {
    console.error(`No se pudo conectar o preparar MongoDB en ${MONGO_URL}`);
    console.error('Inicia MongoDB y vuelve a ejecutar el servidor.');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
  });
};

startServer();
