import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import responseRoutes from './responseRoutes.js';

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

// Middleware to parse JSON bodies
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: ["https://home-land-frontend.vercel.app","http://localhost:3000"],
  methods: ["POST", "GET"],
  credentials: true
}));

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the home page!');
});

// Use responseRoutes for specified routes
app.use("/property", responseRoutes);
app.use("/signup", responseRoutes);

// MongoDB connection
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on Port: http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));
