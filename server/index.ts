import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import router from './router';

config();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL || '';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log(`Server started on port = ${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
}

start();