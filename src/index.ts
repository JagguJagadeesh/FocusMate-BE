import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import notesRouter from './routes/notesRoute';
import videoRouter from './routes/videoRoute';
import cors from 'cors';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.BASE_URL || 'http://localhost:3000',
  credentials: true,
}));

// Routes
app.use('/api', authRoute);
app.use('/api', notesRouter);
app.use('/api', videoRouter);

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

// Export as handler for Vercel
export const handler = serverless(app);
