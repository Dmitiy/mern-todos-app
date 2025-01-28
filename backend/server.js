import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import todoRouter from './routes/todo-routes.js';

dotenv.config();

const isDev = process.env.NODE_ENV === 'development';
const PORT = isDev ? process.env.PORT : 8000;
const DB_URL = !isDev
  ? 'mongodb://localhost:27017/mytestdb'
  : process.env.DB_URL;

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
