import express from 'express';
import indexRouter from './routes/index.js';
import dotenv from 'dotenv';
import connectDB from './database/mongoDB.js';
import authRouter from './routes/auth.routes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});
