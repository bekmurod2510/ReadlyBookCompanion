import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookiParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()

import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
//Routes
import getAllBooks from './Routes/getRoutes/getAllBooks.Router'
import createBook from './Routes/postBook.Router';
import authRouter from './Routes/Auth.Router';
import getDataRouter from './Routes/getRoutes/getData.Router';

const app = express();

// Middleware
app.use(helmet());
app.use(cookiParser())
app.use(cors({
  origin: 'http://localhost:5173', // ← Exact frontend URL (no trailing slash)
  credentials: true, // ← This requires a specific origin, not '*'
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']}
));
app.use(morgan('combined'));
app.use(express.json());

//routes
app.use('/api', getAllBooks)
app.use('/api', createBook)
app.use('/api', authRouter)
app.use('/api', getDataRouter)

app.get('/testdb', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ success: true, users: users.length });
  } catch (error : any) {
    res.json({ success: false, error: error.message });
  }
});

// Basic health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Book Tracker API is running!' });
});

export default app;