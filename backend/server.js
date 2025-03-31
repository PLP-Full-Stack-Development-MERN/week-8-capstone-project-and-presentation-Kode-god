import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const httpServer = createServer(app);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://twitter-clone-pink-ten.vercel.app'  //  update this with your Vercel URL
    : 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Middleware
app.use(notFound);
app.use(errorHandler);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? 'https://twitter-clone-pink-ten.vercel.app/'  // update this with your Vercel URL
      : 'http://localhost:5173',
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('newPost', (followers) => {
    followers.forEach((followerId) => {
      socket.to(followerId).emit('newPostNotification');
    });
  });

  socket.on('newLike', (userId) => {
    socket.to(userId).emit('newLikeNotification');
  });

  socket.on('newComment', (userId) => {
    socket.to(userId).emit('newCommentNotification');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
