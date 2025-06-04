import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute';
import notesRouter from './routes/notesRoute';
import videoRouter from './routes/videoRoute';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 8080
const allowedOrigins = [process.env.BASE_URL, 'http://localhost:3000'];

// Middleware
app.use(express.json());
app.use(cors({
  origin: function(origin, callback){
    // Allow requests with no origin (like mobile apps or curl)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Routes
app.use('/api', authRoute);
app.use('/api', notesRouter);
app.use('/api', videoRouter);

app.get('/', (req, res) => {
  res.send('Hello from Vercel!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});