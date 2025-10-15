import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import notesRouter from './routes/notesRoute';
import videoRouter from './routes/videoRoute';
import taskRoute from './routes/taskRoute';
import cors from 'cors';
import { verifyToken } from './middlewares/verifyToken';
import eventRouter from './routes/eventsRoutes'

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ["https://localhost:3000","http://localhost:3000"],
    credentials: true,
  }),
);

// Routes
app.use('/api', authRoute);
app.use('/api',verifyToken, notesRouter);
app.use('/api',verifyToken, videoRouter);
app.use('/api',verifyToken, taskRoute);
app.use('/api/events',verifyToken,eventRouter)

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
