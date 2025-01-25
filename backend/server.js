import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import todoRouter from './routes/todo-routes.js';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const PORT = isDev ? 8000 : process.env.PORT;
const DB_URL = isDev
  ? process.env.DB_URL
  : 'mongodb://localhost:27017/mytestdb';

const app = express();

app.use(cors());
app.use(express.json());
app.use(todoRouter);

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('🐣 Connected to database');
  })
  .catch((err) => console.log('🔥 Error: connection to Database. ', err));

app.listen(PORT, (err) => {
  err
    ? console.log('Server error: ', err)
    : console.log(`Server is running on: http://localhost:${PORT}`);
});
