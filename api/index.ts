import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import notesRouter from './routes/notesRoute';
import videoRouter from './routes/videoRoute';
import taskRoute from './routes/taskRoute';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  process.env.BASE_URL,         
      
];

// Middleware
app.use(express.json());

app.use(
  cors({
    // origin: process.env.BASE_URL,
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Routes
app.use('/api', authRoute);
app.use('/api', notesRouter);
app.use('/api', videoRouter);
app.use('/api', taskRoute);

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
